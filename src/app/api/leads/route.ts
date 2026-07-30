import { createHmac, randomUUID } from "node:crypto";
import { NextResponse, type NextRequest } from "next/server";
import { databaseTables, storageBuckets } from "@/config/database";
import {
  LEAD_ATTACHMENT_EXTENSIONS,
  LEAD_ATTACHMENT_MIME_TYPES,
  MAX_LEAD_ATTACHMENT_SIZE,
  MAX_LEAD_REQUEST_SIZE,
} from "@/config/uploads";
import { notifyNewLead } from "@/lib/email";
import { getSupabaseServiceClient } from "@/lib/supabase/service";
import { leadInputSchema } from "@/lib/validation";

export const runtime = "nodejs";

const ALLOWED_FILE_TYPES = new Set<string>(LEAD_ATTACHMENT_MIME_TYPES);
const ALLOWED_FILE_EXTENSIONS = new Set<string>(LEAD_ATTACHMENT_EXTENSIONS);

function jsonError(message: string, status = 400, fields?: Record<string, string[]>) {
  return NextResponse.json({ ok: false, message, fields }, { status });
}

function getRequestIp(request: NextRequest) {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

function hashIp(ip: string, salt: string) {
  return createHmac(
    "sha256",
    salt,
  )
    .update(ip)
    .digest("hex");
}

function safeFileName(name: string) {
  const extension = name.includes(".") ? `.${name.split(".").pop()}` : "";
  const base = name
    .replace(/\.[^/.]+$/, "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9-_]/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80);
  return `${base || "tep-dinh-kem"}${extension.toLowerCase()}`;
}

function hasAllowedFileSignature(bytes: Uint8Array, extension: string) {
  const startsWith = (...signature: number[]) =>
    signature.every((value, index) => bytes[index] === value);

  if (extension === "pdf") return startsWith(0x25, 0x50, 0x44, 0x46);
  if (extension === "jpg" || extension === "jpeg") return startsWith(0xff, 0xd8, 0xff);
  if (extension === "png") return startsWith(0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a);
  if (extension === "webp") {
    return (
      startsWith(0x52, 0x49, 0x46, 0x46) &&
      bytes[8] === 0x57 &&
      bytes[9] === 0x45 &&
      bytes[10] === 0x42 &&
      bytes[11] === 0x50
    );
  }
  if (["docx", "xlsx"].includes(extension)) {
    return startsWith(0x50, 0x4b, 0x03, 0x04) || startsWith(0x50, 0x4b, 0x05, 0x06);
  }
  if (["doc", "xls"].includes(extension)) {
    return startsWith(0xd0, 0xcf, 0x11, 0xe0, 0xa1, 0xb1, 0x1a, 0xe1);
  }
  return false;
}

export async function POST(request: NextRequest) {
  try {
    const requestOrigin = request.headers.get("origin");
    if (requestOrigin) {
      try {
        if (new URL(requestOrigin).host !== request.nextUrl.host) {
          return jsonError("Nguồn gửi yêu cầu không hợp lệ.", 403);
        }
      } catch {
        return jsonError("Nguồn gửi yêu cầu không hợp lệ.", 403);
      }
    }

    const contentLength = Number(request.headers.get("content-length") ?? 0);
    if (Number.isFinite(contentLength) && contentLength > MAX_LEAD_REQUEST_SIZE) {
      return jsonError("Dữ liệu gửi lên vượt quá dung lượng cho phép.", 413);
    }

    let formData: FormData;
    try {
      formData = await request.formData();
    } catch {
      return jsonError("Định dạng dữ liệu không hợp lệ.");
    }

    if (String(formData.get("companyWebsite") ?? "").trim()) {
      return NextResponse.json({ ok: true }, { status: 201 });
    }

    const elapsed = Number(formData.get("elapsedMs"));
    if (!Number.isFinite(elapsed) || elapsed < 2500 || elapsed > 7_200_000) {
      return jsonError("Phiên gửi biểu mẫu không hợp lệ. Vui lòng tải lại trang.");
    }

    const parsed = leadInputSchema.safeParse({
      fullName: formData.get("fullName"),
      phone: formData.get("phone"),
      email: formData.get("email") ?? "",
      sector: formData.get("sector"),
      province: formData.get("province"),
      address: formData.get("address") ?? "",
      message: formData.get("message"),
      preferredChannel: formData.get("preferredChannel"),
      privacyAccepted: formData.get("privacyAccepted") === "true",
      source: formData.get("source") ?? "website",
    });

    if (!parsed.success) {
      return jsonError(
        "Vui lòng kiểm tra lại thông tin.",
        422,
        parsed.error.flatten().fieldErrors,
      );
    }

    if (parsed.data.source === "tuyen-dung-online" && !parsed.data.email) {
      return jsonError(
        "Vui lòng kiểm tra lại thông tin.",
        422,
        { email: ["Vui lòng nhập email để KTN phản hồi hồ sơ."] },
      );
    }

    const attachmentValue = formData.get("attachment");
    const attachment =
      attachmentValue instanceof File && attachmentValue.size > 0
        ? attachmentValue
        : null;

    if (attachment) {
      const extension = attachment.name.split(".").pop()?.toLowerCase() ?? "";
      if (attachment.size > MAX_LEAD_ATTACHMENT_SIZE) {
        return jsonError("Tệp đính kèm không được vượt quá 10 MB.");
      }
      if (
        !ALLOWED_FILE_TYPES.has(attachment.type) ||
        !ALLOWED_FILE_EXTENSIONS.has(extension)
      ) {
        return jsonError("Định dạng tệp chưa được hỗ trợ.");
      }
      const signature = new Uint8Array((await attachment.slice(0, 16).arrayBuffer()));
      if (!hasAllowedFileSignature(signature, extension)) {
        return jsonError("Nội dung tệp không khớp với định dạng đã chọn.");
      }
    }

    const supabase = getSupabaseServiceClient();
    if (!supabase) {
      return jsonError("Hệ thống tiếp nhận đang được cấu hình. Vui lòng liên hệ qua điện thoại.", 503);
    }

    const ipSalt = process.env.LEAD_IP_SALT;
    if (!ipSalt || ipSalt.length < 32) {
      return jsonError("Hệ thống bảo vệ biểu mẫu đang được cấu hình. Vui lòng liên hệ qua điện thoại.", 503);
    }

    const ipHash = hashIp(getRequestIp(request), ipSalt);
    const windowStart = new Date(Date.now() - 15 * 60 * 1000).toISOString();
    const { count, error: rateLimitError } = await supabase
      .from(databaseTables.leads)
      .select("id", { count: "exact", head: true })
      .eq("ip_hash", ipHash)
      .gte("created_at", windowStart);

    if (rateLimitError) {
      console.error("Lead rate limit check failed", rateLimitError);
      return jsonError("Chưa thể kiểm tra yêu cầu. Vui lòng thử lại sau.", 503);
    }

    if ((count ?? 0) >= 5) {
      return jsonError("Bạn đã gửi nhiều yêu cầu. Vui lòng thử lại sau ít phút.", 429);
    }

    const data = parsed.data;
    const leadId = randomUUID();
    let attachmentPath: string | null = null;

    if (attachment) {
      attachmentPath = `${leadId}/${randomUUID()}-${safeFileName(attachment.name)}`;
      const { error: uploadError } = await supabase.storage
        .from(storageBuckets.leadAttachments)
        .upload(attachmentPath, Buffer.from(await attachment.arrayBuffer()), {
          contentType: attachment.type,
          upsert: false,
        });

      if (uploadError) {
        return jsonError("Không thể tải tệp lên. Vui lòng thử lại hoặc gửi không kèm tệp.", 500);
      }
    }

    const { error: leadError } = await supabase.from(databaseTables.leads).insert({
      id: leadId,
      full_name: data.fullName,
      phone: data.phone,
      email: data.email || null,
      sector: data.sector,
      province: data.province,
      address: data.address || null,
      message: data.message,
      preferred_channel: data.preferredChannel,
      privacy_accepted: data.privacyAccepted,
      status: "new",
      source: data.source,
      ip_hash: ipHash,
      user_agent: request.headers.get("user-agent")?.slice(0, 500) ?? null,
    });

    if (leadError) {
      console.error("Lead insert failed", {
        code: leadError.code,
        message: leadError.message,
        hint: leadError.hint,
      });
      if (attachmentPath) {
        await supabase.storage.from(storageBuckets.leadAttachments).remove([attachmentPath]);
      }
      return jsonError("Chưa thể lưu yêu cầu. Vui lòng thử lại.", 500);
    }

    if (attachment && attachmentPath) {
      const { error: attachmentError } = await supabase.from(databaseTables.leadAttachments).insert({
        lead_id: leadId,
        storage_path: attachmentPath,
        original_name: attachment.name.slice(0, 255),
        mime_type: attachment.type,
        size_bytes: attachment.size,
      });

      if (attachmentError) {
        console.error("Lead attachment metadata failed", attachmentError);
      }
    }

    try {
      await notifyNewLead({
        id: leadId,
        fullName: data.fullName,
        phone: data.phone,
        email: data.email || null,
        sector: data.sector,
        province: data.province,
        address: data.address || null,
        message: data.message,
        preferredChannel: data.preferredChannel,
        attachmentName: attachment?.name,
      });
    } catch (error) {
      console.error("Lead notification email failed", error);
    }

    return NextResponse.json(
      {
        ok: true,
        id: leadId,
        message: "KTN đã nhận yêu cầu và sẽ liên hệ sớm nhất.",
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Lead submission failed", error);
    return jsonError("Có lỗi xảy ra. Vui lòng thử lại sau.", 500);
  }
}


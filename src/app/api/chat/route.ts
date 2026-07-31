import { NextResponse, type NextRequest } from "next/server";

export const runtime = "nodejs";

const MAX_MESSAGE_LENGTH = 2_000;
const REQUEST_TIMEOUT_MS = 45_000;

function extractReply(payload: unknown): string | null {
  if (typeof payload === "string") return payload.trim() || null;
  if (Array.isArray(payload)) {
    for (const item of payload) {
      const reply = extractReply(item);
      if (reply) return reply;
    }
    return null;
  }
  if (!payload || typeof payload !== "object") return null;

  const record = payload as Record<string, unknown>;
  for (const key of ["output", "reply", "response", "text", "message", "answer"]) {
    const value = record[key];
    if (typeof value === "string" && value.trim()) return value.trim();
  }

  return extractReply(record.data);
}

export async function POST(request: NextRequest) {
  const webhookUrl = process.env.N8N_CHAT_WEBHOOK_URL;
  if (!webhookUrl) {
    return NextResponse.json(
      { ok: false, message: "Trợ lý KTN đang được cấu hình. Vui lòng thử lại sau." },
      { status: 503 },
    );
  }

  let configuredUrl: URL;
  try {
    configuredUrl = new URL(webhookUrl);
    if (configuredUrl.protocol !== "https:" || configuredUrl.hostname !== "n8n.congtyktn.vn") {
      throw new Error("Invalid chat webhook host");
    }
  } catch {
    return NextResponse.json(
      { ok: false, message: "Cấu hình trợ lý KTN chưa hợp lệ." },
      { status: 503 },
    );
  }

  let body: { message?: unknown; sessionId?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: "Dữ liệu gửi lên không hợp lệ." }, { status: 400 });
  }

  const message = typeof body.message === "string" ? body.message.trim() : "";
  const sessionId = typeof body.sessionId === "string" ? body.sessionId.slice(0, 120) : "";
  if (!message || message.length > MAX_MESSAGE_LENGTH || !sessionId) {
    return NextResponse.json(
      { ok: false, message: "Vui lòng nhập nội dung từ 1 đến 2.000 ký tự." },
      { status: 422 },
    );
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const headers: HeadersInit = { "content-type": "application/json" };
    const webhookSecret = process.env.N8N_CHAT_WEBHOOK_SECRET;
    if (webhookSecret) headers["x-ktn-chat-secret"] = webhookSecret;

    const response = await fetch(configuredUrl, {
      method: "POST",
      headers,
      body: JSON.stringify({
        action: "sendMessage",
        sessionId,
        chatInput: message,
        message,
        source: "www.congtyktn.vn",
        workflowId: "WQE0nYL5ekA8X6OJ",
        pageUrl: request.headers.get("referer") ?? null,
      }),
      cache: "no-store",
      signal: controller.signal,
    });

    const responseText = await response.text();
    let payload: unknown = responseText;
    try {
      payload = JSON.parse(responseText);
    } catch {
      // Plain-text webhook responses are supported.
    }

    if (!response.ok) {
      console.error("n8n chat webhook failed", { status: response.status });
      return NextResponse.json(
        { ok: false, message: "Trợ lý KTN chưa thể phản hồi. Vui lòng thử lại." },
        { status: 502 },
      );
    }

    const reply = extractReply(payload);
    if (!reply) {
      return NextResponse.json(
        { ok: false, message: "Trợ lý KTN chưa nhận được nội dung phản hồi." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true, reply });
  } catch (error) {
    console.error("KTN chat request failed", error);
    return NextResponse.json(
      { ok: false, message: "Kết nối trợ lý KTN bị gián đoạn. Vui lòng thử lại." },
      { status: 502 },
    );
  } finally {
    clearTimeout(timeout);
  }
}


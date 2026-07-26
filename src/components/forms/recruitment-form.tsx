"use client";

import { useState } from "react";
import Link from "next/link";
import {
  CheckCircle2,
  FileText,
  Loader2,
  Paperclip,
  Send,
  UserCheck,
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  LEAD_ATTACHMENT_ACCEPT,
  LEAD_ATTACHMENT_EXTENSIONS,
  LEAD_ATTACHMENT_MIME_TYPES,
  MAX_LEAD_ATTACHMENT_SIZE,
} from "@/config/uploads";

function ErrorMessage({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="mt-1 text-xs font-semibold text-destructive">{message}</p>;
}

export function RecruitmentForm({ defaultPosition = "dev" }: { defaultPosition?: string }) {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [position, setPosition] = useState(defaultPosition);
  const [experience, setExperience] = useState("1-3-nam");
  const [message, setMessage] = useState("");
  const [privacyAccepted, setPrivacyAccepted] = useState(true);
  const [file, setFile] = useState<File | null>(null);

  const [companyWebsite, setCompanyWebsite] = useState("");
  const [interactionStartedAt, setInteractionStartedAt] = useState(0);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selected = event.target.files?.[0] ?? null;
    if (!selected) {
      setFile(null);
      return;
    }

    const extension = selected.name.split(".").pop()?.toLowerCase() ?? "";
    if (
      selected.size > MAX_LEAD_ATTACHMENT_SIZE ||
      !LEAD_ATTACHMENT_MIME_TYPES.includes(
        selected.type as (typeof LEAD_ATTACHMENT_MIME_TYPES)[number],
      ) ||
      !LEAD_ATTACHMENT_EXTENSIONS.includes(
        extension as (typeof LEAD_ATTACHMENT_EXTENSIONS)[number],
      )
    ) {
      setFile(null);
      event.target.value = "";
      setServerError("CV/Tệp đính kèm phải là định dạng PDF, Word, Excel hoặc Ảnh và không quá 10 MB.");
      return;
    }

    setServerError(null);
    setFile(selected);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setServerError(null);
    setSuccessMessage(null);
    setFieldErrors({});

    const errors: Record<string, string> = {};
    if (!fullName.trim() || fullName.trim().length < 2) {
      errors.fullName = "Vui lòng nhập họ và tên";
    }
    if (!phone.trim() || !/^(?:\+84|0)(?:\d[ .-]?){8,10}\d$/.test(phone.trim())) {
      errors.phone = "Số điện thoại chưa hợp lệ (Ví dụ: 0912345678)";
    }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      errors.email = "Vui lòng nhập email chính xác để KTN phản hồi";
    }
    if (!privacyAccepted) {
      errors.privacyAccepted = "Vui lòng xác nhận đồng ý bảo mật thông tin";
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setIsSubmitting(true);

    let sector = "tech";
    if (position === "solar") sector = "solar";
    else if (position === "build") sector = "build";

    const positionLabelMap: Record<string, string> = {
      dev: "Kỹ sư Lập trình Full-stack / Web Developer",
      solar: "Kỹ sư Thiết kế & Giám sát Điện mặt trời",
      build: "Kỹ sư Giám sát Thi công & Cải tạo Công trình",
      sales: "Chuyên viên Tư vấn Giải pháp & Kinh doanh",
      other: "Ứng tuyển tự do / Vị trí khác",
    };

    const expLabelMap: Record<string, string> = {
      fresher: "Mới tốt nghiệp / Dưới 1 năm",
      "1-3-nam": "1 - 3 năm kinh nghiệm",
      "3-5-nam": "3 - 5 năm kinh nghiệm",
      "tren-5-nam": "Trên 5 năm kinh nghiệm",
    };

    const formattedMessage = `[HỒ SƠ ỨNG TUYỂN KTN]\n• Vị trí ứng tuyển: ${positionLabelMap[position] || position}\n• Mức kinh nghiệm: ${expLabelMap[experience] || experience}\n\n• Giới thiệu / Ghi chú thêm:\n${message.trim() || "Không có ghi chú thêm."}`;

    const payload = new FormData();
    payload.append("fullName", fullName.trim());
    payload.append("phone", phone.trim());
    payload.append("email", email.trim());
    payload.append("sector", sector);
    payload.append("province", "TP. Hồ Chí Minh");
    payload.append("address", "N/A");
    payload.append("message", formattedMessage);
    payload.append("preferredChannel", "email");
    payload.append("privacyAccepted", "true");
    payload.append("source", "tuyen-dung-online");

    const elapsedMs = interactionStartedAt > 0 ? event.timeStamp - interactionStartedAt : 4000;
    payload.append("elapsedMs", String(elapsedMs));
    payload.append("companyWebsite", companyWebsite);
    if (file) payload.append("attachment", file);

    try {
      const response = await fetch("/api/leads", { method: "POST", body: payload });
      const result = (await response.json()) as { ok: boolean; message?: string };

      if (!response.ok || !result.ok) {
        setServerError(result.message || "Chưa thể gửi hồ sơ. Vui lòng thử lại hoặc gửi qua Email.");
        return;
      }

      setSuccessMessage(
        "Hồ sơ ứng tuyển của bạn đã được gửi thành công! Bộ phận HR KTN sẽ xem xét và liên hệ trong thời gian sớm nhất.",
      );
      setFullName("");
      setPhone("");
      setEmail("");
      setMessage("");
      setFile(null);
    } catch {
      setServerError("Không thể kết nối hệ thống. Vui lòng gửi CV trực tiếp qua email tuyển dụng của KTN.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl sm:p-8" id="form-ung-tuyen">
      <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
        <div className="grid size-11 place-items-center rounded-2xl bg-orange/10 text-orange border border-orange/20">
          <UserCheck className="size-5" />
        </div>
        <div>
          <span className="text-[11px] font-extrabold uppercase tracking-widest text-orange">Ứng tuyển nhanh</span>
          <h3 className="text-xl font-extrabold text-navy">Nộp hồ sơ &amp; CV trực tuyến</h3>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        onFocusCapture={(event) => {
          if (interactionStartedAt === 0) setInteractionStartedAt(event.timeStamp);
        }}
        className="mt-6 space-y-5"
        noValidate
      >
        <input
          type="text"
          name="companyWebsite"
          value={companyWebsite}
          onChange={(event) => setCompanyWebsite(event.target.value)}
          tabIndex={-1}
          autoComplete="off"
          className="absolute -left-[9999px] size-px overflow-hidden"
          aria-hidden="true"
        />

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <Label htmlFor="fullName" className="font-extrabold text-navy text-xs">
              Họ và tên *
            </Label>
            <Input
              id="fullName"
              placeholder="Ví dụ: Nguyễn Văn A"
              autoComplete="name"
              className="mt-1.5"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              aria-invalid={Boolean(fieldErrors.fullName)}
            />
            <ErrorMessage message={fieldErrors.fullName} />
          </div>

          <div>
            <Label htmlFor="phone" className="font-extrabold text-navy text-xs">
              Số điện thoại *
            </Label>
            <Input
              id="phone"
              type="tel"
              placeholder="0912345678"
              autoComplete="tel"
              className="mt-1.5"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              aria-invalid={Boolean(fieldErrors.phone)}
            />
            <ErrorMessage message={fieldErrors.phone} />
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <Label htmlFor="email" className="font-extrabold text-navy text-xs">
              Email liên hệ *
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="example@gmail.com"
              autoComplete="email"
              className="mt-1.5"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-invalid={Boolean(fieldErrors.email)}
            />
            <ErrorMessage message={fieldErrors.email} />
          </div>

          <div>
            <Label htmlFor="position" className="font-extrabold text-navy text-xs">
              Vị trí ứng tuyển *
            </Label>
            <Select value={position} onValueChange={setPosition}>
              <SelectTrigger id="position" className="mt-1.5 w-full">
                <SelectValue placeholder="Chọn vị trí công việc" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dev">Lập trình viên / Web Developer</SelectItem>
                <SelectItem value="solar">Kỹ sư Thiết kế &amp; Giám sát Điện mặt trời</SelectItem>
                <SelectItem value="build">Kỹ sư Giám sát Thi công &amp; Cải tạo</SelectItem>
                <SelectItem value="sales">Chuyên viên Tư vấn &amp; Kinh doanh</SelectItem>
                <SelectItem value="other">Ứng tuyển tự do / Vị trí khác</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <Label htmlFor="experience" className="font-extrabold text-navy text-xs">
              Kinh nghiệm làm việc
            </Label>
            <Select value={experience} onValueChange={setExperience}>
              <SelectTrigger id="experience" className="mt-1.5 w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="fresher">Mới tốt nghiệp / Dưới 1 năm</SelectItem>
                <SelectItem value="1-3-nam">1 - 3 năm kinh nghiệm</SelectItem>
                <SelectItem value="3-5-nam">3 - 5 năm kinh nghiệm</SelectItem>
                <SelectItem value="tren-5-nam">Trên 5 năm kinh nghiệm</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="cvFile" className="font-extrabold text-navy text-xs">
              Tải lên CV / Hồ sơ (Tối đa 10 MB)
            </Label>
            <div className="relative mt-1.5">
              <Paperclip className="pointer-events-none absolute left-3 top-3 size-4 text-slate-400" />
              <Input
                id="cvFile"
                type="file"
                className="pl-9 text-xs"
                accept={LEAD_ATTACHMENT_ACCEPT}
                onChange={handleFileChange}
              />
            </div>
            {file ? (
              <p className="mt-1 text-xs font-bold text-emerald-600 flex items-center gap-1">
                <FileText className="size-3.5" /> Đã chọn: {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
              </p>
            ) : (
              <p className="mt-1 text-[11px] text-slate-500">Hỗ trợ PDF, DOC, DOCX, JPG, PNG.</p>
            )}
          </div>
        </div>

        <div>
          <Label htmlFor="message" className="font-extrabold text-navy text-xs">
            Giới thiệu bản thân &amp; Ghi chú (Không bắt buộc)
          </Label>
          <Textarea
            id="message"
            className="mt-1.5 min-h-24 text-xs"
            placeholder="Tóm tắt điểm mạnh, dự án nổi bật hoặc câu hỏi dành cho KTN..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>

        <div>
          <div className="flex items-start gap-2.5">
            <Checkbox
              id="recruitmentPrivacy"
              checked={privacyAccepted}
              onCheckedChange={(checked) => setPrivacyAccepted(checked === true)}
              aria-invalid={Boolean(fieldErrors.privacyAccepted)}
            />
            <Label htmlFor="recruitmentPrivacy" className="text-xs leading-5 text-slate-600 font-normal">
              Tôi cam kết thông tin cung cấp là chính xác và đồng ý cho KTN liên hệ theo{" "}
              <Link href="/chinh-sach-bao-mat" className="font-bold text-primary hover:underline">
                chính sách bảo mật
              </Link>
              .
            </Label>
          </div>
          <ErrorMessage message={fieldErrors.privacyAccepted} />
        </div>

        {serverError && (
          <Alert variant="destructive" role="alert">
            <AlertTitle>Gửi hồ sơ chưa thành công</AlertTitle>
            <AlertDescription className="text-xs">{serverError}</AlertDescription>
          </Alert>
        )}

        {successMessage && (
          <Alert className="border-emerald-200 bg-emerald-50 text-emerald-900" role="status">
            <CheckCircle2 className="size-4 text-emerald-600" />
            <AlertTitle>Đã gửi hồ sơ thành công</AlertTitle>
            <AlertDescription className="text-xs">{successMessage}</AlertDescription>
          </Alert>
        )}

        <Button
          type="submit"
          size="lg"
          className="w-full bg-orange font-extrabold text-white shadow-lg shadow-orange/30 hover:bg-orange/90"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 size-4 animate-spin" /> Đang gửi hồ sơ...
            </>
          ) : (
            <>
              <Send className="mr-2 size-4" /> Nộp hồ sơ ngay
            </>
          )}
        </Button>
      </form>
    </div>
  );
}

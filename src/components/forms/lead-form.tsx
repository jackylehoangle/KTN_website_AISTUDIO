"use client";

import { useState, type BaseSyntheticEvent } from "react";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { CheckCircle2, Loader2, Paperclip, Send } from "lucide-react";
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
import { leadInputSchema } from "@/lib/validation";
import type { z } from "zod";

type LeadFormValues = z.infer<typeof leadInputSchema>;

function ErrorMessage({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="mt-1.5 text-xs font-medium text-destructive">{message}</p>;
}

export function LeadForm({ source = "website-contact" }: { source?: string }) {
  const [interactionStartedAt, setInteractionStartedAt] = useState(0);
  const [formSession, setFormSession] = useState(0);
  const [companyWebsite, setCompanyWebsite] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const {
    register,
    control,
    handleSubmit,
    reset,
    setError,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<LeadFormValues>({
    resolver: zodResolver(leadInputSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      email: "",
      sector: "tech",
      province: "",
      address: "",
      message: "",
      preferredChannel: "phone",
      privacyAccepted: false,
      source,
    },
  });

  async function onSubmit(values: LeadFormValues, event?: BaseSyntheticEvent) {
    setServerError(null);
    setSuccessMessage(null);

    if (file && file.size > MAX_LEAD_ATTACHMENT_SIZE) {
      setServerError("Tệp đính kèm không được vượt quá 10 MB.");
      return;
    }

    const payload = new FormData();
    Object.entries(values).forEach(([key, value]) => payload.append(key, String(value)));
    const elapsedMs = interactionStartedAt > 0 && event
      ? event.timeStamp - interactionStartedAt
      : 0;
    payload.append("elapsedMs", String(elapsedMs));
    payload.append("companyWebsite", companyWebsite);
    if (file) payload.append("attachment", file);

    try {
      const response = await fetch("/api/leads", { method: "POST", body: payload });
      const result = (await response.json()) as {
        ok: boolean;
        message?: string;
        fields?: Partial<Record<keyof LeadFormValues, string[]>>;
      };

      if (!response.ok || !result.ok) {
        if (result.fields) {
          for (const [field, messages] of Object.entries(result.fields)) {
            const message = messages?.[0];
            if (message) setError(field as keyof LeadFormValues, { type: "server", message });
          }
        }
        setServerError(result.message || "Chưa thể gửi yêu cầu. Vui lòng thử lại.");
        return;
      }

      setSuccessMessage(result.message || "KTN đã nhận yêu cầu của bạn.");
      reset();
      setFile(null);
      setCompanyWebsite("");
      setInteractionStartedAt(0);
      setFormSession((current) => current + 1);
    } catch {
      setServerError("Không thể kết nối hệ thống. Vui lòng gọi trực tiếp cho KTN.");
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      onFocusCapture={(event) => {
        if (interactionStartedAt === 0) setInteractionStartedAt(event.timeStamp);
      }}
      className="space-y-5"
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
      <input type="hidden" {...register("source")} />

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="fullName">Họ và tên *</Label>
          <Input id="fullName" autoComplete="name" className="mt-2" {...register("fullName")} aria-invalid={Boolean(errors.fullName)} />
          <ErrorMessage message={errors.fullName?.message} />
        </div>
        <div>
          <Label htmlFor="phone">Số điện thoại *</Label>
          <Input id="phone" type="tel" inputMode="tel" autoComplete="tel" className="mt-2" {...register("phone")} aria-invalid={Boolean(errors.phone)} />
          <ErrorMessage message={errors.phone?.message} />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" autoComplete="email" className="mt-2" {...register("email")} aria-invalid={Boolean(errors.email)} />
          <ErrorMessage message={errors.email?.message} />
        </div>
        <div>
          <Label htmlFor="sector">Lĩnh vực cần tư vấn *</Label>
          <Controller
            name="sector"
            control={control}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger id="sector" className="mt-2 w-full" aria-invalid={Boolean(errors.sector)}>
                  <SelectValue placeholder="Chọn lĩnh vực" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tech">KTN Tech</SelectItem>
                  <SelectItem value="solar">KTN Solar</SelectItem>
                  <SelectItem value="build">KTN Build</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          <ErrorMessage message={errors.sector?.message} />
        </div>
        <div>
          <Label htmlFor="province">Tỉnh/Thành phố *</Label>
          <Input id="province" autoComplete="address-level1" className="mt-2" {...register("province")} aria-invalid={Boolean(errors.province)} />
          <ErrorMessage message={errors.province?.message} />
        </div>
        <div>
          <Label htmlFor="address">Địa chỉ</Label>
          <Input id="address" autoComplete="street-address" className="mt-2" {...register("address")} aria-invalid={Boolean(errors.address)} />
          <ErrorMessage message={errors.address?.message} />
        </div>
      </div>

      <div>
        <Label htmlFor="message">Nội dung cần tư vấn *</Label>
        <Textarea
          id="message"
          className="mt-2 min-h-32"
          placeholder="Mô tả ngắn nhu cầu, quy mô hoặc vấn đề anh/chị đang cần KTN hỗ trợ..."
          {...register("message")}
          aria-invalid={Boolean(errors.message)}
        />
        <ErrorMessage message={errors.message?.message} />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="attachment">Tệp đính kèm</Label>
          <div className="relative mt-2">
            <Paperclip className="pointer-events-none absolute left-3 top-3.5 size-4 text-muted-foreground" />
            <Input
              key={formSession}
              id="attachment"
              type="file"
              className="pl-9"
              accept={LEAD_ATTACHMENT_ACCEPT}
              onChange={(event) => {
                const selected = event.target.files?.[0] ?? null;
                if (!selected) {
                  setFile(null);
                  return;
                }

                const extension = selected.name.split(".").pop()?.toLowerCase() ?? "";
                if (
                  selected.size > MAX_LEAD_ATTACHMENT_SIZE ||
                  !LEAD_ATTACHMENT_MIME_TYPES.includes(selected.type as (typeof LEAD_ATTACHMENT_MIME_TYPES)[number]) ||
                  !LEAD_ATTACHMENT_EXTENSIONS.includes(extension as (typeof LEAD_ATTACHMENT_EXTENSIONS)[number])
                ) {
                  setFile(null);
                  event.target.value = "";
                  setServerError("Tệp phải là PDF, Word, Excel, JPG, PNG hoặc WebP và không quá 10 MB.");
                  return;
                }

                setServerError(null);
                setFile(selected);
              }}
            />
          </div>
          <p className="mt-1.5 text-xs text-muted-foreground">PDF, Word, Excel hoặc ảnh; tối đa 10 MB.</p>
        </div>
        <div>
          <Label htmlFor="preferredChannel">Kênh liên hệ mong muốn *</Label>
          <Controller
            name="preferredChannel"
            control={control}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger id="preferredChannel" className="mt-2 w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="phone">Điện thoại</SelectItem>
                  <SelectItem value="zalo">Zalo</SelectItem>
                  <SelectItem value="email">Email</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        </div>
      </div>

      <div>
        <Controller
          name="privacyAccepted"
          control={control}
          render={({ field }) => (
            <div className="flex items-start gap-3">
              <Checkbox
                id="privacyAccepted"
                checked={field.value}
                onCheckedChange={(checked) => {
                  const value = checked === true;
                  field.onChange(value);
                  setValue("privacyAccepted", value, { shouldValidate: true });
                }}
                aria-invalid={Boolean(errors.privacyAccepted)}
              />
              <Label htmlFor="privacyAccepted" className="text-sm font-normal leading-6 text-muted-foreground">
                Tôi đồng ý để KTN sử dụng thông tin trên nhằm liên hệ và tư vấn theo{" "}
                <Link href="/chinh-sach-bao-mat" className="font-semibold text-primary hover:underline">
                  chính sách bảo mật
                </Link>
                . *
              </Label>
            </div>
          )}
        />
        <ErrorMessage message={errors.privacyAccepted?.message} />
      </div>

      {serverError && (
        <Alert variant="destructive" role="alert">
          <AlertTitle>Chưa gửi được yêu cầu</AlertTitle>
          <AlertDescription>{serverError}</AlertDescription>
        </Alert>
      )}

      {successMessage && (
        <Alert className="border-emerald-200 bg-emerald-50 text-emerald-900" role="status">
          <CheckCircle2 className="text-emerald-600" />
          <AlertTitle>Đã gửi thành công</AlertTitle>
          <AlertDescription>{successMessage}</AlertDescription>
        </Alert>
      )}

      <Button type="submit" size="lg" className="w-full bg-orange hover:bg-orange/90 sm:w-auto" disabled={isSubmitting}>
        {isSubmitting ? <Loader2 className="animate-spin" /> : <Send />}
        {isSubmitting ? "Đang gửi..." : "Gửi yêu cầu tư vấn"}
      </Button>
    </form>
  );
}

import { z } from "zod";
import {
  getPostDocumentExtension,
  MAX_POST_DOCUMENT_SIZE,
  POST_DOCUMENT_MIME_BY_EXTENSION,
  POST_DOCUMENT_MIME_TYPES,
} from "@/config/uploads";

export const sectorSchema = z.enum(["tech", "solar", "build"]);

export const leadInputSchema = z.object({
  fullName: z.string().trim().min(2, "Vui lòng nhập họ và tên").max(100),
  phone: z
    .string()
    .trim()
    .regex(/^(?:\+84|0)(?:\d[ .-]?){8,10}\d$/, "Số điện thoại chưa hợp lệ"),
  email: z
    .string()
    .trim()
    .max(150)
    .refine((value) => !value || z.email().safeParse(value).success, "Email chưa hợp lệ"),
  sector: sectorSchema,
  province: z.string().trim().min(2, "Vui lòng nhập Tỉnh/Thành phố").max(100),
  address: z.string().trim().max(250),
  message: z.string().trim().min(10, "Nội dung cần ít nhất 10 ký tự").max(3000),
  preferredChannel: z.enum(["phone", "zalo", "email"]),
  privacyAccepted: z
    .boolean()
    .refine(Boolean, "Vui lòng đồng ý chính sách bảo mật"),
  source: z.string().trim().max(120),
});

export const projectInputSchema = z.object({
  id: z.uuid().optional(),
  title: z.string().trim().min(3).max(180),
  slug: z.string().trim().min(3).max(180).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  summary: z.string().trim().min(10).max(500),
  content: z.string().trim().min(10),
  sector: sectorSchema,
  status: z.enum(["draft", "published"]),
  location: z.string().trim().max(150),
  clientName: z.string().trim().max(150),
  completedAt: z.string().trim(),
  featured: z.boolean(),
  coverPath: z.string().trim().max(500),
  seoTitle: z.string().trim().max(180),
  seoDescription: z.string().trim().max(300),
});

export const postInputSchema = z
  .object({
    id: z.uuid().optional(),
    title: z.string().trim().min(3).max(180),
    slug: z.string().trim().min(3).max(180).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
    excerpt: z.string().trim().min(10).max(500),
    content: z.string().trim().min(10),
    status: z.enum(["draft", "published"]),
    publishedAt: z.string().trim(),
    coverPath: z.string().trim().max(500),
    documentPath: z
      .string()
      .trim()
      .max(500)
      .refine(
        (value) =>
          !value ||
          /^posts\/\d{4}\/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\.(pdf|doc|docx|xls|xlsx)$/.test(
            value,
          ),
        "Đường dẫn văn bản không hợp lệ",
      ),
    documentName: z.string().trim().max(255),
    documentMimeType: z
      .string()
      .trim()
      .max(150)
      .refine(
        (value) => !value || POST_DOCUMENT_MIME_TYPES.includes(value),
        "Định dạng văn bản không hợp lệ",
      ),
    documentSizeBytes: z.coerce
      .number()
      .int()
      .min(0)
      .max(MAX_POST_DOCUMENT_SIZE),
    documentLabel: z.string().trim().max(180),
    seoTitle: z.string().trim().max(180),
    seoDescription: z.string().trim().max(300),
  })
  .superRefine((data, context) => {
    const hasDocumentMetadata = Boolean(
      data.documentPath ||
        data.documentName ||
        data.documentMimeType ||
        data.documentSizeBytes,
    );
    const hasCompleteDocument = Boolean(
      data.documentPath &&
        data.documentName &&
        data.documentMimeType &&
        data.documentSizeBytes > 0,
    );

    if (hasDocumentMetadata && !hasCompleteDocument) {
      context.addIssue({
        code: "custom",
        path: ["documentPath"],
        message: "Thông tin văn bản đính kèm chưa đầy đủ",
      });
      return;
    }

    if (hasCompleteDocument) {
      const extension = getPostDocumentExtension(data.documentName);
      if (
        !extension ||
        POST_DOCUMENT_MIME_BY_EXTENSION[extension] !== data.documentMimeType ||
        !data.documentPath.endsWith(`.${extension}`)
      ) {
        context.addIssue({
          code: "custom",
          path: ["documentName"],
          message: "Tên, định dạng và đường dẫn văn bản không khớp",
        });
      }
    }
  });

export function slugifyVietnamese(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export const MAX_LEAD_ATTACHMENT_SIZE = 10 * 1024 * 1024;
export const MAX_LEAD_REQUEST_SIZE = MAX_LEAD_ATTACHMENT_SIZE + 512 * 1024;

export const LEAD_ATTACHMENT_MIME_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "image/jpeg",
  "image/png",
  "image/webp",
] as const;

export const LEAD_ATTACHMENT_EXTENSIONS = [
  "pdf",
  "doc",
  "docx",
  "xls",
  "xlsx",
  "jpg",
  "jpeg",
  "png",
  "webp",
] as const;

export const LEAD_ATTACHMENT_ACCEPT = LEAD_ATTACHMENT_EXTENSIONS
  .map((extension) => `.${extension}`)
  .join(",");

export const MAX_POST_DOCUMENT_SIZE = 20 * 1024 * 1024;

export const POST_DOCUMENT_MIME_BY_EXTENSION = {
  pdf: "application/pdf",
  doc: "application/msword",
  docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  xls: "application/vnd.ms-excel",
  xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
} as const;

export type PostDocumentExtension = keyof typeof POST_DOCUMENT_MIME_BY_EXTENSION;

export const POST_DOCUMENT_MIME_TYPES: readonly string[] = Object.values(
  POST_DOCUMENT_MIME_BY_EXTENSION,
);
export const POST_DOCUMENT_EXTENSIONS = Object.keys(
  POST_DOCUMENT_MIME_BY_EXTENSION,
) as PostDocumentExtension[];
export const POST_DOCUMENT_ACCEPT = POST_DOCUMENT_EXTENSIONS
  .map((extension) => `.${extension}`)
  .join(",");

export function getPostDocumentExtension(filename: string) {
  const extension = filename.split(".").pop()?.toLowerCase();
  return POST_DOCUMENT_EXTENSIONS.find((item) => item === extension) ?? null;
}

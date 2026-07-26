"use client";

import { useEffect, useId, useRef, useState } from "react";
import { ExternalLink, FileText, Loader2, Upload, X } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { storageBuckets } from "@/config/database";
import {
  getPostDocumentExtension,
  MAX_POST_DOCUMENT_SIZE,
  POST_DOCUMENT_ACCEPT,
  POST_DOCUMENT_MIME_BY_EXTENSION,
} from "@/config/uploads";
import { getSupabaseBrowserClient } from "@/lib/supabase/browser";
import { cn } from "@/lib/utils";

interface DocumentValue {
  path: string;
  name: string;
  mimeType: string;
  sizeBytes: number;
}

function formatFileSize(size: number) {
  if (size < 1024 * 1024) return `${Math.max(1, Math.round(size / 1024))} KB`;
  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
}

export function AdminDocumentUpload({
  initialPath = "",
  initialName = "",
  initialMimeType = "",
  initialSizeBytes = 0,
  initialUrl = null,
}: {
  initialPath?: string;
  initialName?: string;
  initialMimeType?: string;
  initialSizeBytes?: number;
  initialUrl?: string | null;
}) {
  const inputId = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const [document, setDocument] = useState<DocumentValue | null>(
    initialPath && initialName && initialMimeType && initialSizeBytes > 0
      ? {
          path: initialPath,
          name: initialName,
          mimeType: initialMimeType,
          sizeBytes: initialSizeBytes,
        }
      : null,
  );
  const [documentUrl, setDocumentUrl] = useState(initialUrl);
  const [uploading, setUploading] = useState(false);
  const [removing, setRemoving] = useState(false);
  const [inputKey, setInputKey] = useState(0);
  const [error, setError] = useState<string | null>(null);

  async function upload(file: File | null) {
    if (!file) return;

    setError(null);
    const extension = getPostDocumentExtension(file.name);
    if (!extension) {
      setError("Chỉ chấp nhận tệp PDF, Word hoặc Excel.");
      return;
    }

    if (!file.name.trim() || file.name.trim().length > 255) {
      setError("Tên tệp không được để trống hoặc dài quá 255 ký tự.");
      return;
    }

    const mimeType = POST_DOCUMENT_MIME_BY_EXTENSION[extension];
    if (file.type && file.type !== mimeType) {
      setError("Định dạng thực tế của tệp không khớp với phần mở rộng.");
      return;
    }

    if (file.size <= 0 || file.size > MAX_POST_DOCUMENT_SIZE) {
      setError("Tệp phải có dung lượng lớn hơn 0 và không quá 20 MB.");
      return;
    }

    const supabase = getSupabaseBrowserClient();
    if (!supabase) {
      setError("Supabase chưa được cấu hình cho website.");
      return;
    }

    setUploading(true);
    const previousUnsavedPath = document?.path && document.path !== initialPath
      ? document.path
      : null;
    const path = `posts/${new Date().getUTCFullYear()}/${crypto.randomUUID()}.${extension}`;

    try {
      const { error: uploadError } = await supabase.storage
        .from(storageBuckets.postDocuments)
        .upload(path, file, {
          cacheControl: "3600",
          contentType: mimeType,
          upsert: false,
        });

      if (uploadError) {
        setError("Không thể tải tệp lên. Vui lòng kiểm tra migration và thử lại.");
        return;
      }

      if (previousUnsavedPath) {
        await supabase.storage
          .from(storageBuckets.postDocuments)
          .remove([previousUnsavedPath]);
      }

      setDocument({ path, name: file.name, mimeType, sizeBytes: file.size });
      setDocumentUrl(
        supabase.storage.from(storageBuckets.postDocuments).getPublicUrl(path).data.publicUrl,
      );
      setInputKey((value) => value + 1);
    } catch {
      setError("Không thể kết nối dịch vụ lưu trữ. Vui lòng thử lại.");
    } finally {
      setUploading(false);
    }
  }

  async function remove() {
    if (!document) return;
    setError(null);

    if (document.path !== initialPath) {
      const supabase = getSupabaseBrowserClient();
      if (!supabase) {
        setError("Supabase chưa được cấu hình cho website.");
        return;
      }

      setRemoving(true);
      const { error: removeError } = await supabase.storage
        .from(storageBuckets.postDocuments)
        .remove([document.path]);
      setRemoving(false);

      if (removeError) {
        setError("Không thể xóa tệp vừa tải lên. Vui lòng thử lại.");
        return;
      }
    }

    setDocument(null);
    setDocumentUrl(null);
    setInputKey((value) => value + 1);
  }

  const busy = uploading || removing;

  useEffect(() => {
    if (!busy) return;

    const form = containerRef.current?.closest("form");
    const submitControls = Array.from(
      form?.querySelectorAll<HTMLButtonElement | HTMLInputElement>(
        'button[type="submit"], input[type="submit"]',
      ) ?? [],
    );
    const previousStates = submitControls.map((control) => control.disabled);
    submitControls.forEach((control) => {
      control.disabled = true;
    });

    return () => {
      submitControls.forEach((control, index) => {
        control.disabled = previousStates[index];
      });
    };
  }, [busy]);

  return (
    <div ref={containerRef} aria-busy={busy}>
      <input type="hidden" name="documentPath" value={document?.path ?? ""} />
      <input type="hidden" name="documentName" value={document?.name ?? ""} />
      <input type="hidden" name="documentMimeType" value={document?.mimeType ?? ""} />
      <input type="hidden" name="documentSizeBytes" value={document?.sizeBytes ?? ""} />

      {document && (
        <div className="mb-4 flex max-w-2xl flex-col gap-4 rounded-xl border bg-secondary/50 p-4 sm:flex-row sm:items-center">
          <div className="flex min-w-0 flex-1 items-center gap-3">
            <span className="grid size-11 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
              <FileText className="size-5" />
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-bold text-navy">{document.name}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                {formatFileSize(document.sizeBytes)} · {document.path === initialPath ? "Đã lưu" : "Chưa lưu bài viết"}
              </p>
            </div>
          </div>
          <div className="flex shrink-0 gap-2">
            {documentUrl && (
              <Button asChild size="sm" variant="outline">
                <a href={documentUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink /> Mở tệp
                </a>
              </Button>
            )}
            <Button
              type="button"
              size="icon-sm"
              variant="destructive"
              disabled={busy}
              onClick={remove}
              aria-label="Bỏ tệp đính kèm"
            >
              {removing ? <Loader2 className="animate-spin" /> : <X />}
            </Button>
          </div>
        </div>
      )}

      <input
        id={inputId}
        key={inputKey}
        type="file"
        accept={POST_DOCUMENT_ACCEPT}
        className="peer sr-only"
        disabled={busy}
        onChange={(event) => upload(event.target.files?.[0] ?? null)}
      />
      <label
        htmlFor={inputId}
        aria-disabled={busy}
        className={cn(
          buttonVariants({ variant: "outline" }),
          "cursor-pointer peer-focus-visible:border-ring peer-focus-visible:ring-[3px] peer-focus-visible:ring-ring/50",
          busy && "pointer-events-none opacity-60",
        )}
      >
        {uploading ? <Loader2 className="animate-spin" /> : <Upload />}
        {uploading ? "Đang tải tệp..." : document ? "Thay tệp khác" : "Chọn văn bản"}
      </label>
      <p className="mt-2 text-xs text-muted-foreground">
        PDF, Word hoặc Excel; tối đa 20 MB. Tệp sẽ công khai cùng bài viết.
      </p>
      {error && <p className="mt-2 text-sm text-destructive">{error}</p>}
    </div>
  );
}

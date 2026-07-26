"use client";

import Image from "next/image";
import { useState } from "react";
import { ImagePlus, Loader2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function AdminImageUpload({
  initialPath = "",
  initialUrl = null,
  folder,
}: {
  initialPath?: string;
  initialUrl?: string | null;
  folder: "projects" | "posts";
}) {
  const [path, setPath] = useState(initialPath);
  const [preview, setPreview] = useState(initialUrl);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function upload(file: File | null) {
    if (!file) return;
    setError(null);
    setUploading(true);
    const data = new FormData();
    data.append("file", file);
    data.append("folder", folder);
    try {
      const response = await fetch("/api/admin/media", { method: "POST", body: data });
      const result = (await response.json()) as { ok: boolean; path?: string; url?: string; message?: string };
      if (!response.ok || !result.ok || !result.path) {
        setError(result.message || "Không thể tải ảnh lên");
        return;
      }
      setPath(result.path);
      setPreview(result.url || null);
    } catch {
      setError("Không thể kết nối máy chủ");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      <input type="hidden" name="coverPath" value={path} />
      {preview ? (
        <div className="relative aspect-[16/8] max-w-xl overflow-hidden rounded-xl border bg-secondary">
          <Image src={preview} alt="Ảnh đại diện" fill sizes="600px" className="object-cover" />
          <Button type="button" size="icon-sm" variant="destructive" className="absolute right-2 top-2" onClick={() => { setPath(""); setPreview(null); }} aria-label="Bỏ ảnh">
            <X />
          </Button>
        </div>
      ) : (
        <label className="flex max-w-xl cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed bg-secondary/50 px-5 py-9 text-center hover:border-primary/40">
          {uploading ? <Loader2 className="size-6 animate-spin text-primary" /> : <ImagePlus className="size-6 text-primary" />}
          <span className="mt-2 text-sm font-semibold text-navy">{uploading ? "Đang tải ảnh..." : "Chọn ảnh đại diện"}</span>
          <span className="mt-1 text-xs text-muted-foreground">JPG, PNG hoặc WebP; tối đa 8 MB</span>
          <Input type="file" accept="image/jpeg,image/png,image/webp" className="sr-only" disabled={uploading} onChange={(event) => upload(event.target.files?.[0] ?? null)} />
        </label>
      )}
      {error && <p className="mt-2 text-sm text-destructive">{error}</p>}
    </div>
  );
}

import Link from "next/link";
import { Save } from "lucide-react";
import { AdminDocumentUpload } from "./admin-document-upload";
import { AdminImageUpload } from "./admin-image-upload";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { getPublicAssetUrl, getPublicPostDocumentUrl } from "@/lib/supabase/public";
import type { PostRecord } from "@/types/content";

export function PostForm({ post, action }: { post?: PostRecord | null; action: (formData: FormData) => Promise<void> }) {
  return (
    <form action={action} className="space-y-7">
      {post && <input type="hidden" name="id" value={post.id} />}
      <div className="grid gap-6 rounded-2xl border bg-white p-5 shadow-sm sm:p-7 lg:grid-cols-2">
        <div className="lg:col-span-2">
          <Label htmlFor="title">Tiêu đề bài viết *</Label>
          <Input id="title" name="title" required minLength={3} maxLength={180} defaultValue={post?.title ?? ""} className="mt-2" />
        </div>
        <div>
          <Label htmlFor="slug">Đường dẫn *</Label>
          <Input id="slug" name="slug" required pattern="[a-z0-9]+(?:-[a-z0-9]+)*" defaultValue={post?.slug ?? ""} className="mt-2" placeholder="tieu-de-bai-viet" />
          <p className="mt-1.5 text-xs text-muted-foreground">Chỉ dùng chữ thường không dấu, số và dấu gạch ngang.</p>
        </div>
        <div>
          <Label htmlFor="status">Trạng thái *</Label>
          <Select name="status" defaultValue={post?.status ?? "draft"}>
            <SelectTrigger id="status" className="mt-2 w-full"><SelectValue /></SelectTrigger>
            <SelectContent><SelectItem value="draft">Bản nháp</SelectItem><SelectItem value="published">Công khai</SelectItem></SelectContent>
          </Select>
        </div>
        <div className="lg:col-span-2">
          <Label htmlFor="excerpt">Mô tả ngắn *</Label>
          <Textarea id="excerpt" name="excerpt" required minLength={10} maxLength={500} defaultValue={post?.excerpt ?? ""} className="mt-2 min-h-24" />
        </div>
        <div className="lg:col-span-2">
          <Label htmlFor="content">Nội dung bài viết (Markdown) *</Label>
          <Textarea id="content" name="content" required minLength={10} defaultValue={post?.content ?? ""} className="mt-2 min-h-96 font-mono text-sm" />
        </div>
        <div>
          <Label htmlFor="publishedAt">Ngày xuất bản</Label>
          <Input id="publishedAt" name="publishedAt" type="datetime-local" defaultValue={post?.published_at?.slice(0, 16) ?? ""} className="mt-2" />
        </div>
      </div>

      <div className="rounded-2xl border bg-white p-5 shadow-sm sm:p-7">
        <h2 className="text-lg font-extrabold text-navy">Ảnh đại diện</h2>
        <div className="mt-5"><AdminImageUpload folder="posts" initialPath={post?.cover_path ?? ""} initialUrl={getPublicAssetUrl(post?.cover_path ?? null)} /></div>
      </div>

      <div className="rounded-2xl border bg-white p-5 shadow-sm sm:p-7">
        <h2 className="text-lg font-extrabold text-navy">Văn bản đính kèm</h2>
        <p className="mt-1 text-sm leading-6 text-muted-foreground">
          Dùng cho nghị định, thông tư, hồ sơ hoặc tài liệu cần người đọc mở và tải về.
        </p>
        <div className="mt-5">
          <AdminDocumentUpload
            initialPath={post?.document_path ?? ""}
            initialName={post?.document_name ?? ""}
            initialMimeType={post?.document_mime_type ?? ""}
            initialSizeBytes={post?.document_size_bytes ?? 0}
            initialUrl={getPublicPostDocumentUrl(post?.document_path ?? null)}
          />
        </div>
        <div className="mt-5 max-w-2xl">
          <Label htmlFor="documentLabel">Tên hiển thị của văn bản</Label>
          <Input
            id="documentLabel"
            name="documentLabel"
            maxLength={180}
            defaultValue={post?.document_label ?? ""}
            className="mt-2"
            placeholder="Ví dụ: Nghị định số 243/2026/NĐ-CP"
          />
          <p className="mt-1.5 text-xs text-muted-foreground">
            Nếu để trống, website sẽ dùng tên tệp đã tải lên.
          </p>
        </div>
      </div>

      <div className="grid gap-6 rounded-2xl border bg-white p-5 shadow-sm sm:p-7 lg:grid-cols-2">
        <div className="lg:col-span-2"><h2 className="text-lg font-extrabold text-navy">SEO</h2></div>
        <div>
          <Label htmlFor="seoTitle">Tiêu đề SEO</Label>
          <Input id="seoTitle" name="seoTitle" maxLength={180} defaultValue={post?.seo_title ?? ""} className="mt-2" />
        </div>
        <div>
          <Label htmlFor="seoDescription">Mô tả SEO</Label>
          <Textarea id="seoDescription" name="seoDescription" maxLength={300} defaultValue={post?.seo_description ?? ""} className="mt-2 min-h-24" />
        </div>
      </div>

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <Button asChild variant="outline"><Link href="/admin/bai-viet">Hủy</Link></Button>
        <Button type="submit"><Save /> Lưu bài viết</Button>
      </div>
    </form>
  );
}

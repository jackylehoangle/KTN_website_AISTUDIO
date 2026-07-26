import Link from "next/link";
import { Save } from "lucide-react";
import { AdminImageUpload } from "./admin-image-upload";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { getPublicAssetUrl } from "@/lib/supabase/public";
import type { ProjectRecord } from "@/types/content";

export function ProjectForm({
  project,
  action,
}: {
  project?: ProjectRecord | null;
  action: (formData: FormData) => Promise<void>;
}) {
  return (
    <form action={action} className="space-y-7">
      {project && <input type="hidden" name="id" value={project.id} />}
      <div className="grid gap-6 rounded-2xl border bg-white p-5 shadow-sm sm:p-7 lg:grid-cols-2">
        <div className="lg:col-span-2">
          <Label htmlFor="title">Tên dự án *</Label>
          <Input id="title" name="title" required minLength={3} maxLength={180} defaultValue={project?.title ?? ""} className="mt-2" />
        </div>
        <div>
          <Label htmlFor="slug">Đường dẫn *</Label>
          <Input id="slug" name="slug" required pattern="[a-z0-9]+(?:-[a-z0-9]+)*" defaultValue={project?.slug ?? ""} className="mt-2" placeholder="ten-du-an-khong-dau" />
          <p className="mt-1.5 text-xs text-muted-foreground">Chỉ dùng chữ thường không dấu, số và dấu gạch ngang.</p>
        </div>
        <div>
          <Label htmlFor="sector">Lĩnh vực *</Label>
          <Select name="sector" defaultValue={project?.sector ?? "tech"}>
            <SelectTrigger id="sector" className="mt-2 w-full"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="tech">KTN Tech</SelectItem>
              <SelectItem value="solar">KTN Solar</SelectItem>
              <SelectItem value="build">KTN Build</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="lg:col-span-2">
          <Label htmlFor="summary">Mô tả ngắn *</Label>
          <Textarea id="summary" name="summary" required minLength={10} maxLength={500} defaultValue={project?.summary ?? ""} className="mt-2 min-h-24" />
        </div>
        <div className="lg:col-span-2">
          <Label htmlFor="content">Nội dung dự án (Markdown) *</Label>
          <Textarea id="content" name="content" required minLength={10} defaultValue={project?.content ?? ""} className="mt-2 min-h-80 font-mono text-sm" />
        </div>
        <div>
          <Label htmlFor="location">Địa điểm</Label>
          <Input id="location" name="location" maxLength={150} defaultValue={project?.location ?? ""} className="mt-2" />
        </div>
        <div>
          <Label htmlFor="clientName">Tên khách hàng</Label>
          <Input id="clientName" name="clientName" maxLength={150} defaultValue={project?.client_name ?? ""} className="mt-2" />
        </div>
        <div>
          <Label htmlFor="completedAt">Ngày hoàn thành</Label>
          <Input id="completedAt" name="completedAt" type="date" defaultValue={project?.completed_at?.slice(0, 10) ?? ""} className="mt-2" />
        </div>
        <div>
          <Label htmlFor="status">Trạng thái *</Label>
          <Select name="status" defaultValue={project?.status ?? "draft"}>
            <SelectTrigger id="status" className="mt-2 w-full"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="draft">Bản nháp</SelectItem>
              <SelectItem value="published">Công khai</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-3 lg:col-span-2">
          <Checkbox id="featured" name="featured" defaultChecked={project?.featured ?? false} />
          <Label htmlFor="featured" className="font-normal">Đánh dấu là dự án nổi bật</Label>
        </div>
      </div>

      <div className="rounded-2xl border bg-white p-5 shadow-sm sm:p-7">
        <h2 className="text-lg font-extrabold text-navy">Ảnh đại diện</h2>
        <div className="mt-5">
          <AdminImageUpload folder="projects" initialPath={project?.cover_path ?? ""} initialUrl={getPublicAssetUrl(project?.cover_path ?? null)} />
        </div>
      </div>

      <div className="grid gap-6 rounded-2xl border bg-white p-5 shadow-sm sm:p-7 lg:grid-cols-2">
        <div className="lg:col-span-2"><h2 className="text-lg font-extrabold text-navy">SEO</h2></div>
        <div>
          <Label htmlFor="seoTitle">Tiêu đề SEO</Label>
          <Input id="seoTitle" name="seoTitle" maxLength={180} defaultValue={project?.seo_title ?? ""} className="mt-2" />
        </div>
        <div>
          <Label htmlFor="seoDescription">Mô tả SEO</Label>
          <Textarea id="seoDescription" name="seoDescription" maxLength={300} defaultValue={project?.seo_description ?? ""} className="mt-2 min-h-24" />
        </div>
      </div>

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <Button asChild variant="outline"><Link href="/admin/du-an">Hủy</Link></Button>
        <Button type="submit"><Save /> Lưu dự án</Button>
      </div>
    </form>
  );
}

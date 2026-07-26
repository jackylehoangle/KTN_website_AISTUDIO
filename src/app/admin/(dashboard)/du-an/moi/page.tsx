import { ProjectForm } from "@/components/admin/project-form";
import { saveProjectAction } from "@/app/admin/content-actions";

export default function NewProjectPage() {
  return <div><p className="text-sm font-semibold text-primary">Dự án</p><h1 className="mb-7 mt-1 text-3xl font-extrabold text-navy">Thêm dự án mới</h1><ProjectForm action={saveProjectAction} /></div>;
}

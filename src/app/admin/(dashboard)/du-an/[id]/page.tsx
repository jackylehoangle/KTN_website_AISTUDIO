import { notFound } from "next/navigation";
import { ProjectForm } from "@/components/admin/project-form";
import { saveProjectAction } from "@/app/admin/content-actions";
import { databaseTables } from "@/config/database";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import type { ProjectRecord } from "@/types/content";

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await getSupabaseServerClient();
  if (!supabase) notFound();
  const { data } = await supabase.from(databaseTables.projects).select("*").eq("id", id).maybeSingle();
  if (!data) notFound();
  const project = data as ProjectRecord;
  return <div><p className="text-sm font-semibold text-primary">Dự án</p><h1 className="mb-7 mt-1 text-3xl font-extrabold text-navy">Chỉnh sửa dự án</h1><ProjectForm project={project} action={saveProjectAction} /></div>;
}

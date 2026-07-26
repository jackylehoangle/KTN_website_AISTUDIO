import { notFound } from "next/navigation";
import { PostForm } from "@/components/admin/post-form";
import { savePostAction } from "@/app/admin/content-actions";
import { databaseTables } from "@/config/database";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import type { PostRecord } from "@/types/content";

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await getSupabaseServerClient();
  if (!supabase) notFound();
  const { data } = await supabase.from(databaseTables.posts).select("*").eq("id", id).maybeSingle();
  if (!data) notFound();
  const post = data as PostRecord;
  return <div><p className="text-sm font-semibold text-primary">Bài viết</p><h1 className="mb-7 mt-1 text-3xl font-extrabold text-navy">Chỉnh sửa bài viết</h1><PostForm post={post} action={savePostAction} /></div>;
}

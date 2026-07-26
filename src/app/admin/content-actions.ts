"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { SupabaseClient } from "@supabase/supabase-js";
import { databaseTables, storageBuckets } from "@/config/database";
import { getCurrentAdmin, getSupabaseServerClient } from "@/lib/supabase/server";
import { postInputSchema, projectInputSchema } from "@/lib/validation";

async function requireContentManager() {
  const [admin, supabase] = await Promise.all([
    getCurrentAdmin(),
    getSupabaseServerClient(),
  ]);
  if (!admin || !supabase) redirect("/admin/login");
  return { admin, supabase };
}

function nullable(value: string) {
  return value || null;
}

async function removeStoredPostDocument(
  supabase: SupabaseClient,
  path: string | null,
) {
  if (!path) return;
  const { error } = await supabase.storage
    .from(storageBuckets.postDocuments)
    .remove([path]);
  if (error) {
    console.error("Không thể dọn tệp văn bản bài viết khỏi Storage", error.message);
  }
}

export async function saveProjectAction(formData: FormData) {
  const { admin, supabase } = await requireContentManager();
  const parsed = projectInputSchema.safeParse({
    id: formData.get("id") || undefined,
    title: formData.get("title"),
    slug: formData.get("slug"),
    summary: formData.get("summary"),
    content: formData.get("content"),
    sector: formData.get("sector"),
    status: formData.get("status"),
    location: formData.get("location") ?? "",
    clientName: formData.get("clientName") ?? "",
    completedAt: formData.get("completedAt") ?? "",
    featured: formData.get("featured") === "on",
    coverPath: formData.get("coverPath") ?? "",
    seoTitle: formData.get("seoTitle") ?? "",
    seoDescription: formData.get("seoDescription") ?? "",
  });

  if (!parsed.success) {
    redirect(`/admin/du-an?error=${encodeURIComponent("Thông tin dự án chưa hợp lệ")}`);
  }

  const data = parsed.data;
  const payload = {
    title: data.title,
    slug: data.slug,
    summary: data.summary,
    content: data.content,
    sector: data.sector,
    status: data.status,
    location: nullable(data.location),
    client_name: nullable(data.clientName),
    completed_at: nullable(data.completedAt),
    featured: data.featured,
    cover_path: nullable(data.coverPath),
    seo_title: nullable(data.seoTitle),
    seo_description: nullable(data.seoDescription),
    updated_by: admin.user.id,
  };

  const operation = data.id
    ? supabase.from(databaseTables.projects).update(payload).eq("id", data.id)
    : supabase.from(databaseTables.projects).insert({ ...payload, created_by: admin.user.id });
  const { error } = await operation;

  if (error) {
    redirect(`/admin/du-an?error=${encodeURIComponent(error.code === "23505" ? "Đường dẫn dự án đã tồn tại" : "Không thể lưu dự án")}`);
  }

  revalidatePath("/");
  revalidatePath("/du-an");
  revalidatePath("/sitemap.xml");
  redirect("/admin/du-an?saved=1");
}

export async function deleteProjectAction(formData: FormData) {
  const { supabase } = await requireContentManager();
  const id = String(formData.get("id") ?? "");
  const { error } = await supabase.from(databaseTables.projects).delete().eq("id", id);
  if (error) redirect("/admin/du-an?error=Không thể xóa dự án");
  revalidatePath("/du-an");
  redirect("/admin/du-an?deleted=1");
}

export async function savePostAction(formData: FormData) {
  const { admin, supabase } = await requireContentManager();
  const parsed = postInputSchema.safeParse({
    id: formData.get("id") || undefined,
    title: formData.get("title"),
    slug: formData.get("slug"),
    excerpt: formData.get("excerpt"),
    content: formData.get("content"),
    status: formData.get("status"),
    publishedAt: formData.get("publishedAt") ?? "",
    coverPath: formData.get("coverPath") ?? "",
    documentPath: formData.get("documentPath") ?? "",
    documentName: formData.get("documentName") ?? "",
    documentMimeType: formData.get("documentMimeType") ?? "",
    documentSizeBytes: formData.get("documentSizeBytes") ?? "",
    documentLabel: formData.get("documentLabel") ?? "",
    seoTitle: formData.get("seoTitle") ?? "",
    seoDescription: formData.get("seoDescription") ?? "",
  });

  if (!parsed.success) {
    redirect(`/admin/bai-viet?error=${encodeURIComponent("Thông tin bài viết chưa hợp lệ")}`);
  }

  const data = parsed.data;
  let existingPost: { document_path: string | null; slug: string } | null = null;

  if (data.id) {
    const { data: existing, error: existingError } = await supabase
      .from(databaseTables.posts)
      .select("document_path, slug")
      .eq("id", data.id)
      .maybeSingle();

    if (existingError || !existing) {
      redirect(`/admin/bai-viet?error=${encodeURIComponent("Không tìm thấy bài viết cần cập nhật")}`);
    }
    existingPost = existing as { document_path: string | null; slug: string };
  }

  const publishedAt = data.status === "published"
    ? data.publishedAt || new Date().toISOString()
    : nullable(data.publishedAt);
  const payload = {
    title: data.title,
    slug: data.slug,
    excerpt: data.excerpt,
    content: data.content,
    status: data.status,
    published_at: publishedAt,
    cover_path: nullable(data.coverPath),
    document_path: nullable(data.documentPath),
    document_name: data.documentPath ? nullable(data.documentName) : null,
    document_mime_type: data.documentPath ? nullable(data.documentMimeType) : null,
    document_size_bytes: data.documentPath ? data.documentSizeBytes : null,
    document_label: data.documentPath ? nullable(data.documentLabel) : null,
    seo_title: nullable(data.seoTitle),
    seo_description: nullable(data.seoDescription),
    updated_by: admin.user.id,
  };

  const operation = data.id
    ? supabase.from(databaseTables.posts).update(payload).eq("id", data.id)
    : supabase.from(databaseTables.posts).insert({ ...payload, created_by: admin.user.id });
  const { error } = await operation;

  if (error) {
    if (data.documentPath !== existingPost?.document_path) {
      await removeStoredPostDocument(supabase, nullable(data.documentPath));
    }
    redirect(`/admin/bai-viet?error=${encodeURIComponent(error.code === "23505" ? "Đường dẫn bài viết đã tồn tại" : "Không thể lưu bài viết")}`);
  }

  if (existingPost?.document_path && existingPost.document_path !== data.documentPath) {
    await removeStoredPostDocument(supabase, existingPost.document_path);
  }

  revalidatePath("/");
  revalidatePath("/tin-tuc");
  revalidatePath(`/tin-tuc/${data.slug}`);
  if (existingPost?.slug && existingPost.slug !== data.slug) {
    revalidatePath(`/tin-tuc/${existingPost.slug}`);
  }
  revalidatePath("/sitemap.xml");
  redirect("/admin/bai-viet?saved=1");
}

export async function deletePostAction(formData: FormData) {
  const { supabase } = await requireContentManager();
  const id = String(formData.get("id") ?? "");
  const { data: post, error: findError } = await supabase
    .from(databaseTables.posts)
    .select("document_path, slug")
    .eq("id", id)
    .maybeSingle();
  if (findError || !post) redirect("/admin/bai-viet?error=Không tìm thấy bài viết");

  const { error } = await supabase.from(databaseTables.posts).delete().eq("id", id);
  if (error) redirect("/admin/bai-viet?error=Không thể xóa bài viết");
  await removeStoredPostDocument(supabase, post.document_path as string | null);
  revalidatePath("/tin-tuc");
  revalidatePath(`/tin-tuc/${post.slug as string}`);
  redirect("/admin/bai-viet?deleted=1");
}

export async function updateLeadStatusAction(formData: FormData) {
  const { admin, supabase } = await requireContentManager();
  if (admin.profile.role !== "admin") redirect("/admin");
  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "");
  if (!id || !["new", "contacted", "resolved"].includes(status)) {
    redirect("/admin/khach-hang?error=Dữ liệu chưa hợp lệ");
  }
  const { error } = await supabase.from(databaseTables.leads).update({ status }).eq("id", id);
  if (error) redirect("/admin/khach-hang?error=Không thể cập nhật trạng thái");
  revalidatePath("/admin/khach-hang");
  redirect("/admin/khach-hang?updated=1");
}

import { databaseTables } from "@/config/database";
import {
  getPublicAssetUrl,
  getPublicPostDocumentUrl,
  getSupabasePublicClient,
} from "@/lib/supabase/public";
import type { PostRecord, ProjectRecord, SectorKey } from "@/types/content";

export type ProjectWithCover = ProjectRecord & { cover_url: string | null };
export type PostWithCover = PostRecord & {
  cover_url: string | null;
  document_url: string | null;
};

export async function getPublishedProjects(options?: {
  limit?: number;
  sector?: SectorKey;
  featured?: boolean;
}) {
  const supabase = getSupabasePublicClient();
  if (!supabase) return [] as ProjectWithCover[];

  let query = supabase
    .from(databaseTables.projects)
    .select("*")
    .eq("status", "published")
    .order("completed_at", { ascending: false, nullsFirst: false })
    .order("created_at", { ascending: false });

  if (options?.sector) query = query.eq("sector", options.sector);
  if (options?.featured) query = query.eq("featured", true);
  if (options?.limit) query = query.limit(options.limit);

  const { data, error } = await query;
  if (error || !data) return [] as ProjectWithCover[];

  return (data as ProjectRecord[]).map((project) => ({
    ...project,
    cover_url: getPublicAssetUrl(project.cover_path),
  }));
}

export async function getProjectBySlug(slug: string) {
  const supabase = getSupabasePublicClient();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from(databaseTables.projects)
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();

  if (error || !data) return null;
  const project = data as ProjectRecord;
  return { ...project, cover_url: getPublicAssetUrl(project.cover_path) };
}

export async function getPublishedPosts(limit?: number) {
  const supabase = getSupabasePublicClient();
  if (!supabase) return [] as PostWithCover[];

  let query = supabase
    .from(databaseTables.posts)
    .select("*")
    .eq("status", "published")
    .order("published_at", { ascending: false, nullsFirst: false })
    .order("created_at", { ascending: false });

  if (limit) query = query.limit(limit);

  const { data, error } = await query;
  if (error || !data) return [] as PostWithCover[];

  return (data as PostRecord[]).map((post) => ({
    ...post,
    cover_url: getPublicAssetUrl(post.cover_path),
    document_url: getPublicPostDocumentUrl(post.document_path),
  }));
}

export async function getPostBySlug(slug: string) {
  const supabase = getSupabasePublicClient();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from(databaseTables.posts)
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();

  if (error || !data) return null;
  const post = data as PostRecord;
  return {
    ...post,
    cover_url: getPublicAssetUrl(post.cover_path),
    document_url: getPublicPostDocumentUrl(post.document_path),
  };
}

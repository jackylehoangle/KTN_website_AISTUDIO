import { timingSafeEqual } from "node:crypto";
import { NextResponse, type NextRequest } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { databaseTables } from "@/config/database";
import { getSupabaseServiceClient } from "@/lib/supabase/service";
import { slugifyVietnamese } from "@/lib/validation";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_REQUEST_BYTES = 1_000_000;

const optionalText = (max: number) =>
  z.preprocess(
    (value) => (typeof value === "string" ? value.trim() : value),
    z.string().max(max).optional().nullable(),
  );

const automationPostSchema = z.object({
  title: z.string().trim().min(3).max(180),
  slug: z.string().trim().max(180).optional(),
  excerpt: z.string().trim().min(10).max(500),
  content: z.string().trim().min(10).max(200_000),
  status: z.enum(["draft", "published"]).default("draft"),
  publishedAt: optionalText(50),
  published_at: optionalText(50),
  coverPath: optionalText(500),
  cover_path: optionalText(500),
  seoTitle: optionalText(180),
  seo_title: optionalText(180),
  seoDescription: optionalText(300),
  seo_description: optionalText(300),
  sourceUrl: optionalText(2_000),
  source_url: optionalText(2_000),
  sourceName: optionalText(300),
  source_name: optionalText(300),
  externalId: optionalText(300),
  external_id: optionalText(300),
});

function jsonError(message: string, status: number, details?: unknown) {
  return NextResponse.json({ ok: false, message, details }, { status });
}

function isAuthorized(request: NextRequest) {
  const expected = process.env.KTN_AUTOMATION_API_SECRET;
  if (!expected || expected.length < 32) return false;

  const bearer = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
  const supplied = request.headers.get("x-ktn-automation-secret") ?? bearer ?? "";
  const expectedBytes = Buffer.from(expected);
  const suppliedBytes = Buffer.from(supplied);

  return (
    suppliedBytes.length === expectedBytes.length &&
    timingSafeEqual(suppliedBytes, expectedBytes)
  );
}

function parseDate(value: string | null | undefined) {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date.toISOString();
}

function appendSourceMetadata(
  content: string,
  sourceUrl: string | null,
  sourceName: string | null,
) {
  if (!sourceUrl || content.includes(sourceUrl)) return content;
  const label = sourceName ? `Nguá»“n tham kháº£o: ${sourceName}` : "Nguá»“n tham kháº£o";
  return `${content.trim()}\n\n---\n${label}: ${sourceUrl}`;
}

export async function GET(request: NextRequest) {
  if (!isAuthorized(request)) return jsonError("KhĂ´ng cĂ³ quyá»n truy cáº­p.", 401);

  const supabase = getSupabaseServiceClient();
  if (!supabase) return jsonError("Supabase chÆ°a Ä‘Æ°á»£c cáº¥u hĂ¬nh.", 503);

  const { data, error } = await supabase
    .from(databaseTables.posts)
    .select("id,title,slug,status,published_at,created_at,updated_at")
    .order("updated_at", { ascending: false })
    .limit(20);

  if (error) {
    console.error("Automation posts list failed", error);
    return jsonError("KhĂ´ng thá»ƒ Ä‘á»c danh sĂ¡ch bĂ i viáº¿t.", 500);
  }

  return NextResponse.json({ ok: true, items: data ?? [] });
}

export async function POST(request: NextRequest) {
  if (!process.env.KTN_AUTOMATION_API_SECRET) {
    return jsonError("API tá»± Ä‘á»™ng hĂ³a chÆ°a Ä‘Æ°á»£c cáº¥u hĂ¬nh.", 503);
  }
  if (!isAuthorized(request)) return jsonError("KhĂ´ng cĂ³ quyá»n truy cáº­p.", 401);

  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (Number.isFinite(contentLength) && contentLength > MAX_REQUEST_BYTES) {
    return jsonError("Dá»¯ liá»‡u vÆ°á»£t quĂ¡ dung lÆ°á»£ng cho phĂ©p.", 413);
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return jsonError("JSON khĂ´ng há»£p lá»‡.", 400);
  }

  const parsed = automationPostSchema.safeParse(body);
  if (!parsed.success) {
    return jsonError("Dá»¯ liá»‡u bĂ i viáº¿t chÆ°a há»£p lá»‡.", 422, parsed.error.flatten());
  }

  const data = parsed.data;
  const slug = data.slug?.trim() || slugifyVietnamese(data.title);
  if (!slug || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    return jsonError("Slug bĂ i viáº¿t khĂ´ng há»£p lá»‡.", 422);
  }

  const sourceUrl = data.sourceUrl ?? data.source_url ?? null;
  const sourceName = data.sourceName ?? data.source_name ?? null;
  if (sourceUrl) {
    try {
      const url = new URL(sourceUrl);
      if (!['http:', 'https:'].includes(url.protocol)) throw new Error("Invalid protocol");
    } catch {
      return jsonError("ÄÆ°á»ng dáº«n nguá»“n khĂ´ng há»£p lá»‡.", 422);
    }
  }

  const requestedPublishedAt = parseDate(data.publishedAt ?? data.published_at);
  if ((data.publishedAt ?? data.published_at) && !requestedPublishedAt) {
    return jsonError("Thá»i gian xuáº¥t báº£n khĂ´ng há»£p lá»‡.", 422);
  }

  const supabase = getSupabaseServiceClient();
  if (!supabase) return jsonError("Supabase chÆ°a Ä‘Æ°á»£c cáº¥u hĂ¬nh.", 503);

  const payload = {
    title: data.title,
    slug,
    excerpt: data.excerpt,
    content: appendSourceMetadata(data.content, sourceUrl, sourceName),
    status: data.status,
    cover_path: data.coverPath ?? data.cover_path ?? null,
    published_at:
      data.status === "published"
        ? requestedPublishedAt ?? new Date().toISOString()
        : null,
    seo_title: data.seoTitle ?? data.seo_title ?? null,
    seo_description: data.seoDescription ?? data.seo_description ?? null,
  };

  const { data: existing, error: lookupError } = await supabase
    .from(databaseTables.posts)
    .select("id,status,published_at")
    .eq("slug", slug)
    .maybeSingle();

  if (lookupError) {
    console.error("Automation post lookup failed", lookupError);
    return jsonError("KhĂ´ng thá»ƒ kiá»ƒm tra bĂ i viáº¿t hiá»‡n cĂ³.", 500);
  }

  const query = existing
    ? supabase.from(databaseTables.posts).update(payload).eq("id", existing.id)
    : supabase.from(databaseTables.posts).insert(payload);

  const { data: saved, error: saveError } = await query
    .select("id,title,slug,status,published_at,created_at,updated_at")
    .single();

  if (saveError) {
    console.error("Automation post save failed", saveError);
    return jsonError("KhĂ´ng thá»ƒ lÆ°u bĂ i viáº¿t.", 500);
  }

  revalidatePath("/");
  revalidatePath("/tin-tuc");
  revalidatePath(`/tin-tuc/${slug}`);
  revalidatePath("/sitemap.xml");

  return NextResponse.json(
    {
      ok: true,
      action: existing ? "updated" : "created",
      post: saved,
      source: {
        url: sourceUrl,
        name: sourceName,
        externalId: data.externalId ?? data.external_id ?? null,
      },
    },
    { status: existing ? 200 : 201 },
  );
}


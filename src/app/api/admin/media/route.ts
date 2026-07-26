import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { storageBuckets } from "@/config/database";
import { getCurrentAdmin, getSupabaseServerClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

const MAX_SIZE = 8 * 1024 * 1024;
const ALLOWED = new Set(["image/jpeg", "image/png", "image/webp"]);

function safeName(name: string) {
  const extension = name.includes(".") ? `.${name.split(".").pop()?.toLowerCase()}` : "";
  return `${name
    .replace(/\.[^/.]+$/, "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9-_]/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 70) || "image"}${extension}`;
}

export async function POST(request: Request) {
  const [admin, supabase] = await Promise.all([getCurrentAdmin(), getSupabaseServerClient()]);
  if (!admin || !supabase) return NextResponse.json({ ok: false, message: "Chưa đăng nhập" }, { status: 401 });

  const formData = await request.formData();
  const value = formData.get("file");
  const folder = String(formData.get("folder") ?? "");
  if (!(value instanceof File) || !["projects", "posts"].includes(folder)) {
    return NextResponse.json({ ok: false, message: "Dữ liệu tải lên chưa hợp lệ" }, { status: 400 });
  }
  if (value.size > MAX_SIZE || !ALLOWED.has(value.type)) {
    return NextResponse.json({ ok: false, message: "Ảnh phải là JPG, PNG hoặc WebP và không quá 8 MB" }, { status: 400 });
  }

  const path = `${folder}/${new Date().getFullYear()}/${randomUUID()}-${safeName(value.name)}`;
  const { error } = await supabase.storage.from(storageBuckets.siteMedia).upload(path, Buffer.from(await value.arrayBuffer()), {
    contentType: value.type,
    upsert: false,
  });
  if (error) return NextResponse.json({ ok: false, message: "Không thể lưu ảnh" }, { status: 500 });
  const url = supabase.storage.from(storageBuckets.siteMedia).getPublicUrl(path).data.publicUrl;
  return NextResponse.json({ ok: true, path, url }, { status: 201 });
}

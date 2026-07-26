"use server";

import { redirect } from "next/navigation";
import { databaseTables } from "@/config/database";
import { getSupabaseServerClient } from "@/lib/supabase/server";

export async function loginAction(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const supabase = await getSupabaseServerClient();

  if (!supabase) {
    redirect("/admin/login?error=Hệ thống Supabase chưa được cấu hình");
  }

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error || !data.user) {
    redirect("/admin/login?error=Email hoặc mật khẩu chưa đúng");
  }

  const { data: profile } = await supabase
    .from(databaseTables.profiles)
    .select("role")
    .eq("id", data.user.id)
    .in("role", ["admin", "editor"])
    .maybeSingle();

  if (!profile) {
    await supabase.auth.signOut();
    redirect("/admin/login?error=Tài khoản chưa được cấp quyền quản trị");
  }

  redirect("/admin");
}

export async function logoutAction() {
  const supabase = await getSupabaseServerClient();
  if (supabase) await supabase.auth.signOut();
  redirect("/admin/login");
}

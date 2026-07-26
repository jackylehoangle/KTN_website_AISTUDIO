import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { databaseTables } from "@/config/database";
import { getSupabasePublicKey, isSupabaseConfigured } from "./config";

export async function getSupabaseServerClient() {
  if (!isSupabaseConfigured()) return null;

  const cookieStore = await cookies();
  const publicKey = getSupabasePublicKey();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    publicKey!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            // Server Components cannot always write cookies. The proxy refreshes them.
          }
        },
      },
    },
  );
}

export async function getCurrentAdmin() {
  const supabase = await getSupabaseServerClient();
  if (!supabase) return null;

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: profile } = await supabase
    .from(databaseTables.profiles)
    .select("id, full_name, role")
    .eq("id", user.id)
    .in("role", ["admin", "editor"])
    .maybeSingle();

  if (!profile) return null;

  return { user, profile };
}

"use client";

import { createBrowserClient } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";
import { getSupabasePublicKey } from "./config";

let browserClient: SupabaseClient | null = null;

export function getSupabaseBrowserClient() {
  const publicKey = getSupabasePublicKey();

  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !publicKey) {
    return null;
  }

  if (!browserClient) {
    browserClient = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      publicKey,
    );
  }

  return browserClient;
}

import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { storageBuckets } from "@/config/database";
import { getSupabasePublicKey, isSupabaseConfigured } from "./config";

let publicClient: SupabaseClient | null = null;

export function getSupabasePublicClient() {
  if (!isSupabaseConfigured()) return null;

  if (!publicClient) {
    const publicKey = getSupabasePublicKey();

    publicClient = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      publicKey!,
      {
        auth: { persistSession: false, autoRefreshToken: false },
      },
    );
  }

  return publicClient;
}

export function getPublicAssetUrl(path: string | null) {
  if (!path) return null;
  if (path.startsWith("https://") || path.startsWith("http://")) return path;

  const client = getSupabasePublicClient();
  if (!client) return null;

  return client.storage.from(storageBuckets.siteMedia).getPublicUrl(path).data.publicUrl;
}

export function getPublicPostDocumentUrl(path: string | null) {
  if (!path) return null;

  const client = getSupabasePublicClient();
  if (!client) return null;

  return client.storage.from(storageBuckets.postDocuments).getPublicUrl(path).data.publicUrl;
}

import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import {
  getSupabaseSecretKey,
  isSupabaseServiceConfigured,
} from "./config";

let serviceClient: SupabaseClient | null = null;

export function getSupabaseServiceClient() {
  if (!isSupabaseServiceConfigured()) return null;

  if (!serviceClient) {
    const secretKey = getSupabaseSecretKey();

    serviceClient = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      secretKey!,
      {
        auth: { persistSession: false, autoRefreshToken: false },
      },
    );
  }

  return serviceClient;
}

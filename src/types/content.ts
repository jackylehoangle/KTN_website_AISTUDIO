export type SectorKey = "tech" | "solar" | "build";
export type ContentStatus = "draft" | "published";
export type LeadStatus = "new" | "contacted" | "resolved";

export interface ProjectRecord {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  sector: SectorKey;
  status: ContentStatus;
  location: string | null;
  client_name: string | null;
  completed_at: string | null;
  featured: boolean;
  cover_path: string | null;
  seo_title: string | null;
  seo_description: string | null;
  created_at: string;
  updated_at: string;
}

export interface PostRecord {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  status: ContentStatus;
  cover_path: string | null;
  document_path: string | null;
  document_name: string | null;
  document_mime_type: string | null;
  document_size_bytes: number | null;
  document_label: string | null;
  published_at: string | null;
  seo_title: string | null;
  seo_description: string | null;
  created_at: string;
  updated_at: string;
}

export interface LeadRecord {
  id: string;
  full_name: string;
  phone: string;
  email: string | null;
  sector: SectorKey;
  province: string;
  address: string | null;
  message: string;
  preferred_channel: "phone" | "zalo" | "email";
  status: LeadStatus;
  source: string;
  created_at: string;
  updated_at: string;
}

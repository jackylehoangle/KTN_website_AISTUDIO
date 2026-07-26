export const databaseTables = {
  profiles: "ktn_web_profiles",
  projects: "ktn_web_projects",
  posts: "ktn_web_posts",
  leads: "ktn_web_leads",
  leadAttachments: "ktn_web_lead_attachments",
  automationEvents: "ktn_web_automation_events",
} as const;

export const storageBuckets = {
  siteMedia: "ktn-web-site-media",
  postDocuments: "ktn-web-post-documents",
  leadAttachments: "ktn-web-lead-attachments",
} as const;

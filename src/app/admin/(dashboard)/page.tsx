import { FileText, FolderKanban, Inbox, UsersRound } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { databaseTables } from "@/config/database";
import { getCurrentAdmin, getSupabaseServerClient } from "@/lib/supabase/server";

export default async function AdminDashboardPage() {
  const [admin, supabase] = await Promise.all([getCurrentAdmin(), getSupabaseServerClient()]);
  if (!admin || !supabase) return null;

  const [projectsResult, postsResult, leadsResult, newLeadsResult] = await Promise.all([
    supabase.from(databaseTables.projects).select("id", { count: "exact", head: true }),
    supabase.from(databaseTables.posts).select("id", { count: "exact", head: true }),
    admin.profile.role === "admin" ? supabase.from(databaseTables.leads).select("id", { count: "exact", head: true }) : Promise.resolve({ count: null }),
    admin.profile.role === "admin" ? supabase.from(databaseTables.leads).select("id", { count: "exact", head: true }).eq("status", "new") : Promise.resolve({ count: null }),
  ]);

  const metrics = [
    { label: "Dự án", value: projectsResult.count ?? 0, Icon: FolderKanban, color: "text-primary bg-primary/10" },
    { label: "Bài viết", value: postsResult.count ?? 0, Icon: FileText, color: "text-cyan bg-cyan/10" },
    ...(admin.profile.role === "admin"
      ? [
          { label: "Khách hàng", value: leadsResult.count ?? 0, Icon: UsersRound, color: "text-orange bg-orange/10" },
          { label: "Yêu cầu mới", value: newLeadsResult.count ?? 0, Icon: Inbox, color: "text-emerald-700 bg-emerald-100" },
        ]
      : []),
  ];

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-primary">Quản trị KTN</p>
          <h1 className="mt-1 text-3xl font-extrabold text-navy">Tổng quan</h1>
        </div>
        <Badge variant="outline" className="capitalize">{admin.profile.role}</Badge>
      </div>
      <div className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map(({ label, value, Icon, color }) => (
          <div key={label} className="rounded-2xl border bg-white p-5 shadow-sm">
            <div className={`grid size-11 place-items-center rounded-xl ${color}`}><Icon className="size-5" /></div>
            <p className="mt-5 text-3xl font-extrabold text-navy">{value}</p>
            <p className="mt-1 text-sm text-muted-foreground">{label}</p>
          </div>
        ))}
      </div>
      <div className="mt-7 rounded-2xl border bg-white p-6 shadow-sm">
        <h2 className="text-lg font-extrabold text-navy">Nguyên tắc xuất bản</h2>
        <p className="mt-2 max-w-3xl text-sm leading-7 text-muted-foreground">
          Dự án và bài viết ở trạng thái bản nháp sẽ không xuất hiện trên website. Chỉ chuyển sang công khai sau khi nội dung, hình ảnh và thông tin SEO đã được kiểm tra.
        </p>
      </div>
    </div>
  );
}

import { redirect } from "next/navigation";
import { AdminNavigation } from "@/components/admin/admin-navigation";
import { getCurrentAdmin } from "@/lib/supabase/server";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const admin = await getCurrentAdmin();
  if (!admin) redirect("/admin/login");
  return (
    <div className="min-h-screen bg-secondary/60">
      <AdminNavigation
        name={admin.profile.full_name || admin.user.email || "Quản trị viên"}
        role={admin.profile.role}
      />
      <main className="min-h-screen lg:pl-64">
        <div className="mx-auto w-full max-w-[1400px] p-4 sm:p-6 lg:p-8">{children}</div>
      </main>
    </div>
  );
}

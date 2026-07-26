import { LockKeyhole } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Logo } from "@/components/site/logo";
import { loginAction } from "../auth-actions";

export default async function AdminLoginPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const { error } = await searchParams;
  return (
    <main className="grid min-h-screen place-items-center bg-secondary px-4 py-10">
      <div className="w-full max-w-md rounded-3xl border bg-white p-6 shadow-xl sm:p-8">
        <Logo className="mx-auto h-20 w-52" priority />
        <div className="mt-5 text-center">
          <div className="mx-auto grid size-11 place-items-center rounded-xl bg-primary/10 text-primary"><LockKeyhole className="size-5" /></div>
          <h1 className="mt-4 text-2xl font-extrabold text-navy">Đăng nhập quản trị</h1>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">Dành cho tài khoản đã được KTN cấp quyền.</p>
        </div>
        {error && <p role="alert" className="mt-5 rounded-lg bg-red-50 px-4 py-3 text-sm font-medium text-red-700">{error}</p>}
        <form action={loginAction} className="mt-6 space-y-5">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" autoComplete="email" required className="mt-2" />
          </div>
          <div>
            <Label htmlFor="password">Mật khẩu</Label>
            <Input id="password" name="password" type="password" autoComplete="current-password" required minLength={8} className="mt-2" />
          </div>
          <Button type="submit" size="lg" className="w-full">Đăng nhập</Button>
        </form>
      </div>
    </main>
  );
}

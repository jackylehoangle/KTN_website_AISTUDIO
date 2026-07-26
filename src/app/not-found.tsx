import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-secondary px-5 text-center">
      <div>
        <p className="text-7xl font-extrabold text-primary/20">404</p>
        <h1 className="mt-3 text-3xl font-extrabold text-navy">Không tìm thấy trang</h1>
        <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-muted-foreground">
          Nội dung có thể đã được chuyển, chưa được xuất bản hoặc đường dẫn chưa chính xác.
        </p>
        <Button asChild className="mt-6">
          <Link href="/"><ArrowLeft /> Về trang chủ</Link>
        </Button>
      </div>
    </main>
  );
}

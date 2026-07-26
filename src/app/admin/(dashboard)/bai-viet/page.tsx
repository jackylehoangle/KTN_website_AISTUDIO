import Link from "next/link";
import { ExternalLink, Pencil, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ConfirmSubmitButton } from "@/components/admin/confirm-submit-button";
import { FlashMessage } from "@/components/admin/flash-message";
import { deletePostAction } from "@/app/admin/content-actions";
import { databaseTables } from "@/config/database";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import type { PostRecord } from "@/types/content";

export default async function AdminPostsPage({ searchParams }: { searchParams: Promise<Record<string, string | undefined>> }) {
  const messages = await searchParams;
  const supabase = await getSupabaseServerClient();
  const { data } = supabase ? await supabase.from(databaseTables.posts).select("*").order("updated_at", { ascending: false }) : { data: [] };
  const posts = (data ?? []) as PostRecord[];
  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div><p className="text-sm font-semibold text-primary">Nội dung</p><h1 className="mt-1 text-3xl font-extrabold text-navy">Bài viết</h1></div>
        <Button asChild><Link href="/admin/bai-viet/moi"><Plus /> Thêm bài viết</Link></Button>
      </div>
      <div className="mt-6"><FlashMessage saved={messages.saved} deleted={messages.deleted} error={messages.error} /></div>
      <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">
        <Table><TableHeader><TableRow><TableHead>Bài viết</TableHead><TableHead>Trạng thái</TableHead><TableHead>Xuất bản</TableHead><TableHead className="text-right">Thao tác</TableHead></TableRow></TableHeader>
          <TableBody>{posts.length === 0 ? <TableRow><TableCell colSpan={4} className="h-32 text-center text-muted-foreground">Chưa có bài viết.</TableCell></TableRow> : posts.map((post) => (
            <TableRow key={post.id}>
              <TableCell><p className="max-w-lg font-bold text-navy">{post.title}</p><p className="mt-1 text-xs text-muted-foreground">/{post.slug}</p></TableCell>
              <TableCell><Badge className={post.status === "published" ? "bg-emerald-100 text-emerald-800" : "bg-slate-100 text-slate-700"}>{post.status === "published" ? "Công khai" : "Bản nháp"}</Badge></TableCell>
              <TableCell className="text-sm text-muted-foreground">{post.published_at ? new Intl.DateTimeFormat("vi-VN").format(new Date(post.published_at)) : "—"}</TableCell>
              <TableCell><div className="flex justify-end gap-2">
                {post.status === "published" && <Button asChild variant="outline" size="icon-sm"><Link href={`/tin-tuc/${post.slug}`} target="_blank" aria-label="Xem bài viết"><ExternalLink /></Link></Button>}
                <Button asChild variant="outline" size="sm"><Link href={`/admin/bai-viet/${post.id}`}><Pencil /> Sửa</Link></Button>
                <form action={deletePostAction}><input type="hidden" name="id" value={post.id} /><ConfirmSubmitButton message="Anh/chị chắc chắn muốn xóa bài viết này?" /></form>
              </div></TableCell>
            </TableRow>
          ))}</TableBody>
        </Table>
      </div>
    </div>
  );
}

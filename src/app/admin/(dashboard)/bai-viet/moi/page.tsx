import { PostForm } from "@/components/admin/post-form";
import { savePostAction } from "@/app/admin/content-actions";

export default function NewPostPage() {
  return <div><p className="text-sm font-semibold text-primary">Bài viết</p><h1 className="mb-7 mt-1 text-3xl font-extrabold text-navy">Thêm bài viết mới</h1><PostForm action={savePostAction} /></div>;
}

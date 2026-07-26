import type { Metadata } from "next";
import { EmptyState } from "@/components/site/empty-state";
import { PageHero } from "@/components/site/page-hero";
import { PostCard } from "@/components/site/post-card";
import { getPublishedPosts } from "@/lib/data/public-content";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Tin tức & kiến thức",
  description: "Bài viết, thông tin và kiến thức được KTN biên tập trong các lĩnh vực công nghệ, năng lượng mặt trời và xây dựng.",
  path: "/tin-tuc",
});

export const revalidate = 300;

export default async function NewsPage() {
  const posts = await getPublishedPosts();
  return (
    <>
      <PageHero
        title="Tin tức & Kiến thức chuyên ngành"
        description="Cập nhật tin tức hoạt động và kiến thức chuyên môn mới nhất từ KTN."
        breadcrumbs={[{ label: "Tin tức" }]}
      />
      <section className="section-shell bg-white">
        <div className="site-container">
          {posts.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => <PostCard key={post.id} post={post} />)}
            </div>
          ) : (
            <EmptyState
              title="Chưa có bài viết được xuất bản"
              description="Bài viết sẽ xuất hiện tại đây sau khi nội dung thật được tạo và chuyển sang trạng thái công khai."
            />
          )}
        </div>
      </section>
    </>
  );
}

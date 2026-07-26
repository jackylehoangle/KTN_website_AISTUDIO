# Website doanh nghiệp KTN

Website chính thức của **Công ty Cổ phần Công nghệ Năng lượng và Xây dựng KTN**, gồm website công khai, biểu mẫu khách hàng và trang quản trị nội dung.

## Công nghệ

- Next.js 16.2 (App Router), React 19 và TypeScript.
- Tailwind CSS 4, shadcn/ui và font Be Vietnam Pro được lưu cục bộ.
- Supabase: PostgreSQL, Authentication và Storage.
- Resend hoặc SMTP cho email thông báo.
- Cấu hình sẵn để triển khai trên Vercel.

## 1. Yêu cầu môi trường

- Node.js 20.9 trở lên (khuyến nghị Node.js 22 LTS).
- npm 10 trở lên.
- Một dự án Supabase; có thể dùng chung `ktn-app` vì tài nguyên website được đặt tên riêng.
- Một tài khoản Resend đã xác minh tên miền hoặc thông tin SMTP.

## 2. Cài đặt cục bộ

```bash
npm install
cp .env.example .env.local
npm run dev
```

Mở `http://localhost:3000`. Khi chưa cấu hình Supabase, website công khai vẫn chạy và hiển thị trạng thái chưa có dự án/bài viết; form và quản trị chưa hoạt động.

## 3. Cấu hình Supabase

1. Mở project Supabase `ktn-app`. Không cần tạo project mới.
2. Mở **SQL Editor** và chạy toàn bộ tệp:

   `supabase/migrations/202607220001_initial.sql`

   Nếu database KTN đã được tạo từ trước, chạy thêm migration bổ sung văn bản bài viết:

   `supabase/migrations/202607230002_post_documents.sql`

   Bản sao thuận tiện để mở trực tiếp trong GitHub là `KTN_Post_Documents_Migration.sql`.

3. Lấy `Project URL`, `anon public key` và `service_role key` tại **Project Settings > API**.
4. Điền vào `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_...
SUPABASE_SECRET_KEY=sb_secret_...
LEAD_IP_SALT=chuỗi-ngẫu-nhiên-tối-thiểu-32-ký-tự
```

Nếu dự án chỉ hiển thị khóa legacy, có thể dùng `NEXT_PUBLIC_SUPABASE_ANON_KEY` và `SUPABASE_SERVICE_ROLE_KEY` thay thế. Không đặt `SUPABASE_SECRET_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, mật khẩu hoặc khóa email vào Git. Khóa đặc quyền chỉ được sử dụng phía máy chủ để lưu form và tệp khách hàng.

Migration tạo:

- `ktn_web_profiles`: quyền `admin` và `editor`.
- `ktn_web_projects`: dự án.
- `ktn_web_posts`: bài viết.
- `ktn_web_leads`: yêu cầu khách hàng.
- `ktn_web_lead_attachments`: thông tin tệp đính kèm.
- `ktn_web_automation_events`: hàng đợi sự kiện cho workflow automation.
- Bucket công khai `ktn-web-site-media`, `ktn-web-post-documents` và bucket riêng tư `ktn-web-lead-attachments`.
- RLS (phân quyền ở cấp dòng dữ liệu) và storage policies.

Các tên đều có tiền tố `ktn_web_` hoặc `ktn-web-`, không sửa bảng và bucket của ứng dụng đang có trong cùng project.

## 4. Tạo tài khoản quản trị đầu tiên

1. Trong Supabase, mở **Authentication > Users > Add user**.
2. Tạo người dùng bằng email và mật khẩu mạnh. Không gửi mật khẩu qua tin nhắn.
3. Sau khi user được tạo, chạy trong SQL Editor để chủ động cấp quyền website:

```sql
insert into public.ktn_web_profiles (id, full_name, role)
select id, 'Tên quản trị viên', 'admin'
from auth.users
where email = 'email-quan-tri@congtyktn.vn'
on conflict (id) do update
set full_name = excluded.full_name, role = excluded.role;
```

4. Đăng nhập tại `/admin/login`.

Tài khoản Supabase Auth không tự động có quyền website. Muốn thêm biên tập viên, KTN phải chủ động thêm user đó vào `ktn_web_profiles` với role `editor`; biên tập viên được quản lý dự án và bài viết nhưng không được xem thông tin khách hàng. Chỉ `admin` được xem và cập nhật yêu cầu khách hàng.

## 5. Cấu hình email

### Resend (khuyến nghị)

Xác minh `congtyktn.vn` trên Resend, sau đó điền:

```env
RESEND_API_KEY=re_...
EMAIL_FROM="KTN Website <website@congtyktn.vn>"
LEAD_NOTIFICATION_EMAIL=admin@congtyktn.vn
```

### SMTP

Nếu không dùng Resend, để trống `RESEND_API_KEY` và điền `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS`.

Form vẫn lưu vào Supabase nếu email tạm thời lỗi. Cần kiểm tra cả email và trang `/admin/khach-hang` sau khi cấu hình.

## 6. Form và chống spam

- Kiểm tra dữ liệu ở trình duyệt và máy chủ bằng Zod.
- Honeypot và kiểm tra thời gian điền form.
- Giới hạn tối đa 5 yêu cầu trên một dấu vân tay IP trong 15 phút.
- IP được băm HMAC; không lưu IP thô. Hãy đặt `LEAD_IP_SALT` bằng chuỗi ngẫu nhiên tối thiểu 32 ký tự.
- Tệp tối đa 10 MB; chỉ nhận PDF, Word, Excel, JPG, PNG và WebP.
- Tệp khách hàng nằm trong bucket riêng tư, link tải của quản trị viên hết hạn sau 10 phút.

## 7. Quản trị nội dung

- `/admin/du-an`: tạo, sửa, xóa và xuất bản dự án.
- `/admin/bai-viet`: tạo, sửa, xóa và xuất bản bài viết.
- Bài viết có thể đính kèm một văn bản PDF, Word hoặc Excel tối đa 20 MB. Tệp được lưu trong bucket riêng của bài viết và hiển thị bằng nút mở/tải ở cuối nội dung công khai.
- `/admin/khach-hang`: xem yêu cầu, tải tệp và chuyển trạng thái `Mới` → `Đã liên hệ` → `Đã xử lý`.
- Nội dung dài dùng Markdown. HTML thô không được render để giảm rủi ro XSS.
- Dự án/bài viết chỉ xuất hiện công khai khi trạng thái là `Công khai`.

## 8. Kết nối workflow automation

Mỗi khi form tạo một bản ghi trong `ktn_web_leads`, trigger database tự động thêm đúng một sự kiện `lead.created` vào `ktn_web_automation_events`. Workflow chỉ cần nhận webhook khi bảng sự kiện có bản ghi mới, xử lý theo `payload`, rồi cập nhật `status`, `attempt_count`, `processed_at` hoặc `last_error`.

Không cấu hình URL webhook trong source. Tạo Database Webhook trong Supabase sau khi URL tiếp nhận của n8n/Make/hệ thống automation đã sẵn sàng. Webhook cần khóa bí mật và workflow phải chống xử lý trùng theo `id` của sự kiện.

## 9. Logo và nội dung thương hiệu

Logo hiện dùng tại `public/brand/ktn-logo.png`. Tệp đã được tối ưu từ logo KTN có dòng `TECH - SOLAR - BUILD`. Nếu thay logo chính thức, giữ tên tệp này hoặc sửa `src/config/site.ts`.

Thông tin liên hệ mặc định đặt trong `src/config/site.ts` và có thể ghi đè bằng biến môi trường. Kiểm tra lại địa chỉ, email, số điện thoại, chính sách bảo mật và điều khoản trước khi đưa website lên production.

## 10. Kiểm tra chất lượng

```bash
npm run lint
npm run typecheck
npm run build
```

Các kiểm tra cần thực hiện trước production:

- Trang chủ và 12 trang công khai trên desktop/mobile.
- Menu, liên kết, trang 404 và các trạng thái trống.
- Gửi form hợp lệ/sai dữ liệu, chống spam và tải tệp.
- Email thông báo.
- Đăng nhập, phân quyền editor/admin và CRUD nội dung.
- Metadata, Open Graph, `/sitemap.xml`, `/robots.txt` và schema.

## 11. Triển khai Vercel (chỉ sau khi được duyệt)

1. Đưa source lên repository Git riêng của KTN.
2. Import repository vào Vercel.
3. Khai báo toàn bộ biến môi trường trong **Project Settings > Environment Variables**.
4. Chạy bản Preview trước; kiểm thử lại form, email, quản trị và giao diện mobile.
5. Chỉ gắn `congtyktn.vn` và triển khai Production sau khi nội dung, logo, pháp lý và dữ liệu thật được phê duyệt.

Website hiện không chứa số liệu thành tích, dự án mẫu hoặc bài viết giả.

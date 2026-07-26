-- Migration bổ sung chức năng đính kèm văn bản cho bài viết KTN.
-- Chạy toàn bộ tệp này một lần trong Supabase SQL Editor.

begin;

alter table public.ktn_web_posts
  add column if not exists document_path text,
  add column if not exists document_name text,
  add column if not exists document_mime_type text,
  add column if not exists document_size_bytes bigint,
  add column if not exists document_label text;

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'ktn_web_posts_document_metadata_check'
      and conrelid = 'public.ktn_web_posts'::regclass
  ) then
    alter table public.ktn_web_posts
      add constraint ktn_web_posts_document_metadata_check
      check (
        (
          document_path is null
          and document_name is null
          and document_mime_type is null
          and document_size_bytes is null
          and document_label is null
        )
        or
        (
          document_path ~ '^posts/[0-9]{4}/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\.(pdf|doc|docx|xls|xlsx)$'
          and char_length(document_name) between 1 and 255
          and document_mime_type in (
            'application/pdf',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'application/vnd.ms-excel',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
          )
          and document_size_bytes between 1 and 20971520
          and (document_label is null or char_length(document_label) between 1 and 180)
          and (
            (document_path ~ '\.pdf$' and lower(document_name) ~ '\.pdf$' and document_mime_type = 'application/pdf')
            or (document_path ~ '\.doc$' and lower(document_name) ~ '\.doc$' and document_mime_type = 'application/msword')
            or (document_path ~ '\.docx$' and lower(document_name) ~ '\.docx$' and document_mime_type = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')
            or (document_path ~ '\.xls$' and lower(document_name) ~ '\.xls$' and document_mime_type = 'application/vnd.ms-excel')
            or (document_path ~ '\.xlsx$' and lower(document_name) ~ '\.xlsx$' and document_mime_type = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
          )
        )
      );
  end if;
end
$$;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'ktn-web-post-documents',
  'ktn-web-post-documents',
  true,
  20971520,
  array[
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  ]
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "ktn web post documents public read" on storage.objects;
create policy "ktn web post documents public read" on storage.objects
for select to anon, authenticated
using (bucket_id = 'ktn-web-post-documents');

drop policy if exists "ktn web post documents managers insert" on storage.objects;
create policy "ktn web post documents managers insert" on storage.objects
for insert to authenticated
with check (
  bucket_id = 'ktn-web-post-documents'
  and (storage.foldername(name))[1] = 'posts'
  and public.ktn_web_is_content_manager()
);

drop policy if exists "ktn web post documents managers update" on storage.objects;
create policy "ktn web post documents managers update" on storage.objects
for update to authenticated
using (
  bucket_id = 'ktn-web-post-documents'
  and (storage.foldername(name))[1] = 'posts'
  and public.ktn_web_is_content_manager()
)
with check (
  bucket_id = 'ktn-web-post-documents'
  and (storage.foldername(name))[1] = 'posts'
  and public.ktn_web_is_content_manager()
);

drop policy if exists "ktn web post documents managers delete" on storage.objects;
create policy "ktn web post documents managers delete" on storage.objects
for delete to authenticated
using (
  bucket_id = 'ktn-web-post-documents'
  and (storage.foldername(name))[1] = 'posts'
  and public.ktn_web_is_content_manager()
);

commit;

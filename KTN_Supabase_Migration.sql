begin;

create extension if not exists pgcrypto;

do $$ begin
  create type public.ktn_web_admin_role as enum ('admin', 'editor');
exception when duplicate_object then null;
end $$;

do $$ begin
  create type public.ktn_web_content_status as enum ('draft', 'published');
exception when duplicate_object then null;
end $$;

do $$ begin
  create type public.ktn_web_sector_key as enum ('tech', 'solar', 'build');
exception when duplicate_object then null;
end $$;

do $$ begin
  create type public.ktn_web_lead_status as enum ('new', 'contacted', 'resolved');
exception when duplicate_object then null;
end $$;

do $$ begin
  create type public.ktn_web_automation_status as enum ('pending', 'processing', 'completed', 'failed');
exception when duplicate_object then null;
end $$;

create table if not exists public.ktn_web_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  role public.ktn_web_admin_role not null default 'editor',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.ktn_web_is_content_manager()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.ktn_web_profiles
    where id = auth.uid() and role in ('admin', 'editor')
  );
$$;

create or replace function public.ktn_web_is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.ktn_web_profiles
    where id = auth.uid() and role = 'admin'
  );
$$;

create table if not exists public.ktn_web_projects (
  id uuid primary key default gen_random_uuid(),
  title text not null check (char_length(title) between 3 and 180),
  slug text not null unique check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  summary text not null check (char_length(summary) between 10 and 500),
  content text not null check (char_length(content) >= 10),
  sector public.ktn_web_sector_key not null,
  status public.ktn_web_content_status not null default 'draft',
  location text,
  client_name text,
  completed_at date,
  featured boolean not null default false,
  cover_path text,
  seo_title text,
  seo_description text,
  created_by uuid references auth.users(id) on delete set null,
  updated_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.ktn_web_posts (
  id uuid primary key default gen_random_uuid(),
  title text not null check (char_length(title) between 3 and 180),
  slug text not null unique check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  excerpt text not null check (char_length(excerpt) between 10 and 500),
  content text not null check (char_length(content) >= 10),
  status public.ktn_web_content_status not null default 'draft',
  cover_path text,
  document_path text,
  document_name text,
  document_mime_type text,
  document_size_bytes bigint,
  document_label text,
  published_at timestamptz,
  seo_title text,
  seo_description text,
  created_by uuid references auth.users(id) on delete set null,
  updated_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint ktn_web_posts_document_metadata_check check (
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
  )
);

create table if not exists public.ktn_web_leads (
  id uuid primary key default gen_random_uuid(),
  full_name text not null check (char_length(full_name) between 2 and 100),
  phone text not null,
  email text,
  sector public.ktn_web_sector_key not null,
  province text not null,
  address text,
  message text not null check (char_length(message) between 10 and 3000),
  preferred_channel text not null check (preferred_channel in ('phone', 'zalo', 'email')),
  privacy_accepted boolean not null check (privacy_accepted = true),
  status public.ktn_web_lead_status not null default 'new',
  source text not null default 'website',
  ip_hash text,
  user_agent text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.ktn_web_lead_attachments (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid not null references public.ktn_web_leads(id) on delete cascade,
  storage_path text not null unique,
  original_name text not null,
  mime_type text not null,
  size_bytes bigint not null check (size_bytes > 0 and size_bytes <= 10485760),
  created_at timestamptz not null default now()
);

create table if not exists public.ktn_web_automation_events (
  id uuid primary key default gen_random_uuid(),
  event_type text not null,
  aggregate_type text not null,
  aggregate_id uuid not null,
  payload jsonb not null default '{}'::jsonb,
  status public.ktn_web_automation_status not null default 'pending',
  attempt_count integer not null default 0 check (attempt_count >= 0),
  processed_at timestamptz,
  last_error text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists ktn_web_projects_public_idx on public.ktn_web_projects(status, sector, created_at desc);
create index if not exists ktn_web_projects_featured_idx on public.ktn_web_projects(featured, status) where featured = true;
create index if not exists ktn_web_posts_public_idx on public.ktn_web_posts(status, published_at desc);
create index if not exists ktn_web_leads_status_created_idx on public.ktn_web_leads(status, created_at desc);
create index if not exists ktn_web_leads_rate_limit_idx on public.ktn_web_leads(ip_hash, created_at desc);
create index if not exists ktn_web_lead_attachments_lead_idx on public.ktn_web_lead_attachments(lead_id);
create index if not exists ktn_web_automation_pending_idx on public.ktn_web_automation_events(status, created_at) where status in ('pending', 'failed');
create unique index if not exists ktn_web_automation_lead_created_once_idx
  on public.ktn_web_automation_events(event_type, aggregate_id)
  where event_type = 'lead.created';

create or replace function public.ktn_web_set_updated_at()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists ktn_web_profiles_set_updated_at on public.ktn_web_profiles;
create trigger ktn_web_profiles_set_updated_at before update on public.ktn_web_profiles
for each row execute function public.ktn_web_set_updated_at();

drop trigger if exists ktn_web_projects_set_updated_at on public.ktn_web_projects;
create trigger ktn_web_projects_set_updated_at before update on public.ktn_web_projects
for each row execute function public.ktn_web_set_updated_at();

drop trigger if exists ktn_web_posts_set_updated_at on public.ktn_web_posts;
create trigger ktn_web_posts_set_updated_at before update on public.ktn_web_posts
for each row execute function public.ktn_web_set_updated_at();

drop trigger if exists ktn_web_leads_set_updated_at on public.ktn_web_leads;
create trigger ktn_web_leads_set_updated_at before update on public.ktn_web_leads
for each row execute function public.ktn_web_set_updated_at();

drop trigger if exists ktn_web_automation_events_set_updated_at on public.ktn_web_automation_events;
create trigger ktn_web_automation_events_set_updated_at before update on public.ktn_web_automation_events
for each row execute function public.ktn_web_set_updated_at();

drop trigger if exists ktn_web_on_auth_user_created on auth.users;
drop function if exists public.ktn_web_handle_new_user();

create or replace function public.ktn_web_queue_new_lead()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.ktn_web_automation_events (
    event_type,
    aggregate_type,
    aggregate_id,
    payload
  ) values (
    'lead.created',
    'lead',
    new.id,
    jsonb_build_object(
      'lead_id', new.id,
      'full_name', new.full_name,
      'phone', new.phone,
      'email', new.email,
      'sector', new.sector,
      'province', new.province,
      'address', new.address,
      'message', new.message,
      'preferred_channel', new.preferred_channel,
      'source', new.source,
      'created_at', new.created_at
    )
  )
  on conflict do nothing;
  return new;
end;
$$;

drop trigger if exists ktn_web_queue_new_lead_event on public.ktn_web_leads;
create trigger ktn_web_queue_new_lead_event
after insert on public.ktn_web_leads
for each row execute function public.ktn_web_queue_new_lead();

alter table public.ktn_web_profiles enable row level security;
alter table public.ktn_web_projects enable row level security;
alter table public.ktn_web_posts enable row level security;
alter table public.ktn_web_leads enable row level security;
alter table public.ktn_web_lead_attachments enable row level security;
alter table public.ktn_web_automation_events enable row level security;

drop policy if exists "ktn web profiles read own or admin" on public.ktn_web_profiles;
create policy "ktn web profiles read own or admin" on public.ktn_web_profiles
for select to authenticated
using (id = auth.uid() or public.ktn_web_is_admin());

drop policy if exists "ktn web profiles admin manage" on public.ktn_web_profiles;
create policy "ktn web profiles admin manage" on public.ktn_web_profiles
for all to authenticated
using (public.ktn_web_is_admin())
with check (public.ktn_web_is_admin());

drop policy if exists "ktn web projects public read" on public.ktn_web_projects;
create policy "ktn web projects public read" on public.ktn_web_projects
for select to anon, authenticated
using (status = 'published' or public.ktn_web_is_content_manager());

drop policy if exists "ktn web projects managers write" on public.ktn_web_projects;
create policy "ktn web projects managers write" on public.ktn_web_projects
for all to authenticated
using (public.ktn_web_is_content_manager())
with check (public.ktn_web_is_content_manager());

drop policy if exists "ktn web posts public read" on public.ktn_web_posts;
create policy "ktn web posts public read" on public.ktn_web_posts
for select to anon, authenticated
using (status = 'published' or public.ktn_web_is_content_manager());

drop policy if exists "ktn web posts managers write" on public.ktn_web_posts;
create policy "ktn web posts managers write" on public.ktn_web_posts
for all to authenticated
using (public.ktn_web_is_content_manager())
with check (public.ktn_web_is_content_manager());

drop policy if exists "ktn web leads admin read" on public.ktn_web_leads;
create policy "ktn web leads admin read" on public.ktn_web_leads
for select to authenticated using (public.ktn_web_is_admin());

drop policy if exists "ktn web leads admin update" on public.ktn_web_leads;
create policy "ktn web leads admin update" on public.ktn_web_leads
for update to authenticated using (public.ktn_web_is_admin()) with check (public.ktn_web_is_admin());

drop policy if exists "ktn web leads admin delete" on public.ktn_web_leads;
create policy "ktn web leads admin delete" on public.ktn_web_leads
for delete to authenticated using (public.ktn_web_is_admin());

drop policy if exists "ktn web lead attachments admin read" on public.ktn_web_lead_attachments;
create policy "ktn web lead attachments admin read" on public.ktn_web_lead_attachments
for select to authenticated using (public.ktn_web_is_admin());

drop policy if exists "ktn web automation events admin read" on public.ktn_web_automation_events;
create policy "ktn web automation events admin read" on public.ktn_web_automation_events
for select to authenticated using (public.ktn_web_is_admin());

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values
  ('ktn-web-site-media', 'ktn-web-site-media', true, 8388608, array['image/jpeg', 'image/png', 'image/webp']),
  ('ktn-web-post-documents', 'ktn-web-post-documents', true, 20971520, array[
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  ]),
  ('ktn-web-lead-attachments', 'ktn-web-lead-attachments', false, 10485760, array[
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'image/jpeg',
    'image/png',
    'image/webp'
  ])
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "ktn web site media public read" on storage.objects;
create policy "ktn web site media public read" on storage.objects
for select to anon, authenticated using (bucket_id = 'ktn-web-site-media');

drop policy if exists "ktn web site media managers insert" on storage.objects;
create policy "ktn web site media managers insert" on storage.objects
for insert to authenticated with check (bucket_id = 'ktn-web-site-media' and public.ktn_web_is_content_manager());

drop policy if exists "ktn web site media managers update" on storage.objects;
create policy "ktn web site media managers update" on storage.objects
for update to authenticated
using (bucket_id = 'ktn-web-site-media' and public.ktn_web_is_content_manager())
with check (bucket_id = 'ktn-web-site-media' and public.ktn_web_is_content_manager());

drop policy if exists "ktn web site media managers delete" on storage.objects;
create policy "ktn web site media managers delete" on storage.objects
for delete to authenticated using (bucket_id = 'ktn-web-site-media' and public.ktn_web_is_content_manager());

drop policy if exists "ktn web post documents public read" on storage.objects;
create policy "ktn web post documents public read" on storage.objects
for select to anon, authenticated using (bucket_id = 'ktn-web-post-documents');

drop policy if exists "ktn web post documents managers insert" on storage.objects;
create policy "ktn web post documents managers insert" on storage.objects
for insert to authenticated with check (
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
for delete to authenticated using (
  bucket_id = 'ktn-web-post-documents'
  and (storage.foldername(name))[1] = 'posts'
  and public.ktn_web_is_content_manager()
);

drop policy if exists "ktn web lead files admin read" on storage.objects;
create policy "ktn web lead files admin read" on storage.objects
for select to authenticated using (bucket_id = 'ktn-web-lead-attachments' and public.ktn_web_is_admin());

grant usage on schema public to anon, authenticated, service_role;
grant select on public.ktn_web_projects, public.ktn_web_posts to anon;
grant select, insert, update, delete on public.ktn_web_projects, public.ktn_web_posts to authenticated;
grant select, update, delete on public.ktn_web_leads to authenticated;
grant select on public.ktn_web_lead_attachments, public.ktn_web_automation_events to authenticated;
grant select on public.ktn_web_profiles to authenticated;
grant all on public.ktn_web_profiles, public.ktn_web_projects, public.ktn_web_posts,
  public.ktn_web_leads, public.ktn_web_lead_attachments, public.ktn_web_automation_events to service_role;
grant execute on function public.ktn_web_is_content_manager() to anon, authenticated;
grant execute on function public.ktn_web_is_admin() to anon, authenticated;

commit;

alter table public.ktn_web_posts
  add column if not exists automation_key text,
  add column if not exists source_url text,
  add column if not exists source_name text;

create unique index if not exists ktn_web_posts_automation_key_unique_idx
  on public.ktn_web_posts (automation_key)
  where automation_key is not null;

create index if not exists ktn_web_posts_source_url_idx
  on public.ktn_web_posts (source_url)
  where source_url is not null;

comment on column public.ktn_web_posts.automation_key is
  'KhĂ³a á»•n Ä‘á»‹nh tá»« há»‡ thá»‘ng tá»± Ä‘á»™ng hĂ³a, dĂ¹ng Ä‘á»ƒ cáº­p nháº­t thay vĂ¬ Ä‘Äƒng trĂ¹ng.';

comment on column public.ktn_web_posts.source_url is
  'URL bĂ i nguá»“n Ä‘á»ƒ kiá»ƒm chá»©ng vĂ  ghi nháº­n xuáº¥t xá»© ná»™i dung.';

comment on column public.ktn_web_posts.source_name is
  'TĂªn Ä‘Æ¡n vá»‹ hoáº·c website cung cáº¥p ná»™i dung nguá»“n.';


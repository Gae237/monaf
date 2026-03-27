-- Enable RLS on all tables
alter table public.site_images enable row level security;
alter table public.news_articles enable row level security;
alter table public.staff_members enable row level security;
alter table public.gallery_items enable row level security;
alter table public.events enable row level security;
alter table public.registrations enable row level security;

-- Site Images: anyone can read, only authenticated users can modify
create policy "site_images_public_read" on public.site_images for select using (true);
create policy "site_images_auth_insert" on public.site_images for insert to authenticated with check (true);
create policy "site_images_auth_update" on public.site_images for update to authenticated using (true);
create policy "site_images_auth_delete" on public.site_images for delete to authenticated using (true);

-- News Articles: anyone can read published, only authenticated can modify
create policy "news_public_read" on public.news_articles for select using (is_published = true);
create policy "news_auth_read_all" on public.news_articles for select to authenticated using (true);
create policy "news_auth_insert" on public.news_articles for insert to authenticated with check (true);
create policy "news_auth_update" on public.news_articles for update to authenticated using (true);
create policy "news_auth_delete" on public.news_articles for delete to authenticated using (true);

-- Staff Members: anyone can read active, only authenticated can modify
create policy "staff_public_read" on public.staff_members for select using (is_active = true);
create policy "staff_auth_read_all" on public.staff_members for select to authenticated using (true);
create policy "staff_auth_insert" on public.staff_members for insert to authenticated with check (true);
create policy "staff_auth_update" on public.staff_members for update to authenticated using (true);
create policy "staff_auth_delete" on public.staff_members for delete to authenticated using (true);

-- Gallery Items: anyone can read public items, only authenticated can modify
create policy "gallery_public_read" on public.gallery_items for select using (is_public = true);
create policy "gallery_auth_read_all" on public.gallery_items for select to authenticated using (true);
create policy "gallery_auth_insert" on public.gallery_items for insert to authenticated with check (true);
create policy "gallery_auth_update" on public.gallery_items for update to authenticated using (true);
create policy "gallery_auth_delete" on public.gallery_items for delete to authenticated using (true);

-- Events: anyone can read, only authenticated can modify
create policy "events_public_read" on public.events for select using (true);
create policy "events_auth_insert" on public.events for insert to authenticated with check (true);
create policy "events_auth_update" on public.events for update to authenticated using (true);
create policy "events_auth_delete" on public.events for delete to authenticated using (true);

-- Registrations: anyone can insert (public form), only authenticated can read/modify
create policy "registrations_public_insert" on public.registrations for insert with check (true);
create policy "registrations_auth_read" on public.registrations for select to authenticated using (true);
create policy "registrations_auth_update" on public.registrations for update to authenticated using (true);
create policy "registrations_auth_delete" on public.registrations for delete to authenticated using (true);

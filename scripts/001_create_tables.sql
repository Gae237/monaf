-- Site Images: manages images displayed on public pages
create table if not exists public.site_images (
  id uuid primary key default gen_random_uuid(),
  page text not null,
  section text not null,
  image_url text not null,
  alt_text text default '',
  sort_order integer default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  unique(page, section)
);

-- News Articles
create table if not exists public.news_articles (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  excerpt text default '',
  content text default '',
  category text default 'general',
  featured_image_url text default '',
  author text default 'OMSA Admin',
  is_published boolean default false,
  published_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Staff Members
create table if not exists public.staff_members (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  position text not null,
  role text default 'Coach',
  email text default '',
  phone text default '',
  bio text default '',
  profile_image_url text default '',
  sort_order integer default 0,
  is_active boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Gallery Items
create table if not exists public.gallery_items (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text default '',
  image_url text not null,
  media_type text default 'photo',
  season text default '2024-2025',
  category text default 'training',
  is_public boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Events
create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text default '',
  event_date timestamptz not null,
  location text default '',
  poster_image_url text default '',
  category text default 'match',
  status text default 'upcoming',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Registrations (from public form)
create table if not exists public.registrations (
  id uuid primary key default gen_random_uuid(),
  first_name text not null,
  last_name text not null,
  date_of_birth date not null,
  gender text default 'male',
  nationality text default '',
  guardian_name text default '',
  guardian_phone text default '',
  guardian_email text default '',
  address text default '',
  previous_club text default '',
  preferred_position text default '',
  medical_notes text default '',
  program text default 'day',
  category text default '',
  status text default 'pending',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- LinkedOut: Initial schema

-- Enable UUID generation
create extension if not exists "pgcrypto";

-- Posts table
create table if not exists posts (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  tag text not null,
  time text not null default 'now',
  icon text not null default 'InboxIcon',
  text text not null,
  reactions integer not null default 0,
  comments_count integer not null default 0,
  created_at timestamptz default now()
);

-- Comments on posts
create table if not exists comments (
  id uuid primary key default gen_random_uuid(),
  post_id uuid references posts(id) on delete cascade not null,
  name text not null,
  text text not null,
  time text not null default 'now',
  created_at timestamptz default now()
);

-- Messages (inbox threads)
create table if not exists messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  preview text not null,
  time text not null default 'now',
  created_at timestamptz default now()
);

-- Replies within a message thread
create table if not exists message_replies (
  id uuid primary key default gen_random_uuid(),
  message_id uuid references messages(id) on delete cascade not null,
  name text not null,
  text text not null,
  time text not null default 'now',
  created_at timestamptz default now()
);

-- Satirical job listings
create table if not exists jobs (
  id uuid primary key default gen_random_uuid(),
  company text not null,
  title text not null,
  salary text not null,
  requirements text[] not null default '{}',
  description text not null,
  applicants integer not null default 0,
  posted text not null default 'now',
  urgent boolean not null default false,
  created_at timestamptz default now()
);

-- Notifications
create table if not exists notifications (
  id uuid primary key default gen_random_uuid(),
  icon text not null default 'BellIcon',
  text text not null,
  time text not null default 'now',
  read boolean not null default false,
  created_at timestamptz default now()
);

-- Enable Row Level Security (open access for anonymous app)
alter table posts enable row level security;
alter table comments enable row level security;
alter table messages enable row level security;
alter table message_replies enable row level security;
alter table jobs enable row level security;
alter table notifications enable row level security;

-- Allow anonymous access (everyone can read/write)
create policy "Allow all on posts" on posts for all using (true) with check (true);
create policy "Allow all on comments" on comments for all using (true) with check (true);
create policy "Allow all on messages" on messages for all using (true) with check (true);
create policy "Allow all on message_replies" on message_replies for all using (true) with check (true);
create policy "Allow all on jobs" on jobs for all using (true) with check (true);
create policy "Allow all on notifications" on notifications for all using (true) with check (true);

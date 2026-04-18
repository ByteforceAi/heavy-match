-- 철연 CHEOLYEON · 랜딩 문의(Inquiry) 테이블
--
-- 랜딩 페이지 상담 신청 폼이 저장되는 source-of-truth 테이블.
-- 서비스 롤 키(API route)만 INSERT, admin role 프로필만 SELECT/UPDATE.

create table if not exists public.inquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  company text not null,
  phone text not null,
  email text,
  role text,
  message text,
  source text default 'landing',
  status text default 'new' check (status in ('new', 'contacted', 'qualified', 'closed')),
  created_at timestamptz not null default now(),
  contacted_at timestamptz,
  ip_address inet,
  user_agent text,
  notes text
);

create index if not exists idx_inquiries_created_at on public.inquiries (created_at desc);
create index if not exists idx_inquiries_status on public.inquiries (status);

-- RLS
alter table public.inquiries enable row level security;

-- Service role inserts (API routes use service role key)
create policy "service_role_insert" on public.inquiries
  for insert to service_role with check (true);

-- Admin users can select/update
create policy "admin_select" on public.inquiries
  for select to authenticated using (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
  );

create policy "admin_update" on public.inquiries
  for update to authenticated using (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
  );

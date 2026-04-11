-- Supabase Dashboard → SQL Editor → New query → pega todo → Run
-- Si la tabla ya existía y sigue el error, ejecuta solo la última línea NOTIFY.

create table if not exists public.rsvp (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  payload jsonb not null
);

alter table public.rsvp enable row level security;

grant usage on schema public to anon;
grant insert on table public.rsvp to anon;

drop policy if exists "rsvp_insert_anon" on public.rsvp;
create policy "rsvp_insert_anon" on public.rsvp for insert to anon with check (true);

-- Refresca la caché de la API (PostgREST) para que aparezca `public.rsvp`
notify pgrst, 'reload schema';

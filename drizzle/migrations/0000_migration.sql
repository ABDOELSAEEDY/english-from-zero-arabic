
create table public.levels (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  title_ar text not null,
  title_en text not null,
  description_ar text not null default '',
  order_index int not null
);
create table public.units (
  id uuid primary key default gen_random_uuid(),
  level_id uuid not null references public.levels(id) on delete cascade,
  order_index int not null,
  title_en text not null,
  title_ar text not null,
  description_ar text not null default '',
  icon text not null default '📘'
);
create table public.vocabulary (
  id uuid primary key default gen_random_uuid(),
  unit_id uuid not null references public.units(id) on delete cascade,
  order_index int not null default 0,
  word text not null,
  translation_ar text not null,
  part_of_speech text,
  example_en text,
  example_ar text,
  phonetic text
);
create table public.sentences (
  id uuid primary key default gen_random_uuid(),
  unit_id uuid not null references public.units(id) on delete cascade,
  order_index int not null default 0,
  text_en text not null,
  text_ar text not null,
  note_ar text
);
create table public.grammar_lessons (
  id uuid primary key default gen_random_uuid(),
  unit_id uuid not null references public.units(id) on delete cascade,
  title_ar text not null,
  explanation_ar text not null,
  examples jsonb not null default '[]'::jsonb
);
create table public.stories (
  id uuid primary key default gen_random_uuid(),
  unit_id uuid not null references public.units(id) on delete cascade,
  title_en text not null,
  title_ar text not null,
  body_en text not null,
  body_ar text not null
);
create table public.quizzes (
  id uuid primary key default gen_random_uuid(),
  unit_id uuid references public.units(id) on delete cascade,
  level_id uuid references public.levels(id) on delete cascade,
  kind text not null check (kind in ('unit_test','placement')),
  title text not null
);
create table public.exercises (
  id uuid primary key default gen_random_uuid(),
  unit_id uuid references public.units(id) on delete cascade,
  story_id uuid references public.stories(id) on delete cascade,
  quiz_id uuid references public.quizzes(id) on delete cascade,
  level_id uuid references public.levels(id) on delete cascade,
  order_index int not null default 0,
  type text not null check (type in ('multiple_choice','fill_blank','word_order','translate_choice','listening')),
  question text not null,
  options jsonb not null default '[]'::jsonb,
  correct_answer text not null,
  explanation_ar text
);
create index on public.units(level_id);
create index on public.vocabulary(unit_id);
create index on public.sentences(unit_id);
create index on public.exercises(unit_id);
create index on public.exercises(quiz_id);

create table public.user_progress (
  user_id uuid not null,
  unit_id uuid not null references public.units(id) on delete cascade,
  section text not null,
  completed boolean not null default false,
  score int not null default 0,
  updated_at timestamptz not null default now(),
  primary key (user_id, unit_id, section)
);
create table public.user_vocab_review (
  user_id uuid not null,
  vocab_id uuid not null references public.vocabulary(id) on delete cascade,
  box int not null default 1 check (box between 1 and 5),
  next_review_at timestamptz not null default now(),
  correct_count int not null default 0,
  wrong_count int not null default 0,
  primary key (user_id, vocab_id)
);
create table public.user_stats (
  user_id uuid primary key,
  xp int not null default 0,
  streak_days int not null default 0,
  last_active_date date,
  current_level_id uuid references public.levels(id),
  placement_done boolean not null default false,
  total_answers int not null default 0,
  correct_answers int not null default 0
);

do $$
declare t text;
begin
  foreach t in array array['levels','units','vocabulary','sentences','grammar_lessons','stories','quizzes','exercises'] loop
    execute format('grant select on public.%I to anon, authenticated', t);
    execute format('grant all on public.%I to service_role', t);
    execute format('alter table public.%I enable row level security', t);
    execute format('create policy "public read" on public.%I for select to anon, authenticated using (true)', t);
  end loop;
  foreach t in array array['user_progress','user_vocab_review','user_stats'] loop
    execute format('grant select, insert, update, delete on public.%I to authenticated', t);
    execute format('grant all on public.%I to service_role', t);
    execute format('alter table public.%I enable row level security', t);
    execute format('create policy "own rows" on public.%I for all to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id)', t);
  end loop;
end $$;

create or replace function public.award_xp(amount int, answers int default 0, correct int default 0)
returns public.user_stats
language plpgsql security definer set search_path = public
as $$
declare
  uid uuid := auth.uid();
  today date := (now() at time zone 'Africa/Cairo')::date;
  r public.user_stats;
begin
  if uid is null then raise exception 'not authenticated'; end if;
  if amount < 0 or amount > 500 or answers < 0 or correct < 0 or correct > answers or answers > 100 then
    raise exception 'invalid values';
  end if;
  insert into public.user_stats(user_id) values (uid) on conflict do nothing;
  update public.user_stats set
    xp = xp + amount,
    total_answers = total_answers + answers,
    correct_answers = correct_answers + correct,
    streak_days = case
      when last_active_date = today then streak_days
      when last_active_date = today - 1 then streak_days + 1
      else 1 end,
    last_active_date = today
  where user_id = uid
  returning * into r;
  return r;
end $$;
revoke execute on function public.award_xp(int,int,int) from public, anon;
grant execute on function public.award_xp(int,int,int) to authenticated;

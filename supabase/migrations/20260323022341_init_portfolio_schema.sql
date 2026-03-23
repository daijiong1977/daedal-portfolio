-- ============================================================
-- Portfolio schema — init migration
-- Tables: posts, about, projects, feedback
-- Admin auth handled via Supabase Auth (email/password)
-- ============================================================

-- Enable pgcrypto for gen_random_uuid()
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- ─── posts ───────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.posts (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug          text NOT NULL UNIQUE,
  title         text NOT NULL,
  description   text NOT NULL DEFAULT '',
  content       text NOT NULL DEFAULT '',
  tags          text[] NOT NULL DEFAULT '{}',
  date          date NOT NULL DEFAULT CURRENT_DATE,
  reading_time  text NOT NULL DEFAULT '5 min read',
  published     boolean NOT NULL DEFAULT false,
  created_at    timestamptz NOT NULL DEFAULT now(),
  updated_at    timestamptz NOT NULL DEFAULT now()
);

-- ─── about ───────────────────────────────────────────────────
-- Single-row table; always upsert with id = 1
CREATE TABLE IF NOT EXISTS public.about (
  id            int PRIMARY KEY DEFAULT 1,
  bio           text NOT NULL DEFAULT '',
  experience    jsonb NOT NULL DEFAULT '[]',   -- [{role, company, period, description}]
  photos        jsonb NOT NULL DEFAULT '[]',   -- [{url, alt, caption}]
  facts         text[] NOT NULL DEFAULT '{}',  -- bullet facts
  contact_email text NOT NULL DEFAULT '',
  github_url    text NOT NULL DEFAULT '',
  twitter_url   text NOT NULL DEFAULT '',
  updated_at    timestamptz NOT NULL DEFAULT now()
);

-- Ensure only one row can exist
ALTER TABLE public.about ADD CONSTRAINT about_single_row CHECK (id = 1);

-- ─── projects ────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.projects (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  github_id     bigint UNIQUE,               -- GitHub repository id for dedup
  name          text NOT NULL,
  full_name     text,                         -- owner/repo
  description   text NOT NULL DEFAULT '',
  url           text,                         -- homepage
  github_url    text,
  language      text,
  tags          text[] NOT NULL DEFAULT '{}',
  stars         int NOT NULL DEFAULT 0,
  forks         int NOT NULL DEFAULT 0,
  featured      boolean NOT NULL DEFAULT false,
  archived      boolean NOT NULL DEFAULT false,
  synced_at     timestamptz,
  created_at    timestamptz NOT NULL DEFAULT now(),
  updated_at    timestamptz NOT NULL DEFAULT now()
);

-- ─── feedback ────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.feedback (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name          text NOT NULL DEFAULT 'Anonymous',
  email         text NOT NULL DEFAULT '',
  message       text NOT NULL,
  post_slug     text REFERENCES public.posts(slug) ON DELETE SET NULL,
  reviewed      boolean NOT NULL DEFAULT false,
  created_at    timestamptz NOT NULL DEFAULT now()
);

-- ─── updated_at triggers ────────────────────────────────────
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER posts_updated_at BEFORE UPDATE ON public.posts
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER about_updated_at BEFORE UPDATE ON public.about
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER projects_updated_at BEFORE UPDATE ON public.projects
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ─── RLS ────────────────────────────────────────────────────
ALTER TABLE public.posts    ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.about    ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.feedback ENABLE ROW LEVEL SECURITY;

-- Public read: published posts
CREATE POLICY "public read published posts"
  ON public.posts FOR SELECT
  USING (published = true);

-- Public read: about
CREATE POLICY "public read about"
  ON public.about FOR SELECT
  TO anon, authenticated
  USING (true);

-- Public read: projects
CREATE POLICY "public read projects"
  ON public.projects FOR SELECT
  TO anon, authenticated
  USING (true);

-- Public insert: feedback
CREATE POLICY "public submit feedback"
  ON public.feedback FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Authenticated (admin) full access
CREATE POLICY "admin full access posts"
  ON public.posts FOR ALL
  TO authenticated
  USING (true) WITH CHECK (true);

CREATE POLICY "admin full access about"
  ON public.about FOR ALL
  TO authenticated
  USING (true) WITH CHECK (true);

CREATE POLICY "admin full access projects"
  ON public.projects FOR ALL
  TO authenticated
  USING (true) WITH CHECK (true);

CREATE POLICY "admin read feedback"
  ON public.feedback FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "admin update feedback"
  ON public.feedback FOR UPDATE
  TO authenticated
  USING (true) WITH CHECK (true);

-- ─── Storage bucket for about photos ────────────────────────
INSERT INTO storage.buckets (id, name, public)
VALUES ('about-photos', 'about-photos', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "public read about photos"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'about-photos');

CREATE POLICY "admin upload about photos"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'about-photos');

CREATE POLICY "admin delete about photos"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'about-photos');

-- ─── Seed about row ─────────────────────────────────────────
INSERT INTO public.about (id, bio, experience, facts, contact_email, github_url, twitter_url)
VALUES (
  1,
  'I''m Daedal Dai — software engineer, open-source tinkerer, and perpetual learner. I''ve been writing software professionally for over eight years. I find the reliability/performance/simplicity tradeoff space endlessly interesting.',
  '[
    {"role":"Senior Software Engineer","company":"Distributed Systems Lab","period":"2023 – present","description":"Leading backend infrastructure for a real-time data platform processing 100k+ events/sec."},
    {"role":"Software Engineer","company":"Inference Co.","period":"2021 – 2023","description":"Built the ML serving infrastructure for production AI models."},
    {"role":"Software Engineer","company":"Early-stage startup (stealth)","period":"2019 – 2021","description":"First engineering hire. Designed and built the full backend from scratch."}
  ]',
  '{"Building distributed systems infrastructure at scale","Contributing to open-source observability tooling","Writing about engineering culture and technical craft","Learning more Rust. Always more Rust."}',
  'hello@daedal.dev',
  'https://github.com/daedaldai',
  'https://twitter.com/daedaldai'
)
ON CONFLICT (id) DO NOTHING;

-- ─── Seed sample posts ──────────────────────────────────────
INSERT INTO public.posts (slug, title, description, content, tags, date, reading_time, published) VALUES
(
  'distributed-systems-observability',
  'Observability in Distributed Systems: Beyond Logs',
  'Why logs alone aren''t enough and how to build a complete observability stack with traces, metrics, and structured events.',
  E'When your service runs as a single process on a single machine, debugging is straightforward...\n\nDistributed systems break this model entirely. Requests fan out across dozens of services, each with its own failure modes...\n\nThe three pillars of observability — logs, metrics, and traces — each serve a distinct purpose...',
  ARRAY['distributed-systems','observability','go'],
  '2026-03-10', '8 min read', true
),
(
  'rust-ownership-in-practice',
  'Rust Ownership in Practice: Lessons from Production',
  'Six months of writing production Rust taught me that ownership isn''t the hard part — it''s knowing when to clone.',
  E'I spent the last six months migrating a hot path from Go to Rust...\n\nThe borrow checker is not your enemy — it''s a very strict code reviewer...',
  ARRAY['rust','systems','performance'],
  '2026-02-28', '11 min read', true
),
(
  'cicd-from-prototype-to-production',
  'CI/CD: From Prototype to Production in One Pipeline',
  'How we built a single GitHub Actions workflow that handles testing, building, and deploying across five environments.',
  E'Most CI/CD guides show you how to deploy to one environment...\n\nWe needed: local, dev, staging, canary, and production...',
  ARRAY['devops','cicd','github-actions'],
  '2026-02-10', '7 min read', true
),
(
  'the-art-of-code-review',
  'The Art of the Code Review',
  'Code review is not about catching bugs. It''s about transferring knowledge and building shared ownership.',
  E'I have reviewed thousands of pull requests over my career...\n\nThe best review I ever received wasn''t a nitpick — it was a question...',
  ARRAY['engineering-culture','code-review','teams'],
  '2026-01-22', '6 min read', true
),
(
  'understanding-llm-context-windows',
  'Understanding LLM Context Windows (and Why They Matter for Tooling)',
  'Context windows aren''t just a model limitation — they''re an architectural constraint that shapes how you build LLM-powered tools.',
  E'Every LLM has a context window — a maximum number of tokens it can attend to at once...\n\nFor application developers, this isn''t just a constraint to work around...',
  ARRAY['llm','ai','architecture'],
  '2026-01-08', '9 min read', true
)
ON CONFLICT (slug) DO NOTHING;

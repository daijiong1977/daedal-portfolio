-- Add bilingual (Mandarin/CN) fields to posts
ALTER TABLE public.posts
  ADD COLUMN IF NOT EXISTS title_cn       text NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS description_cn text NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS content_cn     text NOT NULL DEFAULT '';

-- Add bilingual (Mandarin/CN) fields to about
ALTER TABLE public.about
  ADD COLUMN IF NOT EXISTS bio_cn        text NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS facts_cn      text[] NOT NULL DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS experience_cn jsonb NOT NULL DEFAULT '[]';

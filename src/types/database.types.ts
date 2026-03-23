export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      about: {
        Row: {
          bio: string
          bio_cn: string
          contact_email: string
          experience: Json
          experience_cn: Json
          facts: string[]
          facts_cn: string[]
          github_url: string
          id: number
          photos: Json
          twitter_url: string
          updated_at: string
        }
        Insert: {
          bio?: string
          bio_cn?: string
          contact_email?: string
          experience?: Json
          experience_cn?: Json
          facts?: string[]
          facts_cn?: string[]
          github_url?: string
          id?: number
          photos?: Json
          twitter_url?: string
          updated_at?: string
        }
        Update: {
          bio?: string
          bio_cn?: string
          contact_email?: string
          experience?: Json
          experience_cn?: Json
          facts?: string[]
          facts_cn?: string[]
          github_url?: string
          id?: number
          photos?: Json
          twitter_url?: string
          updated_at?: string
        }
        Relationships: []
      }
      ai_providers: {
        Row: {
          api_key: string
          base_url: string | null
          created_at: string
          enabled: number | null
          id: number
          model: string | null
          name: string
          provider_type: string
          updated_at: string
        }
        Insert: {
          api_key: string
          base_url?: string | null
          created_at: string
          enabled?: number | null
          id?: number
          model?: string | null
          name: string
          provider_type: string
          updated_at: string
        }
        Update: {
          api_key?: string
          base_url?: string | null
          created_at?: string
          enabled?: number | null
          id?: number
          model?: string | null
          name?: string
          provider_type?: string
          updated_at?: string
        }
        Relationships: []
      }
      api_keys: {
        Row: {
          created_at: number
          is_seed: number | null
          key_id: string
          revoked_at: number | null
          salt: string
          secret_hash: string
          username: string
        }
        Insert: {
          created_at: number
          is_seed?: number | null
          key_id: string
          revoked_at?: number | null
          salt: string
          secret_hash: string
          username: string
        }
        Update: {
          created_at?: number
          is_seed?: number | null
          key_id?: string
          revoked_at?: number | null
          salt?: string
          secret_hash?: string
          username?: string
        }
        Relationships: []
      }
      apikey: {
        Row: {
          key_id: number
          name: string
          value: string | null
        }
        Insert: {
          key_id?: number
          name: string
          value?: string | null
        }
        Update: {
          key_id?: number
          name?: string
          value?: string | null
        }
        Relationships: []
      }
      article_analysis: {
        Row: {
          analysis_en: string
          analysis_id: number
          article_id: string
          created_at: string | null
          difficulty_id: number
        }
        Insert: {
          analysis_en: string
          analysis_id?: number
          article_id: string
          created_at?: string | null
          difficulty_id: number
        }
        Update: {
          analysis_en?: string
          analysis_id?: number
          article_id?: string
          created_at?: string | null
          difficulty_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "article_analysis_article_id_fkey"
            columns: ["article_id"]
            isOneToOne: false
            referencedRelation: "articles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "article_analysis_difficulty_id_fkey"
            columns: ["difficulty_id"]
            isOneToOne: false
            referencedRelation: "difficulty_levels"
            referencedColumns: ["difficulty_id"]
          },
        ]
      }
      article_images: {
        Row: {
          article_id: string
          created_at: string | null
          image_id: number
          image_name: string | null
          local_location: string | null
          new_url: string | null
          original_url: string | null
          small_location: string | null
        }
        Insert: {
          article_id: string
          created_at?: string | null
          image_id?: number
          image_name?: string | null
          local_location?: string | null
          new_url?: string | null
          original_url?: string | null
          small_location?: string | null
        }
        Update: {
          article_id?: string
          created_at?: string | null
          image_id?: number
          image_name?: string | null
          local_location?: string | null
          new_url?: string | null
          original_url?: string | null
          small_location?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_article_images_article_id"
            columns: ["article_id"]
            isOneToOne: false
            referencedRelation: "articles"
            referencedColumns: ["id"]
          },
        ]
      }
      article_summaries: {
        Row: {
          article_id: string
          difficulty_id: number | null
          generated_at: string | null
          id: number
          summary: string | null
        }
        Insert: {
          article_id: string
          difficulty_id?: number | null
          generated_at?: string | null
          id?: number
          summary?: string | null
        }
        Update: {
          article_id?: string
          difficulty_id?: number | null
          generated_at?: string | null
          id?: number
          summary?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "article_summaries_article_id_fkey"
            columns: ["article_id"]
            isOneToOne: false
            referencedRelation: "articles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "article_summaries_difficulty_id_fkey"
            columns: ["difficulty_id"]
            isOneToOne: false
            referencedRelation: "difficulty_levels"
            referencedColumns: ["difficulty_id"]
          },
        ]
      }
      articles: {
        Row: {
          category_id: number | null
          content: string | null
          crawled_at: string | null
          created_at: string | null
          deepseek_failed: number | null
          deepseek_in_progress: number | null
          deepseek_last_error: string | null
          deepseek_processed: boolean | null
          description: string | null
          id: string
          image_id: number | null
          processed_at: string | null
          pub_date: string | null
          source: string
          title: string
          url: string
          zh_title: string | null
        }
        Insert: {
          category_id?: number | null
          content?: string | null
          crawled_at?: string | null
          created_at?: string | null
          deepseek_failed?: number | null
          deepseek_in_progress?: number | null
          deepseek_last_error?: string | null
          deepseek_processed?: boolean | null
          description?: string | null
          id: string
          image_id?: number | null
          processed_at?: string | null
          pub_date?: string | null
          source: string
          title: string
          url: string
          zh_title?: string | null
        }
        Update: {
          category_id?: number | null
          content?: string | null
          crawled_at?: string | null
          created_at?: string | null
          deepseek_failed?: number | null
          deepseek_in_progress?: number | null
          deepseek_last_error?: string | null
          deepseek_processed?: boolean | null
          description?: string | null
          id?: string
          image_id?: number | null
          processed_at?: string | null
          pub_date?: string | null
          source?: string
          title?: string
          url?: string
          zh_title?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "articles_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["category_id"]
          },
          {
            foreignKeyName: "articles_image_id_fkey"
            columns: ["image_id"]
            isOneToOne: false
            referencedRelation: "article_images"
            referencedColumns: ["image_id"]
          },
        ]
      }
      background_read: {
        Row: {
          article_id: string
          background_read_id: number
          background_text: string
          created_at: string | null
          difficulty_id: number
        }
        Insert: {
          article_id: string
          background_read_id?: number
          background_text: string
          created_at?: string | null
          difficulty_id: number
        }
        Update: {
          article_id?: string
          background_read_id?: number
          background_text?: string
          created_at?: string | null
          difficulty_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "background_read_article_id_fkey"
            columns: ["article_id"]
            isOneToOne: false
            referencedRelation: "articles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "background_read_difficulty_id_fkey"
            columns: ["difficulty_id"]
            isOneToOne: false
            referencedRelation: "difficulty_levels"
            referencedColumns: ["difficulty_id"]
          },
        ]
      }
      categories: {
        Row: {
          category_id: number
          category_name: string
          created_at: string | null
          description: string | null
          prompt_name: string | null
        }
        Insert: {
          category_id?: number
          category_name: string
          created_at?: string | null
          description?: string | null
          prompt_name?: string | null
        }
        Update: {
          category_id?: number
          category_name?: string
          created_at?: string | null
          description?: string | null
          prompt_name?: string | null
        }
        Relationships: []
      }
      choices: {
        Row: {
          choice_id: number
          choice_text: string
          created_at: string | null
          explanation: string | null
          is_correct: boolean | null
          question_id: number
        }
        Insert: {
          choice_id?: number
          choice_text: string
          created_at?: string | null
          explanation?: string | null
          is_correct?: boolean | null
          question_id: number
        }
        Update: {
          choice_id?: number
          choice_text?: string
          created_at?: string | null
          explanation?: string | null
          is_correct?: boolean | null
          question_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "choices_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "questions"
            referencedColumns: ["question_id"]
          },
        ]
      }
      client_devices: {
        Row: {
          created_at: number
          device_id: string
          disabled: number
          display_name: string | null
          encrypted_api_key: string
          key_id: string
          last_seen_at: number
          username: string
        }
        Insert: {
          created_at: number
          device_id: string
          disabled?: number
          display_name?: string | null
          encrypted_api_key: string
          key_id: string
          last_seen_at: number
          username: string
        }
        Update: {
          created_at?: number
          device_id?: string
          disabled?: number
          display_name?: string | null
          encrypted_api_key?: string
          key_id?: string
          last_seen_at?: number
          username?: string
        }
        Relationships: [
          {
            foreignKeyName: "client_devices_key_id_fkey"
            columns: ["key_id"]
            isOneToOne: true
            referencedRelation: "api_keys"
            referencedColumns: ["key_id"]
          },
        ]
      }
      comments: {
        Row: {
          article_id: string
          attitude: string | null
          com_content: string
          comment_date: string | null
          comment_id: number
          created_at: string | null
          difficulty_id: number
          who_comment: string | null
        }
        Insert: {
          article_id: string
          attitude?: string | null
          com_content: string
          comment_date?: string | null
          comment_id?: number
          created_at?: string | null
          difficulty_id: number
          who_comment?: string | null
        }
        Update: {
          article_id?: string
          attitude?: string | null
          com_content?: string
          comment_date?: string | null
          comment_id?: number
          created_at?: string | null
          difficulty_id?: number
          who_comment?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "comments_article_id_fkey"
            columns: ["article_id"]
            isOneToOne: false
            referencedRelation: "articles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comments_difficulty_id_fkey"
            columns: ["difficulty_id"]
            isOneToOne: false
            referencedRelation: "difficulty_levels"
            referencedColumns: ["difficulty_id"]
          },
        ]
      }
      cron_jobs: {
        Row: {
          created_at: string | null
          description: string | null
          enabled: boolean | null
          id: number
          job_name: string
          job_type: string
          last_run_at: string | null
          last_status: string | null
          schedule: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          enabled?: boolean | null
          id?: number
          job_name: string
          job_type: string
          last_run_at?: string | null
          last_status?: string | null
          schedule?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          enabled?: boolean | null
          id?: number
          job_name?: string
          job_type?: string
          last_run_at?: string | null
          last_status?: string | null
          schedule?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      demo_users: {
        Row: {
          id: number
          joined_at: string
          location: string
          name: string
          role: string
        }
        Insert: {
          id?: number
          joined_at?: string
          location: string
          name: string
          role: string
        }
        Update: {
          id?: number
          joined_at?: string
          location?: string
          name?: string
          role?: string
        }
        Relationships: []
      }
      difficulty_levels: {
        Row: {
          difficulty: string
          difficulty_id: number
          grade: string | null
          meaning: string | null
        }
        Insert: {
          difficulty: string
          difficulty_id?: number
          grade?: string | null
          meaning?: string | null
        }
        Update: {
          difficulty?: string
          difficulty_id?: number
          grade?: string | null
          meaning?: string | null
        }
        Relationships: []
      }
      feedback: {
        Row: {
          created_at: string
          email: string
          id: string
          message: string
          name: string
          post_slug: string | null
          reviewed: boolean
        }
        Insert: {
          created_at?: string
          email?: string
          id?: string
          message: string
          name?: string
          post_slug?: string | null
          reviewed?: boolean
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          message?: string
          name?: string
          post_slug?: string | null
          reviewed?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "feedback_post_slug_fkey"
            columns: ["post_slug"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["slug"]
          },
        ]
      }
      feeds: {
        Row: {
          category_id: number
          created_at: string | null
          enable: boolean | null
          feed_id: number
          feed_name: string
          feed_url: string
        }
        Insert: {
          category_id: number
          created_at?: string | null
          enable?: boolean | null
          feed_id?: number
          feed_name: string
          feed_url: string
        }
        Update: {
          category_id?: number
          created_at?: string | null
          enable?: boolean | null
          feed_id?: number
          feed_name?: string
          feed_url?: string
        }
        Relationships: [
          {
            foreignKeyName: "feeds_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["category_id"]
          },
        ]
      }
      keywords: {
        Row: {
          article_id: string
          difficulty_id: number | null
          explanation: string | null
          word: string
          word_id: number
        }
        Insert: {
          article_id: string
          difficulty_id?: number | null
          explanation?: string | null
          word: string
          word_id?: number
        }
        Update: {
          article_id?: string
          difficulty_id?: number | null
          explanation?: string | null
          word?: string
          word_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "keywords_article_id_fkey"
            columns: ["article_id"]
            isOneToOne: false
            referencedRelation: "articles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "keywords_difficulty_id_fkey"
            columns: ["difficulty_id"]
            isOneToOne: false
            referencedRelation: "difficulty_levels"
            referencedColumns: ["difficulty_id"]
          },
        ]
      }
      magic_links: {
        Row: {
          created_at: string | null
          email: string
          expires_at: string
          reading_style: string | null
          token: string
        }
        Insert: {
          created_at?: string | null
          email: string
          expires_at: string
          reading_style?: string | null
          token: string
        }
        Update: {
          created_at?: string | null
          email?: string
          expires_at?: string
          reading_style?: string | null
          token?: string
        }
        Relationships: []
      }
      posts: {
        Row: {
          content: string
          content_cn: string
          created_at: string
          date: string
          description: string
          description_cn: string
          id: string
          published: boolean
          reading_time: string
          slug: string
          tags: string[]
          title: string
          title_cn: string
          updated_at: string
        }
        Insert: {
          content?: string
          content_cn?: string
          created_at?: string
          date?: string
          description?: string
          description_cn?: string
          id?: string
          published?: boolean
          reading_time?: string
          slug: string
          tags?: string[]
          title: string
          title_cn?: string
          updated_at?: string
        }
        Update: {
          content?: string
          content_cn?: string
          created_at?: string
          date?: string
          description?: string
          description_cn?: string
          id?: string
          published?: boolean
          reading_time?: string
          slug?: string
          tags?: string[]
          title?: string
          title_cn?: string
          updated_at?: string
        }
        Relationships: []
      }
      projects: {
        Row: {
          archived: boolean
          created_at: string
          description: string
          featured: boolean
          forks: number
          full_name: string | null
          github_id: number | null
          github_url: string | null
          id: string
          language: string | null
          name: string
          stars: number
          synced_at: string | null
          tags: string[]
          updated_at: string
          url: string | null
        }
        Insert: {
          archived?: boolean
          created_at?: string
          description?: string
          featured?: boolean
          forks?: number
          full_name?: string | null
          github_id?: number | null
          github_url?: string | null
          id?: string
          language?: string | null
          name: string
          stars?: number
          synced_at?: string | null
          tags?: string[]
          updated_at?: string
          url?: string | null
        }
        Update: {
          archived?: boolean
          created_at?: string
          description?: string
          featured?: boolean
          forks?: number
          full_name?: string | null
          github_id?: number | null
          github_url?: string | null
          id?: string
          language?: string | null
          name?: string
          stars?: number
          synced_at?: string | null
          tags?: string[]
          updated_at?: string
          url?: string | null
        }
        Relationships: []
      }
      questions: {
        Row: {
          article_id: string
          created_at: string | null
          difficulty_id: number | null
          question_id: number
          question_text: string
        }
        Insert: {
          article_id: string
          created_at?: string | null
          difficulty_id?: number | null
          question_id?: number
          question_text: string
        }
        Update: {
          article_id?: string
          created_at?: string | null
          difficulty_id?: number | null
          question_id?: number
          question_text?: string
        }
        Relationships: [
          {
            foreignKeyName: "questions_article_id_fkey"
            columns: ["article_id"]
            isOneToOne: false
            referencedRelation: "articles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "questions_difficulty_id_fkey"
            columns: ["difficulty_id"]
            isOneToOne: false
            referencedRelation: "difficulty_levels"
            referencedColumns: ["difficulty_id"]
          },
        ]
      }
      response: {
        Row: {
          article_id: string
          payload_directory: string | null
          payload_generated: number | null
          payload_generated_at: string | null
          respons_file: string | null
          response_id: number
        }
        Insert: {
          article_id: string
          payload_directory?: string | null
          payload_generated?: number | null
          payload_generated_at?: string | null
          respons_file?: string | null
          response_id?: number
        }
        Update: {
          article_id?: string
          payload_directory?: string | null
          payload_generated?: number | null
          payload_generated_at?: string | null
          respons_file?: string | null
          response_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "response_article_id_fkey"
            columns: ["article_id"]
            isOneToOne: false
            referencedRelation: "articles"
            referencedColumns: ["id"]
          },
        ]
      }
      secrets: {
        Row: {
          created_at: string | null
          id: number
          name: string
          secret: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          name: string
          secret: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: number
          name?: string
          secret?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      user_awards: {
        Row: {
          articles_read_count: number | null
          award_id: number
          comments_count: number | null
          questions_answered_correct_count: number | null
          questions_answered_count: number | null
          updated_at: string | null
          user_id: number
        }
        Insert: {
          articles_read_count?: number | null
          award_id?: number
          comments_count?: number | null
          questions_answered_correct_count?: number | null
          questions_answered_count?: number | null
          updated_at?: string | null
          user_id: number
        }
        Update: {
          articles_read_count?: number | null
          award_id?: number
          comments_count?: number | null
          questions_answered_correct_count?: number | null
          questions_answered_count?: number | null
          updated_at?: string | null
          user_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "user_awards_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      user_categories: {
        Row: {
          category_id: number
          id: number
          user_id: number
        }
        Insert: {
          category_id: number
          id?: number
          user_id: number
        }
        Update: {
          category_id?: number
          id?: number
          user_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "user_categories_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["category_id"]
          },
          {
            foreignKeyName: "user_categories_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      user_difficulty_levels: {
        Row: {
          difficulty_id: number
          id: number
          user_id: number
        }
        Insert: {
          difficulty_id: number
          id?: number
          user_id: number
        }
        Update: {
          difficulty_id?: number
          id?: number
          user_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "user_difficulty_levels_difficulty_id_fkey"
            columns: ["difficulty_id"]
            isOneToOne: false
            referencedRelation: "difficulty_levels"
            referencedColumns: ["difficulty_id"]
          },
          {
            foreignKeyName: "user_difficulty_levels_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      user_preferences: {
        Row: {
          email_enabled: boolean | null
          email_frequency: string | null
          id: number
          subscription_status: string | null
          updated_at: string | null
          user_id: number
        }
        Insert: {
          email_enabled?: boolean | null
          email_frequency?: string | null
          id?: number
          subscription_status?: string | null
          updated_at?: string | null
          user_id: number
        }
        Update: {
          email_enabled?: boolean | null
          email_frequency?: string | null
          id?: number
          subscription_status?: string | null
          updated_at?: string | null
          user_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "user_preferences_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      user_profiles: {
        Row: {
          created_at: string | null
          display_name: string | null
          email: string | null
          id: string
          preferences: Json | null
          role: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          display_name?: string | null
          email?: string | null
          id: string
          preferences?: Json | null
          role?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          display_name?: string | null
          email?: string | null
          id?: string
          preferences?: Json | null
          role?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      user_progress: {
        Row: {
          correct_count: number | null
          created_at: string | null
          id: string
          last_practiced_at: string | null
          mistake_count: number | null
          updated_at: string | null
          user_id: string | null
          word_id: string | null
        }
        Insert: {
          correct_count?: number | null
          created_at?: string | null
          id?: string
          last_practiced_at?: string | null
          mistake_count?: number | null
          updated_at?: string | null
          user_id?: string | null
          word_id?: string | null
        }
        Update: {
          correct_count?: number | null
          created_at?: string | null
          id?: string
          last_practiced_at?: string | null
          mistake_count?: number | null
          updated_at?: string | null
          user_id?: string | null
          word_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_progress_word_id_fkey"
            columns: ["word_id"]
            isOneToOne: false
            referencedRelation: "words"
            referencedColumns: ["id"]
          },
        ]
      }
      user_stats: {
        Row: {
          created_at: string | null
          id: string
          stats: Json | null
          synced_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          stats?: Json | null
          synced_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          stats?: Json | null
          synced_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_stats_sync: {
        Row: {
          last_sync: number
          stats_json: string
          user_id: string
        }
        Insert: {
          last_sync: number
          stats_json: string
          user_id: string
        }
        Update: {
          last_sync?: number
          stats_json?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_stats_sync_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "user_subscriptions"
            referencedColumns: ["user_id"]
          },
        ]
      }
      user_subscriptions: {
        Row: {
          bootstrap_failed: number | null
          bootstrap_token: string | null
          created_at: number
          device_id: string | null
          email: string
          name: string
          reading_style: string | null
          subscription_status: string | null
          updated_at: number
          user_id: string
          verified: number | null
        }
        Insert: {
          bootstrap_failed?: number | null
          bootstrap_token?: string | null
          created_at: number
          device_id?: string | null
          email: string
          name: string
          reading_style?: string | null
          subscription_status?: string | null
          updated_at: number
          user_id: string
          verified?: number | null
        }
        Update: {
          bootstrap_failed?: number | null
          bootstrap_token?: string | null
          created_at?: number
          device_id?: string | null
          email?: string
          name?: string
          reading_style?: string | null
          subscription_status?: string | null
          updated_at?: number
          user_id?: string
          verified?: number | null
        }
        Relationships: []
      }
      users: {
        Row: {
          created_at: string | null
          email: string
          first_name: string | null
          last_name: string | null
          password: string
          registered: boolean | null
          registered_date: string | null
          token: string
          updated_at: string | null
          user_id: number
          username: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          first_name?: string | null
          last_name?: string | null
          password: string
          registered?: boolean | null
          registered_date?: string | null
          token: string
          updated_at?: string | null
          user_id?: number
          username?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          first_name?: string | null
          last_name?: string | null
          password?: string
          registered?: boolean | null
          registered_date?: string | null
          token?: string
          updated_at?: string | null
          user_id?: number
          username?: string | null
        }
        Relationships: []
      }
      word_ai_content: {
        Row: {
          created_at: string | null
          explanation: string | null
          id: string
          image_url: string | null
          mnemonic: string | null
          sentence_html: string | null
          updated_at: string | null
          word_id: string | null
        }
        Insert: {
          created_at?: string | null
          explanation?: string | null
          id?: string
          image_url?: string | null
          mnemonic?: string | null
          sentence_html?: string | null
          updated_at?: string | null
          word_id?: string | null
        }
        Update: {
          created_at?: string | null
          explanation?: string | null
          id?: string
          image_url?: string | null
          mnemonic?: string | null
          sentence_html?: string | null
          updated_at?: string | null
          word_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "word_ai_content_word_id_fkey"
            columns: ["word_id"]
            isOneToOne: true
            referencedRelation: "words"
            referencedColumns: ["id"]
          },
        ]
      }
      word_list_items: {
        Row: {
          created_at: string | null
          id: string
          list_id: string | null
          position: number | null
          word_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          list_id?: string | null
          position?: number | null
          word_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          list_id?: string | null
          position?: number | null
          word_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "word_list_items_list_id_fkey"
            columns: ["list_id"]
            isOneToOne: false
            referencedRelation: "word_lists"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "word_list_items_word_id_fkey"
            columns: ["word_id"]
            isOneToOne: false
            referencedRelation: "words"
            referencedColumns: ["id"]
          },
        ]
      }
      word_lists: {
        Row: {
          created_at: string | null
          description: string | null
          grade_level: string | null
          id: string
          name: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          grade_level?: string | null
          id?: string
          name: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          grade_level?: string | null
          id?: string
          name?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      words: {
        Row: {
          created_at: string | null
          definition: string | null
          id: string
          sentence: string | null
          updated_at: string | null
          word: string
        }
        Insert: {
          created_at?: string | null
          definition?: string | null
          id?: string
          sentence?: string | null
          updated_at?: string | null
          word: string
        }
        Update: {
          created_at?: string | null
          definition?: string | null
          id?: string
          sentence?: string | null
          updated_at?: string | null
          word?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      cleanup_expired_magic_links: { Args: never; Returns: number }
      get_secret: { Args: { secret_name: string }; Returns: string }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const

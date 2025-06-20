import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export const createClient = () => createClientComponentClient();

export type Database = {
  public: {
    Tables: {
      blog_posts: {
        Row: {
          id: string;
          title: string;
          slug: string;
          content: string;
          excerpt: string | null;
          featured_image_url: string | null;
          published: boolean;
          created_at: string;
          updated_at: string;
          author_id: string;
          tags: string[] | null;
          meta_description: string | null;
        };
        Insert: {
          id?: string;
          title: string;
          slug: string;
          content: string;
          excerpt?: string | null;
          featured_image_url?: string | null;
          published?: boolean;
          created_at?: string;
          updated_at?: string;
          author_id: string;
          tags?: string[] | null;
          meta_description?: string | null;
        };
        Update: {
          id?: string;
          title?: string;
          slug?: string;
          content?: string;
          excerpt?: string | null;
          featured_image_url?: string | null;
          published?: boolean;
          created_at?: string;
          updated_at?: string;
          author_id?: string;
          tags?: string[] | null;
          meta_description?: string | null;
        };
      };
    };
  };
};

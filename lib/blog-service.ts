import { createClient } from "./supabase";
import { Database } from "./supabase";

type BlogPost = Database["public"]["Tables"]["blog_posts"]["Row"];
type BlogPostInsert = Database["public"]["Tables"]["blog_posts"]["Insert"];
type BlogPostUpdate = Database["public"]["Tables"]["blog_posts"]["Update"];

export class BlogService {
  private supabase = createClient();

  // CREATE - Add a new blog post
  async createPost(
    post: Omit<BlogPostInsert, "author_id">
  ): Promise<BlogPost | null> {
    const {
      data: { user },
    } = await this.supabase.auth.getUser();

    if (!user) throw new Error("User not authenticated");

    const { data, error } = await this.supabase
      .from("blog_posts")
      .insert({
        ...post,
        author_id: user.id,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // READ - Get all published blog posts
  async getPublishedPosts(limit?: number): Promise<BlogPost[]> {
    let query = this.supabase
      .from("blog_posts")
      .select("*")
      .eq("published", true)
      .order("created_at", { ascending: false });

    if (limit) {
      query = query.limit(limit);
    }

    const { data, error } = await query;

    if (error) throw error;
    return data || [];
  }

  // READ - Get a single blog post by slug
  async getPostBySlug(slug: string): Promise<BlogPost | null> {
    const { data, error } = await this.supabase
      .from("blog_posts")
      .select("*")
      .eq("slug", slug)
      .single();

    if (error) {
      if (error.code === "PGRST116") return null; // Not found
      throw error;
    }
    return data;
  }

  // READ - Get a single blog post by ID
  async getPost(id: string): Promise<BlogPost | null> {
    const { data, error } = await this.supabase
      .from("blog_posts")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      if (error.code === "PGRST116") return null; // Not found
      throw error;
    }
    return data;
  }

  // READ - Get user's own posts (including drafts)
  async getUserPosts(): Promise<BlogPost[]> {
    const {
      data: { user },
    } = await this.supabase.auth.getUser();

    if (!user) throw new Error("User not authenticated");

    const { data, error } = await this.supabase
      .from("blog_posts")
      .select("*")
      .eq("author_id", user.id)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data || [];
  }

  // UPDATE - Modify an existing blog post
  async updatePost(
    id: string,
    updates: BlogPostUpdate
  ): Promise<BlogPost | null> {
    const { data, error } = await this.supabase
      .from("blog_posts")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // DELETE - Remove a blog post
  async deletePost(id: string): Promise<void> {
    const { error } = await this.supabase
      .from("blog_posts")
      .delete()
      .eq("id", id);

    if (error) throw error;
  }

  // Upload image to Supabase Storage
  async uploadImage(file: File, userId: string): Promise<string> {
    const fileExt = file.name.split(".").pop();
    const fileName = `${userId}/${Date.now()}.${fileExt}`;

    const { data, error } = await this.supabase.storage
      .from("blog-images")
      .upload(fileName, file);

    if (error) throw error;

    const {
      data: { publicUrl },
    } = this.supabase.storage.from("blog-images").getPublicUrl(fileName);

    return publicUrl;
  }

  // Search posts by title or content
  async searchPosts(query: string): Promise<BlogPost[]> {
    const { data, error } = await this.supabase
      .from("blog_posts")
      .select("*")
      .eq("published", true)
      .or(`title.ilike.%${query}%,content.ilike.%${query}%`)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data || [];
  }

  // Get posts by specific tag
  async getPostsByTag(tag: string): Promise<BlogPost[]> {
    const { data, error } = await this.supabase
      .from("blog_posts")
      .select("*")
      .eq("published", true)
      .contains("tags", [tag])
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data || [];
  }

  // Toggle publish status
  async togglePublishStatus(id: string): Promise<BlogPost | null> {
    // First get current status
    const { data: currentPost } = await this.supabase
      .from("blog_posts")
      .select("published")
      .eq("id", id)
      .single();

    if (!currentPost) throw new Error("Post not found");

    // Toggle the status
    return this.updatePost(id, { published: !currentPost.published });
  }
}

// Export singleton instance
export const blogService = new BlogService();

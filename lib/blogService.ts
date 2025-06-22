import { supabase } from "./supabase";
import { imageService } from "./imageService";
import { BlogPost, BlogPostFormData, PaginatedResponse } from "./types";

export class BlogService {
  // CREATE - Add a new blog post
  static async createPost(
    postData: BlogPostFormData,
    imageFiles: File[] = []
  ): Promise<BlogPost> {
    try {
      let imagePaths: string[] = [];

      // Upload images if provided
      if (imageFiles.length > 0) {
        imagePaths = await imageService.uploadImages(imageFiles, "posts");
      }

      const postToInsert = {
        ...postData,
        tags:
          typeof postData.tags === "string"
            ? postData.tags
                .split(",")
                .map((tag) => tag.trim())
                .filter(Boolean)
            : postData.tags,
        images: imagePaths,
        cover_image: imagePaths[0] || null,
      };

      const { data, error } = await supabase
        .from("blog_posts")
        .insert([postToInsert])
        .select()
        .single();

      if (error) {
        // Clean up uploaded images if post creation fails
        if (imagePaths.length > 0) {
          await imageService.deleteImages(imagePaths);
        }
        throw error;
      }
      return data as BlogPost;
    } catch (error) {
      console.error("Error creating post:", error);
      throw error;
    }
  }

  // READ - Get all published posts with pagination
  static async getAllPosts(
    page: number = 1,
    limit: number = 10
  ): Promise<PaginatedResponse<BlogPost>> {
    try {
      const from = (page - 1) * limit;
      const to = from + limit - 1;

      const { data, error, count } = await supabase
        .from("blog_posts")
        .select("*", { count: "exact" })
        .eq("status", "published")
        .order("created_at", { ascending: false })
        .range(from, to);

      if (error) throw error;
      return { posts: data as BlogPost[], totalCount: count || 0 };
    } catch (error) {
      console.error("Error fetching posts:", error);
      throw error;
    }
  }

  // READ - Get all posts for admin
  static async getAllPostsAdmin(
    page: number = 1,
    limit: number = 10
  ): Promise<PaginatedResponse<BlogPost>> {
    try {
      const from = (page - 1) * limit;
      const to = from + limit - 1;

      const { data, error, count } = await supabase
        .from("blog_posts")
        .select("*", { count: "exact" })
        .order("created_at", { ascending: false })
        .range(from, to);

      if (error) throw error;
      return { posts: data as BlogPost[], totalCount: count || 0 };
    } catch (error) {
      console.error("Error fetching admin posts:", error);
      throw error;
    }
  }

  // READ - Get a single post by slug
  static async getPostBySlug(slug: string): Promise<BlogPost> {
    try {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("slug", slug)
        .single();

      if (error) throw error;
      return data as BlogPost;
    } catch (error) {
      console.error("Error fetching post by slug:", error);
      throw error;
    }
  }

  // READ - Get a single post by ID
  static async getPostById(id: string): Promise<BlogPost> {
    try {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      return data as BlogPost;
    } catch (error) {
      console.error("Error fetching post by ID:", error);
      throw error;
    }
  }

  // UPDATE - Update a blog post
  static async updatePost(
    id: string,
    updates: Partial<BlogPostFormData>,
    newImageFiles: File[] = [],
    imagesToDelete: string[] = []
  ): Promise<BlogPost> {
    try {
      // Delete old images if specified
      if (imagesToDelete.length > 0) {
        await imageService.deleteImages(imagesToDelete);
      }

      // Upload new images
      let newImagePaths: string[] = [];
      if (newImageFiles.length > 0) {
        newImagePaths = await imageService.uploadImages(newImageFiles, "posts");
      }

      // Get current post to merge images
      const currentPost = await this.getPostById(id);
      const existingImages = currentPost.images || [];
      const filteredExistingImages = existingImages.filter(
        (img) => !imagesToDelete.includes(img)
      );

      const allImages = [...filteredExistingImages, ...newImagePaths];

      const postUpdates = {
        ...updates,
        tags:
          typeof updates.tags === "string"
            ? updates.tags
                .split(",")
                .map((tag) => tag.trim())
                .filter(Boolean)
            : updates.tags,
        images: allImages,
        cover_image: allImages[0] || null,
      };

      const { data, error } = await supabase
        .from("blog_posts")
        .update(postUpdates)
        .eq("id", id)
        .select()
        .single();

      if (error) {
        // Clean up newly uploaded images if update fails
        if (newImagePaths.length > 0) {
          await imageService.deleteImages(newImagePaths);
        }
        throw error;
      }
      return data as BlogPost;
    } catch (error) {
      console.error("Error updating post:", error);
      throw error;
    }
  }

  // DELETE - Delete a blog post
  static async deletePost(id: string): Promise<void> {
    try {
      // Get post to delete associated images
      const post = await this.getPostById(id);

      const { error } = await supabase.from("blog_posts").delete().eq("id", id);

      if (error) throw error;

      // Delete associated images
      if (post.images && post.images.length > 0) {
        await imageService.deleteImages(post.images);
      }
    } catch (error) {
      console.error("Error deleting post:", error);
      throw error;
    }
  }

  // SEARCH - Search posts by title or content
  static async searchPosts(
    query: string,
    page: number = 1,
    limit: number = 10
  ): Promise<PaginatedResponse<BlogPost>> {
    try {
      const from = (page - 1) * limit;
      const to = from + limit - 1;

      const { data, error, count } = await supabase
        .from("blog_posts")
        .select("*", { count: "exact" })
        .eq("status", "published")
        .or(
          `title.ilike.%${query}%,content.ilike.%${query}%,excerpt.ilike.%${query}%`
        )
        .order("created_at", { ascending: false })
        .range(from, to);

      if (error) throw error;
      return { posts: data as BlogPost[], totalCount: count || 0 };
    } catch (error) {
      console.error("Error searching posts:", error);
      throw error;
    }
  }

  // Get posts by tag
  static async getPostsByTag(
    tag: string,
    page: number = 1,
    limit: number = 10
  ): Promise<PaginatedResponse<BlogPost>> {
    try {
      const from = (page - 1) * limit;
      const to = from + limit - 1;

      const { data, error, count } = await supabase
        .from("blog_posts")
        .select("*", { count: "exact" })
        .eq("status", "published")
        .contains("tags", [tag])
        .order("created_at", { ascending: false })
        .range(from, to);

      if (error) throw error;
      return { posts: data as BlogPost[], totalCount: count || 0 };
    } catch (error) {
      console.error("Error fetching posts by tag:", error);
      throw error;
    }
  }

  // Get featured posts
  static async getFeaturedPosts(limit: number = 5): Promise<BlogPost[]> {
    try {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("status", "published")
        .eq("featured", true)
        .order("created_at", { ascending: false })
        .limit(limit);

      if (error) throw error;
      return data as BlogPost[];
    } catch (error) {
      console.error("Error fetching featured posts:", error);
      throw error;
    }
  }

  // Increment view count
  static async incrementViewCount(id: string): Promise<void> {
    try {
      const { error } = await supabase.rpc("increment_view_count", {
        post_id: id,
      });

      if (error) throw error;
    } catch (error) {
      console.error("Error incrementing view count:", error);
    }
  }
}

export const blogService = BlogService;

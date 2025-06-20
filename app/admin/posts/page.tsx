"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useState, useEffect } from "react";
import { blogService } from "@/lib/blog-service";
import { formatDate } from "@/lib/utils";
import Link from "next/link";

export default function AdminPostsPage() {
  const { user, loading } = useAuth();
  const [posts, setPosts] = useState<any[]>([]);
  const [loadingPosts, setLoadingPosts] = useState(false);

  useEffect(() => {
    if (user) {
      loadUserPosts();
    }
  }, [user]);

  const loadUserPosts = async () => {
    setLoadingPosts(true);
    try {
      const userPosts = await blogService.getUserPosts();
      setPosts(userPosts);
    } catch (error) {
      console.error("Error loading posts:", error);
    } finally {
      setLoadingPosts(false);
    }
  };

  const handleDeletePost = async (postId: string) => {
    if (confirm("Are you sure you want to delete this post?")) {
      try {
        await blogService.deletePost(postId);
        loadUserPosts();
      } catch (error) {
        console.error("Error deleting post:", error);
      }
    }
  };

  const handleTogglePublish = async (postId: string) => {
    try {
      await blogService.togglePublishStatus(postId);
      loadUserPosts();
    } catch (error) {
      console.error("Error toggling publish status:", error);
    }
  };

  if (loading) {
    return <div style={{ padding: "2rem" }}>Loading...</div>;
  }

  if (!user) {
    return <div style={{ padding: "2rem" }}>Please log in to access admin area.</div>;
  }

  return (
    <div style={{ padding: "2rem", maxWidth: "1200px", margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
        <h1>Manage Posts</h1>
        <Link 
          href="/admin/posts/new"
          style={{
            background: "#3b82f6",
            color: "white",
            padding: "0.5rem 1rem",
            borderRadius: "4px",
            textDecoration: "none"
          }}
        >
          New Post
        </Link>
      </div>

      {loadingPosts ? (
        <div>Loading posts...</div>
      ) : posts.length === 0 ? (
        <div style={{ textAlign: "center", padding: "3rem" }}>
          <p>No posts found.</p>
          <Link href="/admin/posts/new">Create your first post</Link>
        </div>
      ) : (
        <div style={{ display: "grid", gap: "1rem" }}>
          {posts.map((post) => (
            <div 
              key={post.id} 
              style={{
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                padding: "1.5rem",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start"
              }}
            >
              <div style={{ flex: 1 }}>
                <h3 style={{ margin: "0 0 0.5rem 0" }}>{post.title}</h3>
                <p style={{ margin: "0 0 1rem 0", color: "#6b7280" }}>{post.excerpt}</p>
                <div style={{ display: "flex", gap: "1rem", fontSize: "0.875rem", color: "#6b7280" }}>
                  <span>Created: {formatDate(post.created_at)}</span>
                  <span style={{
                    background: post.published ? "#10b981" : "#f59e0b",
                    color: "white",
                    padding: "0.25rem 0.5rem",
                    borderRadius: "4px",
                    fontSize: "0.75rem"
                  }}>
                    {post.published ? "Published" : "Draft"}
                  </span>
                </div>
                {post.tags && post.tags.length > 0 && (
                  <div style={{ marginTop: "0.5rem", display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                    {post.tags.map((tag: string, index: number) => (
                      <span 
                        key={index}
                        style={{
                          background: "#e5e7eb",
                          padding: "0.25rem 0.5rem",
                          borderRadius: "4px",
                          fontSize: "0.75rem"
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              
              <div style={{ display: "flex", gap: "0.5rem", marginLeft: "1rem" }}>
                <Link
                  href={`/admin/posts/${post.id}/edit`}
                  style={{
                    background: "#6b7280",
                    color: "white",
                    padding: "0.5rem 1rem",
                    borderRadius: "4px",
                    textDecoration: "none",
                    fontSize: "0.875rem",
                  }}
                >
                  Edit
               </Link>
                <button
                  onClick={() => handleTogglePublish(post.id)}
                  style={{
                    background: post.published ? "#ef4444" : "#10b981",
                    color: "white",
                    border: "none",
                    padding: "0.5rem 1rem",
                    borderRadius: "4px",
                    cursor: "pointer",
                    fontSize: "0.875rem",
                  }}
                >
                  {post.published ? "Unpublish" : "Publish"}
                </button>
                <button
                  onClick={() => handleDeletePost(post.id)}
                  style={{
                    background: "#ef4444",
                    color: "white",
                    border: "none",
                    padding: "0.5rem 1rem",
                    borderRadius: "4px",
                    cursor: "pointer",
                    fontSize: "0.875rem",
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { blogService } from "@/lib/blog-service";
import PostForm from "../../../PostForm";

interface EditPostPageProps {
  params: { id: string };
}

const EditPostPage: React.FC<EditPostPageProps> = ({ params }) => {
  const router = useRouter();
  const [post, setPost] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPost();
  }, [params.id]);

  const fetchPost = async () => {
    try {
      setError(null);
      const postData = await blogService.getPost(params.id);
      setPost(postData);
    } catch (error: any) {
      console.error("Error fetching post:", error);
      setError(error.message || "Failed to load post");
    } finally {
      setLoading(false);
    }
  };

  const handleSuccess = () => {
    router.push("/admin/posts");
  };

  if (loading) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <div>Loading post...</div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <h3>Error</h3>
        <p>{error || "Post not found"}</p>
        <div
          style={{
            marginTop: "1rem",
            display: "flex",
            gap: "1rem",
            justifyContent: "center",
          }}
        >
          <button
            onClick={() => router.push("/admin/posts")}
            style={{
              padding: "0.5rem 1rem",
              background: "#6b7280",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Back to Posts
          </button>
          <button
            onClick={fetchPost}
            style={{
              padding: "0.5rem 1rem",
              background: "#3b82f6",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: "2rem", maxWidth: "1200px", margin: "0 auto" }}>
      <PostForm initialData={post} isEditing={true} onSuccess={handleSuccess} />
    </div>
  );
};

export default EditPostPage;

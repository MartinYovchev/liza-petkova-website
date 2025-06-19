"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AdminLayout from "../../../layout";
import PostForm from "../../../PostForm";
import { Post, PostFormData } from "../../../types";

interface EditPostPageProps {
  params: { id: string };
}

const EditPostPage: React.FC<EditPostPageProps> = ({ params }) => {
  const router = useRouter();
  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPost();
  }, [params.id]);

  const fetchPost = async () => {
    try {
      setError(null);
      const response = await fetch(`/api/posts/${params.id}`);
      if (response.ok) {
        const data = await response.json();
        setPost(data.post);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || "Post not found");
      }
    } catch (error) {
      console.error("Error fetching post:", error);
      setError(error instanceof Error ? error.message : "Failed to load post");
    } finally {
      setIsFetching(false);
    }
  };

  const handleSubmit = async (data: PostFormData) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/posts/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        router.push("/admin/posts");
        router.refresh(); // Refresh to show updated data
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update post");
      }
    } catch (error) {
      console.error("Error updating post:", error);
      alert(
        `Failed to update post: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) {
    return (
      <AdminLayout title="Edit Post">
        <div style={{ textAlign: "center", padding: "2rem" }}>
          <div
            style={{
              width: "40px",
              height: "40px",
              border: "3px solid #e5e7eb",
              borderTop: "3px solid #3b82f6",
              borderRadius: "50%",
              margin: "0 auto 1rem",
              animation: "spin 1s linear infinite",
            }}
          ></div>
          Loading post...
        </div>
      </AdminLayout>
    );
  }

  if (error || !post) {
    return (
      <AdminLayout title="Edit Post">
        <div style={{ textAlign: "center", padding: "2rem" }}>
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
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title={`Edit: ${post.title}`}>
      <PostForm post={post} onSubmit={handleSubmit} isLoading={isLoading} />
    </AdminLayout>
  );
};

export default EditPostPage;

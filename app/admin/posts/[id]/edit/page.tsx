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

  useEffect(() => {
    fetchPost();
  }, [params.id]);

  const fetchPost = async () => {
    try {
      const response = await fetch(`/api/posts/${params.id}`);
      if (response.ok) {
        const data = await response.json();
        setPost(data.post);
      } else {
        throw new Error("Post not found");
      }
    } catch (error) {
      console.error("Error fetching post:", error);
      alert("Post not found");
      router.push("/admin/posts");
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
      } else {
        throw new Error("Failed to update post");
      }
    } catch (error) {
      console.error("Error updating post:", error);
      alert("Failed to update post");
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) {
    return (
      <AdminLayout title="Edit Post">
        <div style={{ textAlign: "center", padding: "2rem" }}>
          Loading post...
        </div>
      </AdminLayout>
    );
  }

  if (!post) {
    return (
      <AdminLayout title="Edit Post">
        <div style={{ textAlign: "center", padding: "2rem" }}>
          Post not found
        </div>
      </AdminLayout>
    );
  }

  return <PostForm post={post} onSubmit={handleSubmit} isLoading={isLoading} />;
};

export default EditPostPage;

// app/admin/posts/new/page.tsx
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import AdminLayout from "../../layout";
import PostForm from "../../PostForm";
import { PostFormData } from "../../types";

const NewPostPage: React.FC = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (data: PostFormData) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        router.push("/admin/posts");
      } else {
        throw new Error("Failed to create post");
      }
    } catch (error) {
      console.error("Error creating post:", error);
      alert("Failed to create post");
    } finally {
      setIsLoading(false);
    }
  };

  return <PostForm onSubmit={handleSubmit} isLoading={isLoading} />;
};

export default NewPostPage;

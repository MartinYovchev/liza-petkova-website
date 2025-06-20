// app/admin/posts/new/page.tsx
"use client";

import React from "react";
import { useRouter } from "next/navigation";
import PostForm from "../../PostForm";

const NewPostPage: React.FC = () => {
  const router = useRouter();

  const handleSuccess = () => {
    router.push("/blog");
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "1200px", margin: "0 auto" }}>
      <PostForm onSuccess={handleSuccess} />
    </div>
  );
};

export default NewPostPage;

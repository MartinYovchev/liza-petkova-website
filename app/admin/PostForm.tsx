"use client";

import { useState } from "react";
import { blogService } from "@/lib/blog-service";
import { generateSlug, extractExcerpt } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import styles from "./PostForm.module.scss";

interface PostFormProps {
  onSuccess?: () => void;
  initialData?: any;
  isEditing?: boolean;
}

export default function PostForm({
  onSuccess,
  initialData,
  isEditing = false,
}: PostFormProps) {
  const [title, setTitle] = useState(initialData?.title || "");
  const [content, setContent] = useState(initialData?.content || "");
  const [tags, setTags] = useState(initialData?.tags?.join(", ") || "");
  const [metaDescription, setMetaDescription] = useState(
    initialData?.meta_description || ""
  );
  const [featuredImage, setFeaturedImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { user } = useAuth();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFeaturedImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (
    e: React.FormEvent,
    publishNow: boolean = false
  ) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    setError("");

    try {
      let imageUrl = initialData?.featured_image_url || null;

      // Upload image if new one selected
      if (featuredImage) {
        imageUrl = await blogService.uploadImage(featuredImage, user.id);
      }

      const postData = {
        title,
        slug: generateSlug(title),
        content,
        excerpt: extractExcerpt(content),
        featured_image_url: imageUrl,
        published: publishNow,
        tags: tags
          .split(",")
          .map((tag: string) => tag.trim())
          .filter((tag: string) => tag),
        meta_description: metaDescription || extractExcerpt(content, 160),
      };

      if (isEditing && initialData?.id) {
        await blogService.updatePost(initialData.id, postData);
      } else {
        await blogService.createPost(postData);
      }

      alert(isEditing ? "Post updated!" : "Post created!");
      onSuccess?.();
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className={styles.loginMessage}>Please log in to create posts.</div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>{isEditing ? "Edit Post" : "Create New Post"}</h2>
      </div>

      <form className={styles.form}>
        <div className={styles.formGroup}>
          <label
            htmlFor="title"
            className={`${styles.label} ${styles.required}`}
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className={styles.input}
            placeholder="Enter your blog post title..."
          />
        </div>

        <div className={styles.formGroup}>
          <label
            htmlFor="content"
            className={`${styles.label} ${styles.required}`}
          >
            Content (Markdown supported)
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            className={`${styles.textarea} ${styles.content}`}
            placeholder="Write your blog post content here... You can use Markdown formatting."
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="tags" className={styles.label}>
            Tags (comma-separated)
          </label>
          <input
            type="text"
            id="tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className={styles.input}
            placeholder="react, javascript, web development"
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="meta-description" className={styles.label}>
            Meta Description (SEO)
          </label>
          <textarea
            id="meta-description"
            value={metaDescription}
            onChange={(e) => setMetaDescription(e.target.value)}
            className={styles.textarea}
            placeholder="Brief description for search engines (will auto-generate if left empty)"
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="featured-image" className={styles.label}>
            Featured Image
          </label>
          <div className={styles.fileInput}>
            <input
              type="file"
              id="featured-image"
              accept="image/*"
              onChange={handleImageChange}
            />
            <div className={styles.fileInputLabel}>
              {featuredImage
                ? featuredImage.name
                : "Choose an image file or drag it here"}
            </div>
          </div>
        </div>

        {error && <div className={styles.errorMessage}>{error}</div>}

        <div className={styles.buttonGroup}>
          <button
            type="button"
            onClick={(e) => handleSubmit(e, false)}
            disabled={loading}
            className={`${styles.draftButton} ${loading ? styles.loading : ""}`}
          >
            {loading ? "Saving..." : "Save as Draft"}
          </button>

          <button
            type="button"
            onClick={(e) => handleSubmit(e, true)}
            disabled={loading}
            className={`${styles.publishButton} ${
              loading ? styles.loading : ""
            }`}
          >
            {loading ? "Publishing..." : "Publish Now"}
          </button>
        </div>
      </form>
    </div>
  );
}

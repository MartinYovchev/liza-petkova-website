// components/admin/PostForm.tsx
"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { MdAdd, MdDelete, MdSave, MdCancel, MdStar } from "react-icons/md";
import { Post, PostFormData } from "./types";
import styles from "./PostForm.module.scss";

interface PostFormProps {
  post?: Post;
  onSubmit: (data: PostFormData) => Promise<void>;
  isLoading?: boolean;
}

const PostForm: React.FC<PostFormProps> = ({ post, onSubmit, isLoading }) => {
  const router = useRouter();
  const [formData, setFormData] = useState<PostFormData>({
    title: "",
    content: "",
    category: "",
    published: false,
    images: [],
  });

  const [newImageUrl, setNewImageUrl] = useState("");

  useEffect(() => {
    if (post) {
      setFormData({
        title: post.title,
        content: post.content,
        category: post.category,
        published: post.published,
        images: post.images.map((img) => ({
          url: img.url,
          isFeatured: img.isFeatured,
        })),
      });
    }
  }, [post]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  const handleAddImage = () => {
    if (newImageUrl.trim()) {
      setFormData((prev) => ({
        ...prev,
        images: [
          ...prev.images,
          { url: newImageUrl.trim(), isFeatured: false },
        ],
      }));
      setNewImageUrl("");
    }
  };

  const handleRemoveImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleToggleFeatured = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.map((img, i) =>
        i === index ? { ...img, isFeatured: !img.isFeatured } : img
      ),
    }));
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.formGroup}>
        <label htmlFor="title" className={styles.label}>
          Title *
        </label>
        <input
          type="text"
          id="title"
          className={styles.input}
          value={formData.title}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, title: e.target.value }))
          }
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="category" className={styles.label}>
          Category *
        </label>
        <select
          id="category"
          className={styles.select}
          value={formData.category}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, category: e.target.value }))
          }
          required
        >
          <option value="">Select a category</option>
          <option value="Technology">Technology</option>
          <option value="Business">Business</option>
          <option value="Lifestyle">Lifestyle</option>
          <option value="Travel">Travel</option>
          <option value="Food">Food</option>
          <option value="Health">Health</option>
        </select>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="content" className={styles.label}>
          Content *
        </label>
        <textarea
          id="content"
          className={styles.textarea}
          value={formData.content}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, content: e.target.value }))
          }
          required
          placeholder="Write your blog post content here..."
        />
      </div>

      <div className={styles.checkboxGroup}>
        <input
          type="checkbox"
          id="published"
          className={styles.checkbox}
          checked={formData.published}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, published: e.target.checked }))
          }
        />
        <label htmlFor="published" className={styles.checkboxLabel}>
          Published
        </label>
      </div>

      <div className={styles.imagesSection}>
        <h3 className={styles.sectionTitle}>Images</h3>

        <div className={styles.formGroup}>
          <label htmlFor="imageUrl" className={styles.label}>
            Add Image URL
          </label>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <input
              type="url"
              id="imageUrl"
              className={styles.input}
              value={newImageUrl}
              onChange={(e) => setNewImageUrl(e.target.value)}
              placeholder="https://example.com/image.jpg"
            />
            <button
              type="button"
              onClick={handleAddImage}
              className={styles.addImageButton}
            >
              <MdAdd /> Add
            </button>
          </div>
        </div>

        {formData.images.map((image, index) => (
          <div key={index} className={styles.imageItem}>
            <img
              src={image.url}
              alt={`Preview ${index + 1}`}
              className={styles.imagePreview}
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/placeholder-image.png";
              }}
            />
            <div className={styles.imageDetails}>
              <div className={styles.imageUrl}>{image.url}</div>
              {image.isFeatured && (
                <div className={styles.featuredBadge}>
                  <MdStar /> Featured
                </div>
              )}
              <div className={styles.checkboxGroup}>
                <input
                  type="checkbox"
                  checked={image.isFeatured}
                  onChange={() => handleToggleFeatured(index)}
                  className={styles.checkbox}
                />
                <label className={styles.checkboxLabel}>
                  Set as featured image
                </label>
              </div>
            </div>
            <button
              type="button"
              onClick={() => handleRemoveImage(index)}
              className={styles.removeButton}
            >
              <MdDelete />
            </button>
          </div>
        ))}
      </div>

      <div className={styles.buttonGroup}>
        <button
          type="submit"
          disabled={isLoading}
          className={styles.primaryButton}
        >
          <MdSave />
          {isLoading ? "Saving..." : post ? "Update Post" : "Create Post"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/posts")}
          className={styles.secondaryButton}
        >
          <MdCancel />
          Cancel
        </button>
      </div>
    </form>
  );
};

export default PostForm;

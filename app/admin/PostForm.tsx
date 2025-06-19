// components/admin/PostForm.tsx
"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  MdAdd,
  MdDelete,
  MdSave,
  MdCancel,
  MdStar,
  MdRemove,
  MdSearch,
} from "react-icons/md";
import { Post, PostFormData, CATEGORIES, STATUSES } from "./types";
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
    excerpt: "",
    category: "PROFESSIONAL",
    status: "DRAFT",
    featured: false,
    seoTitle: "",
    seoDescription: "",
    images: [],
    tags: [],
  });

  const [newImageUrl, setNewImageUrl] = useState("");
  const [newImageAlt, setNewImageAlt] = useState("");
  const [newImageCaption, setNewImageCaption] = useState("");
  const [newTag, setNewTag] = useState("");
  const [availableTags, setAvailableTags] = useState<string[]>([]);

  useEffect(() => {
    if (post) {
      setFormData({
        title: post.title,
        content: post.content,
        excerpt: post.excerpt || "",
        category: post.category,
        status: post.status,
        featured: post.featured,
        seoTitle: post.seoTitle || "",
        seoDescription: post.seoDescription || "",
        images: post.images.map((img) => ({
          url: img.url,
          alt: img.alt || "",
          caption: img.caption || "",
          width: img.width || undefined,
          height: img.height || undefined,
          fileSize: img.fileSize || undefined,
          mimeType: img.mimeType || "",
          isFeatured: img.isFeatured,
          isOptimized: img.isOptimized || false,
        })),
        tags: post.tags.map((postTag) => postTag.tag.slug),
      });
    }
    fetchAvailableTags();
  }, [post]);

  const fetchAvailableTags = async () => {
    try {
      // This would need a new API endpoint to fetch available tags
      // For now, we'll use a simple array
      setAvailableTags([
        "nextjs",
        "react",
        "typescript",
        "web-development",
        "design",
        "tutorial",
        "prisma",
      ]);
    } catch (error) {
      console.error("Failed to fetch tags:", error);
    }
  };

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
          {
            url: newImageUrl.trim(),
            alt: newImageAlt.trim(),
            caption: newImageCaption.trim(),
            isFeatured: false,
            isOptimized: false,
          },
        ],
      }));
      setNewImageUrl("");
      setNewImageAlt("");
      setNewImageCaption("");
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

  const handleAddTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()],
      }));
      setNewTag("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const generateExcerpt = () => {
    if (formData.content) {
      const excerpt = formData.content.substring(0, 200).trim() + "...";
      setFormData((prev) => ({ ...prev, excerpt }));
    }
  };

  const generateSEOTitle = () => {
    if (formData.title) {
      setFormData((prev) => ({ ...prev, seoTitle: formData.title }));
    }
  };

  const generateSEODescription = () => {
    if (formData.excerpt || formData.content) {
      const description = (formData.excerpt || formData.content)
        .substring(0, 160)
        .trim();
      setFormData((prev) => ({ ...prev, seoDescription: description }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.formRow}>
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
          <label className={styles.label}>
            <input
              type="checkbox"
              checked={formData.featured}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, featured: e.target.checked }))
              }
              className={styles.checkbox}
            />
            <MdStar className={styles.starIcon} />
            Featured Post
          </label>
        </div>
      </div>

      <div className={styles.formRow}>
        <div className={styles.formGroup}>
          <label htmlFor="category" className={styles.label}>
            Category *
          </label>
          <select
            id="category"
            className={styles.select}
            value={formData.category}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                category: e.target.value as any,
              }))
            }
            required
          >
            {CATEGORIES.map((category) => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="status" className={styles.label}>
            Status *
          </label>
          <select
            id="status"
            className={styles.select}
            value={formData.status}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                status: e.target.value as any,
              }))
            }
            required
          >
            {STATUSES.map((status) => (
              <option key={status.value} value={status.value}>
                {status.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="excerpt" className={styles.label}>
          Excerpt
          <button
            type="button"
            onClick={generateExcerpt}
            className={styles.generateButton}
            title="Generate from content"
          >
            Auto-generate
          </button>
        </label>
        <textarea
          id="excerpt"
          className={styles.textarea}
          value={formData.excerpt}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, excerpt: e.target.value }))
          }
          placeholder="Brief description of the post (optional - will be auto-generated if empty)"
          rows={3}
        />
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
          rows={10}
        />
      </div>

      {/* SEO Section */}
      <div className={styles.seoSection}>
        <h3 className={styles.sectionTitle}>SEO Settings</h3>

        <div className={styles.formGroup}>
          <label htmlFor="seoTitle" className={styles.label}>
            SEO Title
            <button
              type="button"
              onClick={generateSEOTitle}
              className={styles.generateButton}
              title="Use post title"
            >
              Use Title
            </button>
          </label>
          <input
            type="text"
            id="seoTitle"
            className={styles.input}
            value={formData.seoTitle}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, seoTitle: e.target.value }))
            }
            placeholder="SEO-optimized title"
            maxLength={60}
          />
          <small className={styles.hint}>
            {(formData.seoTitle || "").length}/60 characters
          </small>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="seoDescription" className={styles.label}>
            SEO Description
            <button
              type="button"
              onClick={generateSEODescription}
              className={styles.generateButton}
              title="Generate from excerpt/content"
            >
              Auto-generate
            </button>
          </label>
          <textarea
            id="seoDescription"
            className={styles.textarea}
            value={formData.seoDescription}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                seoDescription: e.target.value,
              }))
            }
            placeholder="SEO meta description"
            rows={3}
            maxLength={160}
          />
          <small className={styles.hint}>
            {(formData.seoDescription || "").length}/160 characters
          </small>
        </div>
      </div>

      {/* Tags Section */}
      <div className={styles.tagsSection}>
        <h3 className={styles.sectionTitle}>Tags</h3>

        <div className={styles.formGroup}>
          <label htmlFor="newTag" className={styles.label}>
            Add Tags
          </label>
          <div className={styles.tagInputContainer}>
            <input
              type="text"
              id="newTag"
              className={styles.input}
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              placeholder="Enter tag name"
              list="availableTags"
            />
            <datalist id="availableTags">
              {availableTags.map((tag) => (
                <option key={tag} value={tag} />
              ))}
            </datalist>
            <button
              type="button"
              onClick={handleAddTag}
              className={styles.addButton}
            >
              <MdAdd /> Add
            </button>
          </div>
        </div>

        {formData.tags.length > 0 && (
          <div className={styles.tagsList}>
            {formData.tags.map((tag) => (
              <span key={tag} className={styles.tag}>
                {tag}
                <button
                  type="button"
                  onClick={() => handleRemoveTag(tag)}
                  className={styles.removeTagButton}
                >
                  <MdRemove />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Images Section */}
      <div className={styles.imagesSection}>
        <h3 className={styles.sectionTitle}>Images</h3>

        <div className={styles.formGroup}>
          <label htmlFor="imageUrl" className={styles.label}>
            Add Image
          </label>
          <div className={styles.imageInputContainer}>
            <input
              type="url"
              id="imageUrl"
              className={styles.input}
              value={newImageUrl}
              onChange={(e) => setNewImageUrl(e.target.value)}
              placeholder="Image URL"
            />
            <input
              type="text"
              className={styles.input}
              value={newImageAlt}
              onChange={(e) => setNewImageAlt(e.target.value)}
              placeholder="Alt text"
            />
            <input
              type="text"
              className={styles.input}
              value={newImageCaption}
              onChange={(e) => setNewImageCaption(e.target.value)}
              placeholder="Caption (optional)"
            />
            <button
              type="button"
              onClick={handleAddImage}
              className={styles.addButton}
            >
              <MdAdd /> Add
            </button>
          </div>
        </div>

        {formData.images.map((image, index) => (
          <div key={index} className={styles.imageItem}>
            <img
              src={image.url}
              alt={image.alt || `Preview ${index + 1}`}
              className={styles.imagePreview}
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/placeholder.jpg";
              }}
            />
            <div className={styles.imageDetails}>
              <div className={styles.imageUrl}>{image.url}</div>
              {image.alt && (
                <div className={styles.imageAlt}>Alt: {image.alt}</div>
              )}
              {image.caption && (
                <div className={styles.imageCaption}>
                  Caption: {image.caption}
                </div>
              )}
              {image.isFeatured && (
                <div className={styles.featuredBadge}>
                  <MdStar /> Featured
                </div>
              )}
              <div className={styles.imageControls}>
                <label className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    checked={image.isFeatured}
                    onChange={() => handleToggleFeatured(index)}
                    className={styles.checkbox}
                  />
                  Featured image
                </label>
              </div>
            </div>
            <button
              type="button"
              onClick={() => handleRemoveImage(index)}
              className={styles.deleteImageButton}
            >
              <MdDelete />
            </button>
          </div>
        ))}
      </div>

      <div className={styles.formActions}>
        <button
          type="button"
          onClick={() => router.back()}
          className={styles.cancelButton}
        >
          <MdCancel /> Cancel
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className={styles.submitButton}
        >
          <MdSave /> {isLoading ? "Saving..." : "Save Post"}
        </button>
      </div>
    </form>
  );
};

export default PostForm;

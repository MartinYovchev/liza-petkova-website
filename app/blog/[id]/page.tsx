"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  MdCalendarToday,
  MdFolder,
  MdArrowBack,
  MdStar,
  MdAccessTime,
  MdVisibility,
} from "react-icons/md";
import Link from "next/link";
import { Post } from "../../admin/types";
import styles from "./BlogDetail.module.scss";

const BlogDetailPage: React.FC = () => {
  const params = useParams();
  const router = useRouter();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (params.id) {
      fetchPost();
    }
  }, [params.id]);

  const fetchPost = async () => {
    try {
      setError(null);
      const response = await fetch(`/api/posts/${params.id}`);

      if (!response.ok) {
        if (response.status === 404) {
          setError("Post not found");
        } else {
          setError("Failed to load post");
        }
        return;
      }

      const data = await response.json();
      setPost(data.post);
    } catch (error) {
      console.error("Error fetching post:", error);
      setError("Failed to load post. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const formatCategoryName = (category: string) => {
    switch (category) {
      case "PROFESSIONAL":
        return "Professional";
      case "ARTISTIC":
        return "Artistic";
      case "PERSONAL":
        return "Personal";
      case "TUTORIAL":
        return "Tutorial";
      case "NEWS":
        return "News";
      default:
        return (
          category.charAt(0).toUpperCase() + category.slice(1).toLowerCase()
        );
    }
  };

  const formatContent = (content: string) => {
    return content
      .split("\n")
      .map((paragraph, index) => <p key={index}>{paragraph}</p>);
  };

  const getFeaturedImage = (post: Post) => {
    if (!post.images || post.images.length === 0) {
      return null;
    }
    return post.images.find((img) => img.isFeatured) || post.images[0];
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
          <p>Loading post...</p>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>
          <h2>{error || "Post not found"}</h2>
          <p>
            {error === "Post not found"
              ? "The post you're looking for doesn't exist or has been removed."
              : "Something went wrong while loading the post."}
          </p>
          <div className={styles.errorActions}>
            <Link href="/blog" className={styles.backButton}>
              <MdArrowBack /> Back to Blog
            </Link>
            {error !== "Post not found" && (
              <button onClick={fetchPost} className={styles.retryButton}>
                Try Again
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  const featuredImage = getFeaturedImage(post);

  return (
    <div className={styles.container}>
      <article className={styles.post}>
        <header className={styles.header}>
          <Link href="/blog" className={styles.backButton}>
            <MdArrowBack /> Back to Blog
          </Link>

          <div className={styles.titleSection}>
            <h1 className={styles.title}>{post.title}</h1>
            {post.excerpt && <p className={styles.excerpt}>{post.excerpt}</p>}
          </div>

          <div className={styles.meta}>
            <div className={styles.metaRow}>
              <span className={styles.date}>
                <MdCalendarToday />
                {new Date(
                  post.publishedAt || post.createdAt
                ).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
              <span className={styles.category}>
                <MdFolder />
                {formatCategoryName(post.category)}
              </span>
              {post.featured && (
                <span className={styles.featured}>
                  <MdStar /> Featured
                </span>
              )}
            </div>

            <div className={styles.metaRow}>
              {post.readTime && (
                <span className={styles.readTime}>
                  <MdAccessTime />
                  {post.readTime} min read
                </span>
              )}
              {post.viewCount > 0 && (
                <span className={styles.viewCount}>
                  <MdVisibility />
                  {post.viewCount} views
                </span>
              )}
            </div>
          </div>

          {post.tags && post.tags.length > 0 && (
            <div className={styles.tags}>
              {post.tags.map((postTag) => (
                <span
                  key={postTag.tag.id}
                  className={styles.tag}
                  style={{ backgroundColor: postTag.tag.color || "#007acc" }}
                >
                  {postTag.tag.name}
                </span>
              ))}
            </div>
          )}
        </header>

        {featuredImage && (
          <div className={styles.featuredImage}>
            <img
              src={featuredImage.url}
              alt={featuredImage.alt || post.title}
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/placeholder.jpg";
              }}
            />
            {featuredImage.caption && (
              <p className={styles.imageCaption}>{featuredImage.caption}</p>
            )}
          </div>
        )}

        <div className={styles.content}>{formatContent(post.content)}</div>

        {post.images && post.images.length > 1 && (
          <div className={styles.gallery}>
            <h2>Gallery</h2>
            <div className={styles.imageGrid}>
              {post.images
                .filter(
                  (image) => !image.isFeatured || post.images.length === 1
                )
                .map((image) => (
                  <div key={image.id} className={styles.imageWrapper}>
                    <img
                      src={image.url}
                      alt={image.alt || `${post.title} - Image ${image.id}`}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "/placeholder.jpg";
                      }}
                    />
                    {image.caption && (
                      <p className={styles.imageCaption}>{image.caption}</p>
                    )}
                  </div>
                ))}
            </div>
          </div>
        )}

        <footer className={styles.footer}>
          <div className={styles.postStats}>
            <div className={styles.statItem}>
              <span className={styles.statLabel}>Published:</span>
              <span className={styles.statValue}>
                {new Date(
                  post.publishedAt || post.createdAt
                ).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
            {post.publishedAt !== post.createdAt && (
              <div className={styles.statItem}>
                <span className={styles.statLabel}>Last updated:</span>
                <span className={styles.statValue}>
                  {new Date(post.updatedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
            )}
          </div>

          <Link href="/blog" className={styles.backToIndex}>
            ← Back to all posts
          </Link>
        </footer>
      </article>
    </div>
  );
};

export default BlogDetailPage;

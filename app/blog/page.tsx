"use client";

import { useState, useEffect } from "react";
import { blogService } from "@/lib/blog-service";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import styles from "./BlogDetail.module.scss";

interface BlogDetailPageProps {
  params: { id: string };
}

export default function BlogDetailPage({ params }: BlogDetailPageProps) {
  const [post, setPost] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPost();
  }, [params.id]);

  const fetchPost = async () => {
    try {
      setError(null);
      // Try to get post by slug first (assuming id could be a slug)
      let postData = await blogService.getPostBySlug(params.id);

      // If not found by slug, try to get all published posts and find by id
      if (!postData) {
        const allPosts = await blogService.getPublishedPosts();
        postData =
          allPosts.find((p) => p.id === params.id || p.slug === params.id) ||
          null;
      }

      if (!postData) {
        throw new Error("Post not found");
      }

      // Only show if post is published (unless it's the author viewing their own post)
      if (!postData.published) {
        throw new Error("Post not found");
      }

      setPost(postData);
    } catch (error: any) {
      console.error("Error fetching post:", error);
      setError(error.message || "Failed to load post");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>Loading post...</div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>
          <h2>Post Not Found</h2>
          <p>{error || "The blog post you're looking for doesn't exist."}</p>
          <Link href="/blog" className={styles.backLink}>
            ← Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <article className={styles.article}>
        <header className={styles.header}>
          <Link href="/blog" className={styles.backLink}>
            ← Back to Blog
          </Link>

          <h1 className={styles.title}>{post.title}</h1>

          <div className={styles.meta}>
            <time className={styles.date}>{formatDate(post.created_at)}</time>
            {post.tags && post.tags.length > 0 && (
              <div className={styles.tags}>
                {post.tags.map((tag: string, index: number) => (
                  <span key={index} className={styles.tag}>
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {post.featured_image_url && (
            <div className={styles.featuredImage}>
              <img
                src={post.featured_image_url}
                alt={post.title}
                className={styles.image}
              />
            </div>
          )}
        </header>

        <div className={styles.content}>
          {post.content.split("\n").map((paragraph: string, index: number) => {
            if (paragraph.trim() === "") return <br key={index} />;

            // Basic markdown parsing for bold, italic, and links
            let processedParagraph = paragraph
              .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
              .replace(/\*(.*?)\*/g, "<em>$1</em>")
              .replace(
                /\[([^\]]+)\]\(([^)]+)\)/g,
                '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>'
              );

            if (paragraph.startsWith("# ")) {
              return (
                <h1
                  key={index}
                  dangerouslySetInnerHTML={{
                    __html: processedParagraph.substring(2),
                  }}
                />
              );
            } else if (paragraph.startsWith("## ")) {
              return (
                <h2
                  key={index}
                  dangerouslySetInnerHTML={{
                    __html: processedParagraph.substring(3),
                  }}
                />
              );
            } else if (paragraph.startsWith("### ")) {
              return (
                <h3
                  key={index}
                  dangerouslySetInnerHTML={{
                    __html: processedParagraph.substring(4),
                  }}
                />
              );
            } else {
              return (
                <p
                  key={index}
                  dangerouslySetInnerHTML={{ __html: processedParagraph }}
                />
              );
            }
          })}
        </div>

        <footer className={styles.footer}>
          <div className={styles.shareSection}>
            <h3>Share this post</h3>
            <div className={styles.shareButtons}>
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                  post.title
                )}&url=${encodeURIComponent(window.location.href)}`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.shareButton}
              >
                Twitter
              </a>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                  window.location.href
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.shareButton}
              >
                Facebook
              </a>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                  window.location.href
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.shareButton}
              >
                LinkedIn
              </a>
            </div>
          </div>
        </footer>
      </article>
    </div>
  );
}

// app/admin/posts/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  MdAdd,
  MdEdit,
  MdDelete,
  MdVisibility,
  MdVisibilityOff,
  MdStar,
  MdStarBorder,
  MdAccessTime,
  MdRemoveRedEye,
} from "react-icons/md";
import AdminLayout from "../layout";
import { Post, STATUSES } from "../types";
import styles from "./Posts.module.scss";

const AdminPostsPage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<
    "all" | "DRAFT" | "PUBLISHED" | "ARCHIVED" | "SCHEDULED"
  >("all");

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setError(null);
      const response = await fetch("/api/posts");
      if (!response.ok) {
        throw new Error("Failed to fetch posts");
      }
      const data = await response.json();
      setPosts(data.posts || []);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setError("Failed to load posts. Please try again.");
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (postId: number) => {
    if (!confirm("Are you sure you want to delete this post?")) return;

    try {
      const response = await fetch(`/api/posts/${postId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setPosts(posts.filter((post) => post.id !== postId));
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to delete post");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
      alert(
        `Failed to delete post: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
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

  const formatStatusName = (status: string) => {
    switch (status) {
      case "DRAFT":
        return "Draft";
      case "PUBLISHED":
        return "Published";
      case "ARCHIVED":
        return "Archived";
      case "SCHEDULED":
        return "Scheduled";
      default:
        return status;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "PUBLISHED":
        return <MdVisibility className={styles.statusIcon} />;
      case "DRAFT":
        return <MdVisibilityOff className={styles.statusIcon} />;
      case "ARCHIVED":
        return <MdVisibilityOff className={styles.statusIcon} />;
      case "SCHEDULED":
        return <MdAccessTime className={styles.statusIcon} />;
      default:
        return <MdVisibilityOff className={styles.statusIcon} />;
    }
  };

  const filteredPosts = posts.filter((post) => {
    if (filter === "all") return true;
    return post.status === filter;
  });

  const getPostCounts = () => {
    return {
      all: posts.length,
      DRAFT: posts.filter((p) => p.status === "DRAFT").length,
      PUBLISHED: posts.filter((p) => p.status === "PUBLISHED").length,
      ARCHIVED: posts.filter((p) => p.status === "ARCHIVED").length,
      SCHEDULED: posts.filter((p) => p.status === "SCHEDULED").length,
      featured: posts.filter((p) => p.featured).length,
    };
  };

  const counts = getPostCounts();

  const content = (
    <div className={styles.postsPage}>
      <div className={styles.pageHeader}>
        <h1>Manage Posts</h1>
        <div className={styles.headerStats}>
          <span className={styles.stat}>Total: {counts.all}</span>
          <span className={styles.stat}>Featured: {counts.featured}</span>
        </div>
        <Link href="/admin/posts/new" className={styles.createButton}>
          <MdAdd /> Create New Post
        </Link>
      </div>

      <div className={styles.filters}>
        <button
          className={`${styles.filterButton} ${
            filter === "all" ? styles.active : ""
          }`}
          onClick={() => setFilter("all")}
        >
          All ({counts.all})
        </button>
        {STATUSES.map((statusOption) => (
          <button
            key={statusOption.value}
            className={`${styles.filterButton} ${
              filter === statusOption.value ? styles.active : ""
            }`}
            onClick={() => setFilter(statusOption.value)}
          >
            {statusOption.label} (
            {counts[statusOption.value as keyof typeof counts] || 0})
          </button>
        ))}
      </div>

      {loading ? (
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
          <p>Loading posts...</p>
        </div>
      ) : error ? (
        <div className={styles.error}>
          <h3>Error</h3>
          <p>{error}</p>
          <button onClick={fetchPosts} className={styles.retryButton}>
            Try Again
          </button>
        </div>
      ) : filteredPosts.length === 0 ? (
        <div className={styles.emptyState}>
          <h3>No posts found</h3>
          <p>
            {filter === "all"
              ? "You haven't created any posts yet."
              : `No ${formatStatusName(filter)} posts found.`}
          </p>
          <Link href="/admin/posts/new" className={styles.createButton}>
            <MdAdd /> Create Your First Post
          </Link>
        </div>
      ) : (
        <div className={styles.postsTable}>
          <div className={styles.tableHeader}>
            <div className={styles.headerCell}>Title</div>
            <div className={styles.headerCell}>Category</div>
            <div className={styles.headerCell}>Status</div>
            <div className={styles.headerCell}>Stats</div>
            <div className={styles.headerCell}>Date</div>
            <div className={styles.headerCell}>Actions</div>
          </div>

          {filteredPosts.map((post) => (
            <div key={post.id} className={styles.tableRow}>
              <div className={styles.cell}>
                <div className={styles.postTitleContainer}>
                  <div className={styles.postTitle}>{post.title}</div>
                  {post.featured && (
                    <MdStar
                      className={styles.featuredIcon}
                      title="Featured Post"
                    />
                  )}
                </div>
                <div className={styles.postExcerpt}>
                  {post.excerpt ||
                    (post.content.length > 80
                      ? post.content.substring(0, 80) + "..."
                      : post.content)}
                </div>
                {post.tags && post.tags.length > 0 && (
                  <div className={styles.postTags}>
                    {post.tags.slice(0, 3).map((postTag) => (
                      <span
                        key={postTag.tag.id}
                        className={styles.tag}
                        style={{
                          backgroundColor: postTag.tag.color || "#007acc",
                        }}
                      >
                        {postTag.tag.name}
                      </span>
                    ))}
                    {post.tags.length > 3 && (
                      <span className={styles.moreTagsIndicator}>
                        +{post.tags.length - 3} more
                      </span>
                    )}
                  </div>
                )}
              </div>
              <div className={styles.cell}>
                <span className={styles.category}>
                  {formatCategoryName(post.category)}
                </span>
              </div>
              <div className={styles.cell}>
                <div className={styles.statusContainer}>
                  {getStatusIcon(post.status)}
                  <span
                    className={`${styles.status} ${
                      styles[post.status.toLowerCase()]
                    }`}
                  >
                    {formatStatusName(post.status)}
                  </span>
                </div>
              </div>
              <div className={styles.cell}>
                <div className={styles.stats}>
                  <div className={styles.statItem}>
                    <MdRemoveRedEye className={styles.statIcon} />
                    {post.viewCount}
                  </div>
                  {post.readTime && (
                    <div className={styles.statItem}>
                      <MdAccessTime className={styles.statIcon} />
                      {post.readTime}m
                    </div>
                  )}
                </div>
              </div>
              <div className={styles.cell}>
                <div className={styles.date}>
                  <div className={styles.dateLabel}>
                    {post.status === "PUBLISHED" && post.publishedAt
                      ? "Published"
                      : "Created"}
                  </div>
                  <div className={styles.dateValue}>
                    {new Date(
                      post.status === "PUBLISHED" && post.publishedAt
                        ? post.publishedAt
                        : post.createdAt
                    ).toLocaleDateString()}
                  </div>
                </div>
              </div>
              <div className={styles.cell}>
                <div className={styles.actions}>
                  <Link
                    href={`/admin/posts/${post.id}/edit`}
                    className={styles.actionButton}
                    title="Edit"
                  >
                    <MdEdit />
                  </Link>
                  <button
                    onClick={() => handleDelete(post.id)}
                    className={`${styles.actionButton} ${styles.deleteButton}`}
                    title="Delete"
                  >
                    <MdDelete />
                  </button>
                  {post.status === "PUBLISHED" && (
                    <Link
                      href={`/blog/${post.id}`}
                      className={styles.actionButton}
                      title="View Post"
                      target="_blank"
                    >
                      <MdVisibility />
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return content;
};

export default AdminPostsPage;

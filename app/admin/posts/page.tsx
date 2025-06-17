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
} from "react-icons/md";
import AdminLayout from "../layout";
import { Post } from "../types";
import styles from "./Posts.module.scss";

const AdminPostsPage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "published" | "draft">("all");

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch("/api/posts");
      const data = await response.json();
      setPosts(data.posts);
    } catch (error) {
      console.error("Error fetching posts:", error);
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
        throw new Error("Failed to delete post");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
      alert("Failed to delete post");
    }
  };

  const filteredPosts = posts.filter((post) => {
    if (filter === "published") return post.published;
    if (filter === "draft") return !post.published;
    return true;
  });

  return (
    <div className={styles.postsPage}>
      <div className={styles.filters}>
        <button
          className={`${styles.filterButton} ${
            filter === "all" ? styles.active : ""
          }`}
          onClick={() => setFilter("all")}
        >
          All ({posts.length})
        </button>
        <button
          className={`${styles.filterButton} ${
            filter === "published" ? styles.active : ""
          }`}
          onClick={() => setFilter("published")}
        >
          Published ({posts.filter((p) => p.published).length})
        </button>
        <button
          className={`${styles.filterButton} ${
            filter === "draft" ? styles.active : ""
          }`}
          onClick={() => setFilter("draft")}
        >
          Drafts ({posts.filter((p) => !p.published).length})
        </button>
      </div>

      {loading ? (
        <div className={styles.loading}>Loading posts...</div>
      ) : filteredPosts.length === 0 ? (
        <div className={styles.emptyState}>
          <h3>No posts found</h3>
          <p>
            {filter === "all"
              ? "You haven't created any posts yet."
              : `No ${filter} posts found.`}
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
            <div className={styles.headerCell}>Date</div>
            <div className={styles.headerCell}>Actions</div>
          </div>

          {filteredPosts.map((post) => (
            <div key={post.id} className={styles.tableRow}>
              <div className={styles.cell}>
                <div className={styles.postTitle}>{post.title}</div>
                <div className={styles.postExcerpt}>
                  {post.content.substring(0, 80)}...
                </div>
              </div>
              <div className={styles.cell}>
                <span className={styles.category}>{post.category}</span>
              </div>
              <div className={styles.cell}>
                <div className={styles.statusContainer}>
                  {post.published ? (
                    <MdVisibility className={styles.statusIcon} />
                  ) : (
                    <MdVisibilityOff className={styles.statusIcon} />
                  )}
                  <span
                    className={`${styles.status} ${
                      post.published ? styles.published : styles.draft
                    }`}
                  >
                    {post.published ? "Published" : "Draft"}
                  </span>
                </div>
              </div>
              <div className={styles.cell}>
                <div className={styles.date}>
                  {new Date(post.createdAt).toLocaleDateString()}
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
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminPostsPage;

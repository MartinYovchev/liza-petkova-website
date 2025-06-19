"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  MdAdd,
  MdArticle,
  MdVisibility,
  MdEdit,
  MdBusinessCenter,
} from "react-icons/md";
import { Post } from "./types";
import styles from "./Admin.module.scss";

const AdminDashboard: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [stats, setStats] = useState({
    totalPosts: 0,
    publishedPosts: 0,
    draftPosts: 0,
    professionalPosts: 0,
    artisticPosts: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
      const postsData = data.posts || [];
      setPosts(postsData);

      const published = postsData.filter(
        (post: Post) => post.status === "PUBLISHED"
      ).length;
      const professional = postsData.filter(
        (post: Post) => post.category === "PROFESSIONAL"
      ).length;
      const artistic = postsData.filter(
        (post: Post) => post.category === "ARTISTIC"
      ).length;

      setStats({
        totalPosts: postsData.length,
        publishedPosts: published,
        draftPosts: postsData.length - published,
        professionalPosts: professional,
        artisticPosts: artistic,
      });
    } catch (error) {
      console.error("Error fetching posts:", error);
      setError("Failed to load dashboard data. Please try again.");
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  const formatCategoryName = (category: string) => {
    return category.charAt(0).toUpperCase() + category.slice(1);
  };

  const recentPosts = posts.slice(0, 5);

  const content = (
    <div className={styles.dashboard}>
      <div className={styles.welcomeSection}>
        <h1>Welcome to Admin Dashboard</h1>
        <p>Manage your blog posts and monitor your content performance.</p>
      </div>

      {loading ? (
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
          <p>Loading dashboard...</p>
        </div>
      ) : error ? (
        <div className={styles.error}>
          <h3>Error</h3>
          <p>{error}</p>
          <button onClick={fetchPosts} className={styles.retryButton}>
            Try Again
          </button>
        </div>
      ) : (
        <>
          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <div className={styles.statIcon}>
                <MdArticle />
              </div>
              <div className={styles.statContent}>
                <h3 className={styles.statNumber}>{stats.totalPosts}</h3>
                <p className={styles.statLabel}>Total Posts</p>
              </div>
            </div>

            <div className={styles.statCard}>
              <div className={styles.statIcon}>
                <MdVisibility />
              </div>
              <div className={styles.statContent}>
                <h3 className={styles.statNumber}>{stats.publishedPosts}</h3>
                <p className={styles.statLabel}>Published</p>
              </div>
            </div>

            <div className={styles.statCard}>
              <div className={styles.statIcon}>
                <MdEdit />
              </div>
              <div className={styles.statContent}>
                <h3 className={styles.statNumber}>{stats.draftPosts}</h3>
                <p className={styles.statLabel}>Drafts</p>
              </div>
            </div>

            <div className={styles.statCard}>
              <div className={styles.statIcon}>
                <MdBusinessCenter />
              </div>
              <div className={styles.statContent}>
                <h3 className={styles.statNumber}>{stats.professionalPosts}</h3>
                <p className={styles.statLabel}>Professional</p>
              </div>
            </div>
          </div>

          <div className={styles.recentSection}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Recent Posts</h2>
              <Link href="/admin/posts" className={styles.viewAllLink}>
                View All
              </Link>
            </div>

            <div className={styles.postsList}>
              {recentPosts.length === 0 ? (
                <div className={styles.emptyState}>
                  <MdArticle className={styles.emptyIcon} />
                  <h3>No posts yet</h3>
                  <p>Create your first blog post to get started.</p>
                  <Link href="/admin/posts/new" className={styles.createButton}>
                    <MdAdd /> Create First Post
                  </Link>
                </div>
              ) : (
                recentPosts.map((post) => (
                  <div key={post.id} className={styles.postItem}>
                    <div className={styles.postContent}>
                      <h3 className={styles.postTitle}>{post.title}</h3>
                      <p className={styles.postMeta}>
                        {formatCategoryName(post.category)} •{" "}
                        {new Date(post.createdAt).toLocaleDateString()} •{" "}
                        <span
                          className={
                            post.status === "PUBLISHED"
                              ? styles.published
                              : styles.draft
                          }
                        >
                          {post.status === "PUBLISHED" ? "Published" : "Draft"}
                        </span>
                      </p>
                      <p className={styles.postExcerpt}>
                        {post.content.length > 100
                          ? post.content.substring(0, 100) + "..."
                          : post.content}
                      </p>
                    </div>
                    <div className={styles.postActions}>
                      <Link
                        href={`/admin/posts/${post.id}/edit`}
                        className={styles.editLink}
                      >
                        Edit
                      </Link>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );

  return content;
};

export default AdminDashboard;

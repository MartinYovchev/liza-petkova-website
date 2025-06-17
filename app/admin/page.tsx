// app/admin/page.tsx
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
import AdminLayout from "./layout";
import { Post } from "./types";
import styles from "./Admin.module.scss";

const AdminDashboard: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [stats, setStats] = useState({
    totalPosts: 0,
    publishedPosts: 0,
    draftPosts: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch("/api/posts");
      const data = await response.json();
      setPosts(data.posts);

      const published = data.posts.filter(
        (post: Post) => post.published
      ).length;
      setStats({
        totalPosts: data.posts.length,
        publishedPosts: published,
        draftPosts: data.posts.length - published,
      });
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  const recentPosts = posts.slice(0, 5);

  return (
    <div className={styles.dashboard}>
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
            <h3 className={styles.statNumber}>0</h3>
            <p className={styles.statLabel}>Services</p>
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

        {loading ? (
          <div className={styles.loading}>Loading...</div>
        ) : (
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
                      {post.category} •{" "}
                      {new Date(post.createdAt).toLocaleDateString()}
                    </p>
                    <p className={styles.postExcerpt}>
                      {post.content.substring(0, 100)}...
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;

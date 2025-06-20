"use client";

import { useAuth } from "@/contexts/AuthContext";
import LoginForm from "../login/LoginForm";
import BlogPostForm from "./PostForm";
import { useState, useEffect } from "react";
import { blogService } from "@/lib/blog-service";
import { formatDate } from "@/lib/utils";
import styles from "./BlogPage.module.scss";

export default function Home() {
  const { user, loading, signOut } = useAuth();
  const [posts, setPosts] = useState<any[]>([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [loadingPosts, setLoadingPosts] = useState(false);

  useEffect(() => {
    if (user) {
      loadUserPosts();
    }
  }, [user]);

  const loadUserPosts = async () => {
    setLoadingPosts(true);
    try {
      const userPosts = await blogService.getUserPosts();
      setPosts(userPosts);
    } catch (error) {
      console.error("Error loading posts:", error);
    } finally {
      setLoadingPosts(false);
    }
  };

  const handleDeletePost = async (postId: string) => {
    if (confirm("Are you sure you want to delete this post?")) {
      try {
        await blogService.deletePost(postId);
        loadUserPosts(); // Refresh the list
      } catch (error) {
        console.error("Error deleting post:", error);
      }
    }
  };

  const handleTogglePublish = async (postId: string) => {
    try {
      await blogService.togglePublishStatus(postId);
      loadUserPosts(); // Refresh the list
    } catch (error) {
      console.error("Error toggling publish status:", error);
    }
  };

  if (loading) {
    return <div className={styles.loadingContainer}>Loading...</div>;
  }

  if (!user) {
    return (
      <div className={styles.loginContainer}>
        <div className={styles.loginContent}>
          <h1 className={styles.loginTitle}>Welcome to Blog App</h1>
          <LoginForm />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.headerTitle}>My Blog Dashboard</h1>
          <div className={styles.headerActions}>
            <span className={styles.welcomeText}>Welcome, {user.email}</span>
            <button
              onClick={() => setShowCreateForm(!showCreateForm)}
              className={styles.primaryButton}
            >
              {showCreateForm ? "Cancel" : "New Post"}
            </button>
            <button onClick={signOut} className={styles.secondaryButton}>
              Sign Out
            </button>
          </div>
        </div>
      </header>

      <main className={styles.main}>
        {showCreateForm ? (
          <BlogPostForm
            onSuccess={() => {
              setShowCreateForm(false);
              loadUserPosts();
            }}
          />
        ) : (
          <div>
            <h2 className={styles.sectionTitle}>Your Posts</h2>

            {loadingPosts ? (
              <div className={styles.loadingText}>Loading posts...</div>
            ) : posts.length === 0 ? (
              <div className={styles.emptyState}>
                <p className={styles.emptyStateText}>
                  You haven't created any posts yet.
                </p>
                <button
                  onClick={() => setShowCreateForm(true)}
                  className={styles.primaryButton}
                >
                  Create Your First Post
                </button>
              </div>
            ) : (
              <div className={styles.postsGrid}>
                {posts.map((post) => (
                  <div key={post.id} className={styles.postCard}>
                    <div className={styles.postHeader}>
                      <div className={styles.postContent}>
                        <h3 className={styles.postTitle}>{post.title}</h3>
                        <p className={styles.postExcerpt}>{post.excerpt}</p>
                        <div className={styles.postMeta}>
                          <span>Created: {formatDate(post.created_at)}</span>
                          <span
                            className={
                              post.published
                                ? styles.publishedBadge
                                : styles.draftBadge
                            }
                          >
                            {post.published ? "Published" : "Draft"}
                          </span>
                        </div>
                      </div>
                      <div className={styles.postActions}>
                        <button
                          onClick={() => handleTogglePublish(post.id)}
                          className={
                            post.published
                              ? styles.unpublishButton
                              : styles.publishButton
                          }
                        >
                          {post.published ? "Unpublish" : "Publish"}
                        </button>
                        <button
                          onClick={() => handleDeletePost(post.id)}
                          className={styles.deleteButton}
                        >
                          Delete
                        </button>
                      </div>
                    </div>

                    {post.tags && post.tags.length > 0 && (
                      <div className={styles.tagsContainer}>
                        {post.tags.map((tag: string, index: number) => (
                          <span key={index} className={styles.tag}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

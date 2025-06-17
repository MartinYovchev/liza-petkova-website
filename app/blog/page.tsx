// app/blog/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { MdCalendarToday, MdFolder, MdImage } from "react-icons/md";
import { Post } from "../admin/types";
import styles from "./Blog.module.scss";

const BlogPage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch("/api/posts?published=true");
      const data = await response.json();
      setPosts(data.posts);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  const getFeaturedImage = (post: Post) => {
    const featured = post.images.find((img) => img.isFeatured);
    return featured ? featured.url : post.images[0]?.url;
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
          <p>Loading blog posts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.title}>Our Blog</h1>
          <p className={styles.subtitle}>
            Discover insights, stories, and updates from our team
          </p>
        </div>
      </header>

      <div className={styles.content}>
        <aside className={styles.sidebar}>
          <div className={styles.categoriesWidget}>
            <h3 className={styles.widgetTitle}>Categories</h3>
            <ul className={styles.categoriesList}>
              {posts.map((post) => (
                <li key={post.id} className={styles.categoryItem}>
                  <button
                    onClick={() => setSelectedCategory(post.category)}
                    className={`${styles.categoryButton} ${
                      selectedCategory === post.category ? styles.active : ""
                    }`}
                  >
                    <MdFolder className={styles.categoryIcon} />
                    {post.category === "all" ? "All Posts" : post.category}
                    <span className={styles.categoryCount}>
                      (
                      {post.category === "all"
                        ? posts.length
                        : posts.filter((p) => p.category === post.category)
                            .length}
                      )
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        <main className={styles.main}>
          {posts.length === 0 ? (
            <div className={styles.emptyState}>
              <MdImage className={styles.emptyIcon} />
              <h3>No posts found</h3>
              <p>
                {selectedCategory === "all"
                  ? "We haven't published any posts yet. Check back soon!"
                  : `No posts found in the ${selectedCategory} category.`}
              </p>
            </div>
          ) : (
            <div className={styles.postsGrid}>
              {posts.map((post) => (
                <article key={post.id} className={styles.postCard}>
                  <div className={styles.postImage}>
                    <img src={getFeaturedImage(post)} alt={post.title} />
                  </div>
                  <div className={styles.postContent}>
                    <div className={styles.postMeta}>
                      <span className={styles.postDate}>
                        <MdCalendarToday />
                        {new Date(post.createdAt).toLocaleDateString()}
                      </span>
                      <span className={styles.postCategory}>
                        <MdFolder />
                        {post.category}
                      </span>
                    </div>
                    <h2 className={styles.postTitle}>
                      <Link href={`/blog/${post.id}`}>{post.title}</Link>
                    </h2>
                    <p className={styles.postExcerpt}>{post.content}</p>
                    <Link href={`/blog/${post.id}`} className={styles.readMore}>
                      Read More
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default BlogPage;

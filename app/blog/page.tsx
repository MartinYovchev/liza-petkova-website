// app/blog/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  MdCalendarToday,
  MdFolder,
  MdImage,
  MdStar,
  MdAccessTime,
} from "react-icons/md";
import { Post } from "../admin/types";
import styles from "./Blog.module.scss";

const BlogPage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setError(null);
      const response = await fetch("/api/posts?published=true");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setPosts(data.posts || []);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setError("Failed to load blog posts. Please try again later.");
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  const getFeaturedImage = (post: Post) => {
    if (!post.images || post.images.length === 0) {
      return "/placeholder.jpg";
    }
    const featured = post.images.find((img) => img.isFeatured);
    return featured ? featured.url : post.images[0]?.url || "/placeholder.jpg";
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

  const getUniqueCategories = () => {
    const categories = [...new Set(posts.map((post) => post.category))];
    return categories;
  };

  const getFilteredPosts = () => {
    let filtered = posts;

    if (selectedCategory !== "all") {
      filtered = filtered.filter((post) => post.category === selectedCategory);
    }

    if (showFeaturedOnly) {
      filtered = filtered.filter((post) => post.featured);
    }

    return filtered;
  };

  const filteredPosts = getFilteredPosts();
  const uniqueCategories = getUniqueCategories();
  const featuredPosts = posts.filter((post) => post.featured);

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

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>
          <MdImage className={styles.errorIcon} />
          <h3>Oops! Something went wrong</h3>
          <p>{error}</p>
          <button onClick={fetchPosts} className={styles.retryButton}>
            Try Again
          </button>
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
          <div className={styles.filterWidget}>
            <h3 className={styles.widgetTitle}>Filters</h3>
            <div className={styles.filterGroup}>
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={showFeaturedOnly}
                  onChange={(e) => setShowFeaturedOnly(e.target.checked)}
                />
                <span className={styles.checkboxText}>
                  <MdStar /> Featured Posts Only
                </span>
              </label>
            </div>
          </div>

          <div className={styles.categoriesWidget}>
            <h3 className={styles.widgetTitle}>Categories</h3>
            <ul className={styles.categoriesList}>
              <li className={styles.categoryItem}>
                <button
                  onClick={() => setSelectedCategory("all")}
                  className={`${styles.categoryButton} ${
                    selectedCategory === "all" ? styles.active : ""
                  }`}
                >
                  <MdFolder className={styles.categoryIcon} />
                  All Posts
                  <span className={styles.categoryCount}>({posts.length})</span>
                </button>
              </li>
              {uniqueCategories.map((category) => (
                <li key={category} className={styles.categoryItem}>
                  <button
                    onClick={() => setSelectedCategory(category)}
                    className={`${styles.categoryButton} ${
                      selectedCategory === category ? styles.active : ""
                    }`}
                  >
                    <MdFolder className={styles.categoryIcon} />
                    {formatCategoryName(category)}
                    <span className={styles.categoryCount}>
                      ({posts.filter((p) => p.category === category).length})
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        <main className={styles.main}>
          {featuredPosts.length > 0 &&
            !showFeaturedOnly &&
            selectedCategory === "all" && (
              <section className={styles.featuredSection}>
                <h2 className={styles.sectionTitle}>
                  <MdStar /> Featured Posts
                </h2>
                <div className={styles.featuredGrid}>
                  {featuredPosts.slice(0, 3).map((post) => (
                    <article key={post.id} className={styles.featuredCard}>
                      <div className={styles.postImage}>
                        <img src={getFeaturedImage(post)} alt={post.title} />
                        <span className={styles.featuredBadge}>
                          <MdStar /> Featured
                        </span>
                      </div>
                      <div className={styles.postContent}>
                        <div className={styles.postMeta}>
                          <span className={styles.postDate}>
                            <MdCalendarToday />
                            {new Date(
                              post.publishedAt || post.createdAt
                            ).toLocaleDateString()}
                          </span>
                          <span className={styles.postCategory}>
                            <MdFolder />
                            {formatCategoryName(post.category)}
                          </span>
                          {post.readTime && (
                            <span className={styles.readTime}>
                              <MdAccessTime />
                              {post.readTime} min read
                            </span>
                          )}
                        </div>
                        <h3 className={styles.postTitle}>
                          <Link href={`/blog/${post.id}`}>{post.title}</Link>
                        </h3>
                        <p className={styles.postExcerpt}>
                          {post.excerpt ||
                            (post.content.length > 150
                              ? post.content.substring(0, 150) + "..."
                              : post.content)}
                        </p>
                        <Link
                          href={`/blog/${post.id}`}
                          className={styles.readMore}
                        >
                          Read More
                        </Link>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            )}

          <section className={styles.postsSection}>
            <h2 className={styles.sectionTitle}>
              {showFeaturedOnly
                ? "Featured Posts"
                : selectedCategory === "all"
                ? "All Posts"
                : `${formatCategoryName(selectedCategory)} Posts`}
            </h2>
            {filteredPosts.length === 0 ? (
              <div className={styles.emptyState}>
                <MdImage className={styles.emptyIcon} />
                <h3>No posts found</h3>
                <p>
                  {selectedCategory === "all" && !showFeaturedOnly
                    ? "We haven't published any posts yet. Check back soon!"
                    : showFeaturedOnly
                    ? "No featured posts found. Try removing the featured filter."
                    : `No posts found in the ${formatCategoryName(
                        selectedCategory
                      )} category.`}
                </p>
              </div>
            ) : (
              <div className={styles.postsGrid}>
                {filteredPosts.map((post) => (
                  <article key={post.id} className={styles.postCard}>
                    <div className={styles.postImage}>
                      <img src={getFeaturedImage(post)} alt={post.title} />
                      {post.featured && (
                        <span className={styles.featuredBadge}>
                          <MdStar /> Featured
                        </span>
                      )}
                    </div>
                    <div className={styles.postContent}>
                      <div className={styles.postMeta}>
                        <span className={styles.postDate}>
                          <MdCalendarToday />
                          {new Date(
                            post.publishedAt || post.createdAt
                          ).toLocaleDateString()}
                        </span>
                        <span className={styles.postCategory}>
                          <MdFolder />
                          {formatCategoryName(post.category)}
                        </span>
                        {post.readTime && (
                          <span className={styles.readTime}>
                            <MdAccessTime />
                            {post.readTime} min read
                          </span>
                        )}
                      </div>
                      <h2 className={styles.postTitle}>
                        <Link href={`/blog/${post.id}`}>{post.title}</Link>
                      </h2>
                      <p className={styles.postExcerpt}>
                        {post.excerpt ||
                          (post.content.length > 150
                            ? post.content.substring(0, 150) + "..."
                            : post.content)}
                      </p>
                      <div className={styles.postTags}>
                        {post.tags &&
                          post.tags.slice(0, 3).map((postTag) => (
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
                      </div>
                      <Link
                        href={`/blog/${post.id}`}
                        className={styles.readMore}
                      >
                        Read More
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        </main>
      </div>
    </div>
  );
};

export default BlogPage;

"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { MdCalendarToday, MdFolder, MdArrowBack } from "react-icons/md";
import Link from "next/link";
import { Post } from "../../admin/types";
import styles from "./BlogDetail.module.scss";

const BlogDetailPage: React.FC = () => {
  const params = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPost();
  }, [params.id]);

  const fetchPost = async () => {
    try {
      const response = await fetch(`/api/posts/${params.id}`);
      const data = await response.json();
      setPost(data.post);
    } catch (error) {
      console.error("Error fetching post:", error);
    } finally {
      setLoading(false);
    }
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

  if (!post) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>
          <h2>Post not found</h2>
          <p>The post you're looking for doesn't exist or has been removed.</p>
          <Link href="/blog" className={styles.backButton}>
            <MdArrowBack /> Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  const featuredImage =
    post.images.find((img) => img.isFeatured) || post.images[0];

  return (
    <div className={styles.container}>
      <article className={styles.post}>
        <header className={styles.header}>
          <Link href="/blog" className={styles.backButton}>
            <MdArrowBack /> Back to Blog
          </Link>
          <h1 className={styles.title}>{post.title}</h1>
          <div className={styles.meta}>
            <span className={styles.date}>
              <MdCalendarToday />
              {new Date(post.createdAt).toLocaleDateString()}
            </span>
            <span className={styles.category}>
              <MdFolder />
              {post.category}
            </span>
          </div>
        </header>

        {featuredImage && (
          <div className={styles.featuredImage}>
            <img src={featuredImage.url} alt={post.title} />
          </div>
        )}

        <div className={styles.content}>
          {post.content.split("\n").map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        {post.images.length > 1 && (
          <div className={styles.gallery}>
            <h2>Gallery</h2>
            <div className={styles.imageGrid}>
              {post.images.map((image) => (
                <div key={image.id} className={styles.imageWrapper}>
                  <img
                    src={image.url}
                    alt={`${post.title} - Image ${image.id}`}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  );
};

export default BlogDetailPage;

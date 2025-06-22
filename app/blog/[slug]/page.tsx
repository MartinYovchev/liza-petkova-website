'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { blogService } from '../../../lib/blogService';
import { getImageUrl } from '../../../lib/supabase';
import { BlogPost } from '../../../lib/types';
import BlogCard from '../../../components/BlogCard/BlogCard';
import styles from './BlogPost.module.scss';
import { Layout } from '@/components/Layout/Layout';

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    if (slug) {
      fetchPost();
    }
  }, [slug]);

  const fetchPost = async () => {
    try {
      setLoading(true);
      const data = await blogService.getPostBySlug(slug);
      setPost(data);

      // Increment view count
      await blogService.incrementViewCount(data.id);

      // Fetch related posts
      if (data.tags && data.tags.length > 0) {
        const related = await blogService.getPostsByTag(data.tags[0], 1, 3);
        setRelatedPosts(related.posts.filter(p => p.id !== data.id));
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatContent = (content: string) => {
    return content
      .split('\n')
      .map((paragraph, index) => {
        if (paragraph.trim() === '') return null;

        // Handle headings
        if (paragraph.startsWith('## ')) {
          return (
            <h2 key={index} className={styles.contentHeading}>
              {paragraph.slice(3)}
            </h2>
          );
        }
        if (paragraph.startsWith('### ')) {
          return (
            <h3 key={index} className={styles.contentSubheading}>
              {paragraph.slice(4)}
            </h3>
          );
        }

        // Handle code blocks
        if (paragraph.startsWith('```')) {
          return (
            <pre key={index} className={styles.codeBlock}>
              <code>{paragraph.slice(3)}</code>
            </pre>
          );
        }

        // Handle regular paragraphs
        return (
          <p key={index} className={styles.contentParagraph}>
            {paragraph}
          </p>
        );
      })
      .filter(Boolean);
  };

  if (loading) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner} />
        <p>Loading article...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.error}>
        <h2>Article Not Found</h2>
        <p>{error}</p>
        <Link href='/blog' className={styles.backLink}>
          ← Back to Blog
        </Link>
      </div>
    );
  }

  if (!post) {
    return (
      <div className={styles.error}>
        <h2>Article Not Found</h2>
        <p>The article you're looking for doesn't exist.</p>
        <Link href='/blog' className={styles.backLink}>
          ← Back to Blog
        </Link>
      </div>
    );
  }

  const images = post.images || [];
  const hasImages = images.length > 0;

  return (
    <Layout>
      <article className={styles.article}>
        <div className={styles.container}>
          <nav className={styles.breadcrumb}>
            <Link href='/blog' className={styles.breadcrumbLink}>
              <svg viewBox='0 0 24 24' fill='none' stroke='currentColor'>
                <polyline points='15,18 9,12 15,6' />
              </svg>
              Back to Blog
            </Link>
          </nav>

          <header className={styles.header}>
            <div className={styles.meta}>
              <time className={styles.date}>
                {formatDate(post.published_at || post.created_at)}
              </time>
              {post.reading_time && (
                <span className={styles.readingTime}>
                  {post.reading_time} min read
                </span>
              )}
              {post.view_count > 0 && (
                <span className={styles.views}>{post.view_count} views</span>
              )}
            </div>

            <h1 className={styles.title}>{post.title}</h1>

            {post.excerpt && <p className={styles.excerpt}>{post.excerpt}</p>}

            {post.tags && post.tags.length > 0 && (
              <div className={styles.tags}>
                {post.tags.map(tag => (
                  <Link
                    key={tag}
                    href={`/blog?tag=${encodeURIComponent(tag)}`}
                    className={styles.tag}
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            )}

            {post.author_name && (
              <div className={styles.author}>
                <span>By {post.author_name}</span>
              </div>
            )}
          </header>

          {hasImages && (
            <div className={styles.imageSection}>
              <div className={styles.mainImage}>
                <Image
                  src={
                    getImageUrl(images[selectedImageIndex]) ||
                    '/placeholder.svg'
                  }
                  alt={`${post.title} - Image ${selectedImageIndex + 1}`}
                  fill
                  className={styles.image}
                  sizes='(max-width: 768px) 100vw, 800px'
                  priority
                />
              </div>

              {images.length > 1 && (
                <div className={styles.thumbnails}>
                  {images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`${styles.thumbnail} ${
                        index === selectedImageIndex
                          ? styles.activeThumbnail
                          : ''
                      }`}
                    >
                      <Image
                        src={getImageUrl(image) || '/placeholder.svg'}
                        alt={`Thumbnail ${index + 1}`}
                        fill
                        className={styles.thumbnailImage}
                        sizes='80px'
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          <div className={styles.content}>{formatContent(post.content)}</div>

          {relatedPosts.length > 0 && (
            <section className={styles.relatedSection}>
              <h2 className={styles.relatedTitle}>Related Articles</h2>
              <div className={styles.relatedGrid}>
                {relatedPosts.map(relatedPost => (
                  <BlogCard key={relatedPost.id} post={relatedPost} />
                ))}
              </div>
            </section>
          )}
        </div>
      </article>
    </Layout>
  );
}

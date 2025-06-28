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
import { Loader } from '@/components/Loader/Loader';
import { FaChevronLeft } from 'react-icons/fa';
import { useTranslation } from '@/contexts/TranslationContext';

export default function BlogPostPage() {
  const { t } = useTranslation();
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
    return <Loader isLoading={loading} />;
  }

  if (error) {
    return (
      <div className={styles.error}>
        <h2>{t('blogPostNotFound')}</h2>
        <p>{error}</p>
        <Link href='/blog' className={styles.backLink}>
          {t('blogBackToBlog')}
        </Link>
      </div>
    );
  }

  if (!post) {
    return (
      <div className={styles.error}>
        <h2>{t('blogPostNotFound')}</h2>
        <p>{t('blogPostNotFoundMessage')}</p>
        <Link href='/blog' className={styles.backLink}>
          <FaChevronLeft className={styles.backIcon} size={16} />
          {t('blogBackToBlog')}
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
              <FaChevronLeft className={styles.backIcon} size={16} />
              {t('blogBackToBlog')}
            </Link>
          </nav>

          <header className={styles.header}>
            <div className={styles.meta}>
              <time className={styles.date}>
                {formatDate(post.published_at || post.created_at)}
              </time>
              {post.view_count > 0 && (
                <span className={styles.views}>
                  {post.view_count} {t('blogViews')}
                </span>
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
                <span>
                  {t('blogBy')} {post.author_name}
                </span>
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
              <h2 className={styles.relatedTitle}>{t('blogRelatedTitle')}</h2>
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

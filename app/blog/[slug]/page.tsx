'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { blogService } from '../../../lib/blogService';
import { getImageUrl } from '../../../lib/supabase';
import { BlogPost } from '../../../lib/types';
import BlogCard from '../../../components/BlogCard/BlogCard';
import styles from './BlogPost.module.scss';
import { Layout } from '@/components/Layout/Layout';
import { Loader } from '@/components/Loader/Loader';
import { FaChevronLeft } from 'react-icons/fa';
import { useTranslation } from '@/contexts/TranslationContext';
import Title from '@/components/Typography/Title';
import Text from '@/components/Typography/Text';
import { Button } from '@/components/Button/Button';
import Image from '@/components/Image/Image';
import { FadeIn } from '@/components/Animations/FadeIn/FadeIn';
import StaggerChildren from '@/components/Animations/StaggerChildren/StaggerChildren';
import { HoverScale } from '@/components/Animations/HoverScale/HoverScale';

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
            <Title key={index} level='h2' className={styles.contentHeading}>
              {paragraph.slice(3)}
            </Title>
          );
        }
        if (paragraph.startsWith('### ')) {
          return (
            <Title key={index} level='h3' className={styles.contentSubheading}>
              {paragraph.slice(4)}
            </Title>
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
          <Text key={index} className={styles.contentParagraph}>
            {paragraph}
          </Text>
        );
      })
      .filter(Boolean);
  };

  if (loading) {
    return <Loader isLoading={loading} />;
  }

  if (error) {
    return (
      <Layout>
        <div className={styles.error}>
          <Title level='h2'>{t('blogPostNotFound')}</Title>
          <Text>{error}</Text>
          <Button href='/blog' variant='secondary' className={styles.backLink}>
            {t('blogBackToBlog')}
          </Button>
        </div>
      </Layout>
    );
  }

  if (!post) {
    return (
      <Layout>
        <div className={styles.error}>
          <Title level='h2'>{t('blogPostNotFound')}</Title>
          <Text>{t('blogPostNotFoundMessage')}</Text>
          <Button href='/blog' variant='secondary' className={styles.backLink}>
            <FaChevronLeft className={styles.backIcon} size={16} />
            {t('blogBackToBlog')}
          </Button>
        </div>
      </Layout>
    );
  }

  const images = post.images || [];
  const hasImages = images.length > 0;

  return (
    <Layout>
      <article className={styles.article}>
        <div className={styles.container}>
          <FadeIn delay={0.2}>
            <nav className={styles.breadcrumb}>
              <Button
                href='/blog'
                variant='secondary'
                className={styles.breadcrumbLink}
              >
                <FaChevronLeft className={styles.backIcon} size={16} />
                {t('blogBackToBlog')}
              </Button>
            </nav>
          </FadeIn>

          <FadeIn delay={0.3}>
            <header className={styles.header}>
              <div className={styles.meta}>
                <Text className={styles.date}>
                  {formatDate(post.published_at || post.created_at)}
                </Text>
                {post.view_count > 0 && (
                  <Text className={styles.views}>
                    {post.view_count} {t('blogViews')}
                  </Text>
                )}
              </div>

              <Title level='h1' className={styles.title}>
                {post.title}
              </Title>

              {post.excerpt && (
                <Text className={styles.excerpt}>{post.excerpt}</Text>
              )}

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
                  <Text>
                    {t('blogBy')} {post.author_name}
                  </Text>
                </div>
              )}
            </header>
          </FadeIn>

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
                />
              </div>

              {images.length > 1 && (
                <StaggerChildren staggerDelay={0.1}>
                  <div className={styles.thumbnails}>
                    {images.map((image, index) => (
                      <HoverScale key={index} scale={1.1}>
                        <button
                          onClick={() => setSelectedImageIndex(index)}
                          className={`${styles.thumbnail} ${
                            index === selectedImageIndex
                              ? styles.activeThumbnail
                              : ''
                          }`}
                          aria-label={`View image ${index + 1}`}
                        >
                          <Image
                            src={getImageUrl(image) || '/placeholder.svg'}
                            alt={`Thumbnail ${index + 1}`}
                            fill
                            className={styles.thumbnailImage}
                            sizes='80px'
                          />
                        </button>
                      </HoverScale>
                    ))}
                  </div>
                </StaggerChildren>
              )}
            </div>
          )}

          <FadeIn delay={0.5}>
            <div className={styles.content}>{formatContent(post.content)}</div>
          </FadeIn>

          {relatedPosts.length > 0 && (
            <FadeIn delay={0.6}>
              <section className={styles.relatedSection}>
                <Title level='h2' className={styles.relatedTitle}>
                  {t('blogRelatedTitle')}
                </Title>
                <StaggerChildren staggerDelay={0.1}>
                  <div className={styles.relatedGrid}>
                    {relatedPosts.map(relatedPost => (
                      <HoverScale key={relatedPost.id} scale={1.03}>
                        <BlogCard post={relatedPost} />
                      </HoverScale>
                    ))}
                  </div>
                </StaggerChildren>
              </section>
            </FadeIn>
          )}
        </div>
      </article>
    </Layout>
  );
}

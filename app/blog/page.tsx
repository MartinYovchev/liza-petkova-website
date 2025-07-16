'use client';

import { useState, useEffect } from 'react';
import { blogService } from '../../lib/blogService';
import { BlogPost } from '../../lib/types';
import BlogCard from '../../components/BlogCard/BlogCard';
import Pagination from '../../components/Pagination/Pagination';
import styles from './BlogPage.module.scss';
import { Layout } from '@/components/Layout/Layout';
import { useTranslation } from '@/contexts/TranslationContext';
import Title from '@/components/Typography/Title';
import Text from '@/components/Typography/Text';
import { Button } from '@/components/Button/Button';
import { Loader } from '@/components/Loader/Loader';
import { FadeIn } from '@/components/Animations/FadeIn/FadeIn';
import StaggerChildren from '@/components/Animations/StaggerChildren/StaggerChildren';
import { HoverScale } from '@/components/Animations/HoverScale/HoverScale';

export default function BlogPage() {
  const { t } = useTranslation();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [featuredPosts, setFeaturedPosts] = useState<BlogPost[]>([]);
  const postsPerPage = parseInt(process.env.NEXT_PUBLIC_POSTS_PER_PAGE || '9');

  useEffect(() => {
    fetchPosts();
    fetchFeaturedPosts();
  }, [currentPage, searchQuery]);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      let result;

      if (searchQuery.trim()) {
        result = await blogService.searchPosts(
          searchQuery,
          currentPage,
          postsPerPage
        );
      } else {
        result = await blogService.getAllPosts(currentPage, postsPerPage);
      }

      setPosts(result.posts);
      setTotalCount(result.totalCount);
      setTotalPages(Math.ceil(result.totalCount / postsPerPage));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const fetchFeaturedPosts = async () => {
    try {
      const featured = await blogService.getFeaturedPosts(3);
      setFeaturedPosts(featured);
    } catch (err) {
      console.error('Error fetching featured posts:', err);
    }
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchPosts();
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const clearSearch = () => {
    setSearchQuery('');
    setCurrentPage(1);
  };

  return (
    <Layout>
      <div className={styles.page}>
        <div className={styles.container}>
          <FadeIn delay={0.2}>
            <header className={styles.header}>
              <div className={styles.headerContent}>
                <Title level='h1' className={styles.title}>
                  {t('blogPageTitle')}
                </Title>
                <Text className={styles.subtitle}>{t('blogPageSubtitle')}</Text>
              </div>

              <HoverScale scale={1.02}>
                <form onSubmit={handleSearch} className={styles.searchForm}>
                  <div className={styles.searchContainer}>
                    <input
                      type='text'
                      placeholder={t('blogSearchPlaceholder')}
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      className={styles.searchInput}
                      aria-label={t('blogSearchPlaceholder')}
                    />
                    <button
                      type='submit'
                      className={styles.searchButton}
                      aria-label='Search'
                    >
                      <svg
                        viewBox='0 0 24 24'
                        fill='none'
                        stroke='currentColor'
                      >
                        <circle cx='11' cy='11' r='8' />
                        <path d='m21 21-4.35-4.35' />
                      </svg>
                    </button>
                    {searchQuery && (
                      <button
                        type='button'
                        onClick={clearSearch}
                        className={styles.clearButton}
                        aria-label='Clear search'
                      >
                        <svg
                          viewBox='0 0 24 24'
                          fill='none'
                          stroke='currentColor'
                        >
                          <line x1='18' y1='6' x2='6' y2='18' />
                          <line x1='6' y1='6' x2='18' y2='18' />
                        </svg>
                      </button>
                    )}
                  </div>
                </form>
              </HoverScale>
            </header>
          </FadeIn>

          {/* Featured Posts Section */}
          {!searchQuery && featuredPosts.length > 0 && (
            <FadeIn delay={0.4}>
              <section className={styles.featuredSection}>
                <Title level='h2' className={styles.sectionTitle}>
                  {t('blogFeaturedTitle')}
                </Title>
                <StaggerChildren staggerDelay={0.1}>
                  <div className={styles.featuredGrid}>
                    {featuredPosts.map(post => (
                      <div key={post.id} className={styles.featuredCard}>
                        <HoverScale scale={1.03}>
                          <BlogCard post={post} />
                        </HoverScale>
                      </div>
                    ))}
                  </div>
                </StaggerChildren>
              </section>
            </FadeIn>
          )}

          {/* Main Content */}
          <FadeIn delay={0.6}>
            <section className={styles.mainSection}>
              {searchQuery && (
                <div className={styles.searchResults}>
                  <Title level='h2'>
                    {t('blogSearchResults')} "{searchQuery}"
                  </Title>
                  <Text>
                    {totalCount}{' '}
                    {totalCount !== 1
                      ? t('blogArticlesFound')
                      : t('blogArticleFound')}
                  </Text>
                </div>
              )}

              {loading && <Loader isLoading={loading} />}

              {error && (
                <div className={styles.error}>
                  <Title level='h2' className={styles.errorTitle}>
                    {t('blogErrorTitle')}
                  </Title>
                  <Text className={styles.errorMessage}>{error}</Text>
                  <Button
                    onClick={fetchPosts}
                    variant='primary'
                    className={styles.retryButton}
                  >
                    {t('blogTryAgain')}
                  </Button>
                </div>
              )}

              {!loading && !error && (
                <>
                  {posts.length === 0 ? (
                    <div className={styles.noPosts}>
                      <div className={styles.noPostsIcon}>📝</div>
                      <Title level='h2'>{t('blogNoArticlesTitle')}</Title>
                      <Text>
                        {searchQuery
                          ? `${t('blogNoArticlesSearch')} "${searchQuery}"`
                          : t('blogNoArticlesDefault')}
                      </Text>
                      {searchQuery && (
                        <Button
                          onClick={clearSearch}
                          variant='secondary'
                          className={styles.clearSearchButton}
                        >
                          {t('blogViewAllArticles')}
                        </Button>
                      )}
                    </div>
                  ) : (
                    <>
                      <StaggerChildren staggerDelay={0.1}>
                        <div className={styles.postsGrid}>
                          {posts.map(post => (
                            <HoverScale key={post.id} scale={1.02}>
                              <BlogCard post={post} />
                            </HoverScale>
                          ))}
                        </div>
                      </StaggerChildren>

                      <FadeIn delay={0.3}>
                        <Pagination
                          currentPage={currentPage}
                          totalPages={totalPages}
                          totalItems={totalCount}
                          itemsPerPage={postsPerPage}
                          onPageChange={handlePageChange}
                        />
                      </FadeIn>
                    </>
                  )}
                </>
              )}
            </section>
          </FadeIn>
        </div>
      </div>
    </Layout>
  );
}

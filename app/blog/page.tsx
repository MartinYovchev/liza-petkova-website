'use client';

import { useState, useEffect } from 'react';
import { blogService } from '../../lib/blogService';
import { BlogPost } from '../../lib/types';
import BlogCard from '../../components/BlogCard/BlogCard';
import Pagination from '../../components/Pagination/Pagination';
import styles from './BlogPage.module.scss';
import { Layout } from '@/components/Layout/Layout';

export default function BlogPage() {
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
          <header className={styles.header}>
            <div className={styles.headerContent}>
              <h1 className={styles.title}>Our Blog</h1>
              <p className={styles.subtitle}>
                Discover insights, tutorials, and stories from our team
              </p>
            </div>

            <form onSubmit={handleSearch} className={styles.searchForm}>
              <div className={styles.searchContainer}>
                <input
                  type='text'
                  placeholder='Search articles...'
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className={styles.searchInput}
                />
                <button type='submit' className={styles.searchButton}>
                  <svg viewBox='0 0 24 24' fill='none' stroke='currentColor'>
                    <circle cx='11' cy='11' r='8' />
                    <path d='m21 21-4.35-4.35' />
                  </svg>
                </button>
                {searchQuery && (
                  <button
                    type='button'
                    onClick={clearSearch}
                    className={styles.clearButton}
                  >
                    <svg viewBox='0 0 24 24' fill='none' stroke='currentColor'>
                      <line x1='18' y1='6' x2='6' y2='18' />
                      <line x1='6' y1='6' x2='18' y2='18' />
                    </svg>
                  </button>
                )}
              </div>
            </form>
          </header>

          {/* Featured Posts Section */}
          {!searchQuery && featuredPosts.length > 0 && (
            <section className={styles.featuredSection}>
              <h2 className={styles.sectionTitle}>Featured Articles</h2>
              <div className={styles.featuredGrid}>
                {featuredPosts.map(post => (
                  <div key={post.id} className={styles.featuredCard}>
                    <BlogCard post={post} />
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Main Content */}
          <section className={styles.mainSection}>
            {searchQuery && (
              <div className={styles.searchResults}>
                <h2>Search Results for "{searchQuery}"</h2>
                <p>
                  {totalCount} article{totalCount !== 1 ? 's' : ''} found
                </p>
              </div>
            )}

            {loading && (
              <div className={styles.loading}>
                <div className={styles.spinner} />
                <p>Loading articles...</p>
              </div>
            )}

            {error && (
              <div className={styles.error}>
                <h3>Oops! Something went wrong</h3>
                <p>{error}</p>
                <button onClick={fetchPosts} className={styles.retryButton}>
                  Try Again
                </button>
              </div>
            )}

            {!loading && !error && (
              <>
                {posts.length === 0 ? (
                  <div className={styles.noPosts}>
                    <div className={styles.noPostsIcon}>📝</div>
                    <h3>No articles found</h3>
                    <p>
                      {searchQuery
                        ? `No articles match your search for "${searchQuery}"`
                        : 'No articles have been published yet.'}
                    </p>
                    {searchQuery && (
                      <button
                        onClick={clearSearch}
                        className={styles.clearSearchButton}
                      >
                        View All Articles
                      </button>
                    )}
                  </div>
                ) : (
                  <>
                    <div className={styles.postsGrid}>
                      {posts.map(post => (
                        <BlogCard key={post.id} post={post} />
                      ))}
                    </div>

                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      totalItems={totalCount}
                      itemsPerPage={postsPerPage}
                      onPageChange={handlePageChange}
                    />
                  </>
                )}
              </>
            )}
          </section>
        </div>
      </div>
    </Layout>
  );
}

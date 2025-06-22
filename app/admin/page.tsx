'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { blogService } from '../../lib/blogService';
import { BlogPost, BlogStats } from '../../lib/types';
import BlogPostForm from '../../components/BlogPostForm/BlogPostForm';
import Pagination from '../../components/Pagination/Pagination';
import styles from './AdminPage.module.scss';

export default function AdminDashboard() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [stats, setStats] = useState<BlogStats>({
    total: 0,
    published: 0,
    drafts: 0,
    archived: 0,
  });
  const postsPerPage = 10;

  useEffect(() => {
    fetchPosts();
  }, [currentPage]);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const result = await blogService.getAllPostsAdmin(
        currentPage,
        postsPerPage
      );
      setPosts(result.posts);
      setTotalCount(result.totalCount);
      setTotalPages(Math.ceil(result.totalCount / postsPerPage));

      // Calculate stats
      const published = result.posts.filter(
        p => p.status === 'published'
      ).length;
      const drafts = result.posts.filter(p => p.status === 'draft').length;
      const archived = result.posts.filter(p => p.status === 'archived').length;

      setStats({
        total: result.totalCount,
        published,
        drafts,
        archived,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (
      confirm(
        'Are you sure you want to delete this post? This action cannot be undone.'
      )
    ) {
      try {
        await blogService.deletePost(id);
        setPosts(posts.filter(post => post.id !== id));
        setTotalCount(prev => prev - 1);
      } catch (err) {
        alert(
          'Error deleting post: ' +
            (err instanceof Error ? err.message : 'Unknown error')
        );
      }
    }
  };

  const handleStatusToggle = async (post: BlogPost) => {
    try {
      const newStatus = post.status === 'published' ? 'draft' : 'published';
      const updatedPost = await blogService.updatePost(post.id, {
        status: newStatus,
      });
      setPosts(posts.map(p => (p.id === post.id ? updatedPost : p)));
    } catch (err) {
      alert(
        'Error updating post status: ' +
          (err instanceof Error ? err.message : 'Unknown error')
      );
    }
  };

  const handleSave = (savedPost: BlogPost) => {
    if (editingPost) {
      setPosts(
        posts.map(post => (post.id === savedPost.id ? savedPost : post))
      );
    } else {
      setPosts([savedPost, ...posts]);
      setTotalCount(prev => prev + 1);
    }
    setShowForm(false);
    setEditingPost(null);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingPost(null);
  };

  const handleEdit = (post: BlogPost) => {
    setEditingPost(post);
    setShowForm(true);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (loading && posts.length === 0) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner} />
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {!showForm ? (
          <>
            <header className={styles.header}>
              <div className={styles.headerContent}>
                <h1 className={styles.title}>Blog Administration</h1>
                <p className={styles.subtitle}>
                  Manage your blog posts and content
                </p>
              </div>
              <div className={styles.headerActions}>
                <button
                  onClick={() => setShowForm(true)}
                  className={styles.createButton}
                >
                  <svg viewBox='0 0 24 24' fill='none' stroke='currentColor'>
                    <line x1='12' y1='5' x2='12' y2='19' />
                    <line x1='5' y1='12' x2='19' y2='12' />
                  </svg>
                  Create New Post
                </button>
                <Link href='/blog' className={styles.viewBlogButton}>
                  <svg viewBox='0 0 24 24' fill='none' stroke='currentColor'>
                    <path d='M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z' />
                    <circle cx='12' cy='12' r='3' />
                  </svg>
                  View Blog
                </Link>
              </div>
            </header>

            {error && (
              <div className={styles.error}>
                <h3>Error Loading Posts</h3>
                <p>{error}</p>
                <button onClick={fetchPosts} className={styles.retryButton}>
                  Try Again
                </button>
              </div>
            )}

            <div className={styles.statsGrid}>
              <div className={styles.statCard}>
                <div className={styles.statIcon}>📝</div>
                <div className={styles.statContent}>
                  <h3>Total Posts</h3>
                  <p>{stats.total}</p>
                </div>
              </div>
              <div className={styles.statCard}>
                <div className={styles.statIcon}>✅</div>
                <div className={styles.statContent}>
                  <h3>Published</h3>
                  <p>{stats.published}</p>
                </div>
              </div>
              <div className={styles.statCard}>
                <div className={styles.statIcon}>📄</div>
                <div className={styles.statContent}>
                  <h3>Drafts</h3>
                  <p>{stats.drafts}</p>
                </div>
              </div>
              <div className={styles.statCard}>
                <div className={styles.statIcon}>📦</div>
                <div className={styles.statContent}>
                  <h3>Archived</h3>
                  <p>{stats.archived}</p>
                </div>
              </div>
            </div>

            <div className={styles.tableContainer}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Post</th>
                    <th>Status</th>
                    <th>Images</th>
                    <th>Views</th>
                    <th>Created</th>
                    <th>Updated</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {posts.map(post => (
                    <tr key={post.id}>
                      <td>
                        <div className={styles.postInfo}>
                          <h4 className={styles.postTitle}>{post.title}</h4>
                          {post.excerpt && (
                            <p className={styles.postExcerpt}>
                              {post.excerpt.substring(0, 100)}...
                            </p>
                          )}
                          {post.tags && post.tags.length > 0 && (
                            <div className={styles.postTags}>
                              {post.tags.slice(0, 3).map(tag => (
                                <span key={tag} className={styles.postTag}>
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </td>
                      <td>
                        <button
                          onClick={() => handleStatusToggle(post)}
                          className={`${styles.statusBadge} ${
                            styles[post.status]
                          }`}
                        >
                          {post.status}
                        </button>
                      </td>
                      <td>
                        <span className={styles.imageCount}>
                          {post.images?.length || 0}
                        </span>
                      </td>
                      <td>
                        <span className={styles.viewCount}>
                          {post.view_count || 0}
                        </span>
                      </td>
                      <td>{formatDate(post.created_at)}</td>
                      <td>{formatDate(post.updated_at)}</td>
                      <td>
                        <div className={styles.actionButtons}>
                          <Link
                            href={`/blog/${post.slug}`}
                            className={styles.viewButton}
                            target='_blank'
                            title='View post'
                          >
                            <svg
                              viewBox='0 0 24 24'
                              fill='none'
                              stroke='currentColor'
                            >
                              <path d='M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z' />
                              <circle cx='12' cy='12' r='3' />
                            </svg>
                          </Link>
                          <button
                            onClick={() => handleEdit(post)}
                            className={styles.editButton}
                            title='Edit post'
                          >
                            <svg
                              viewBox='0 0 24 24'
                              fill='none'
                              stroke='currentColor'
                            >
                              <path d='M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7' />
                              <path d='M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z' />
                            </svg>
                          </button>
                          <button
                            onClick={() => handleDelete(post.id)}
                            className={styles.deleteButton}
                            title='Delete post'
                          >
                            <svg
                              viewBox='0 0 24 24'
                              fill='none'
                              stroke='currentColor'
                            >
                              <polyline points='3,6 5,6 21,6' />
                              <path d='M19,6v14a2,2,0,0,1-2,2H7a2,2,0,0,1-2-2V6m3,0V4a2,2,0,0,1,2-2h4a2,2,0,0,1,2,2V6' />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={totalCount}
              itemsPerPage={postsPerPage}
              onPageChange={handlePageChange}
            />
          </>
        ) : (
          <BlogPostForm
            post={editingPost}
            onSave={handleSave}
            onCancel={handleCancel}
          />
        )}
      </div>
    </div>
  );
}

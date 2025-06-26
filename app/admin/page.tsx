'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FiPlus, FiEye, FiEdit3, FiTrash2, FiRefreshCw } from 'react-icons/fi';
import {
  HiOutlineDocumentText,
  HiOutlineCheckCircle,
  HiOutlineDocument,
  HiOutlineArchive,
} from 'react-icons/hi';
import { blogService } from '../../lib/blogService';
import { BlogPost, BlogStats } from '../../lib/types';
import BlogPostForm from '../../components/BlogPostForm/BlogPostForm';
import Pagination from '../../components/Pagination/Pagination';
import styles from './AdminPage.module.scss';

// Add these imports for art projects
import {
  artProjectService,
  ArtProject,
  ArtProjectStats,
} from '@/lib/artService';
import ArtProjectForm from '@/components/ArtProjectForm/ArtProjectForm';
import { AccountLayout } from '@/components/Account/AccountLayout';

export default function AdminDashboard() {
  // Existing blog state
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

  // New art project state
  const [activeTab, setActiveTab] = useState<'blog' | 'art'>('blog');
  const [artProjects, setArtProjects] = useState<ArtProject[]>([]);
  const [editingProject, setEditingProject] = useState<ArtProject | null>(null);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [artStats, setArtStats] = useState<ArtProjectStats>({
    total: 0,
    planning: 0,
    in_progress: 0,
    completed: 0,
    on_hold: 0,
  });

  const postsPerPage = 10;

  useEffect(() => {
    if (activeTab === 'blog') {
      fetchPosts();
    } else {
      fetchArtProjects();
    }
  }, [currentPage, activeTab]);

  // Existing blog functions
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

  // New art project functions
  const fetchArtProjects = async () => {
    try {
      setLoading(true);
      const result = await artProjectService.getAllProjects(
        currentPage,
        postsPerPage
      );
      setArtProjects(result.projects);
      setTotalCount(result.totalCount);
      setTotalPages(Math.ceil(result.totalCount / postsPerPage));

      const statsResult = await artProjectService.getStats();
      setArtStats(statsResult);
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

  const handleDeleteProject = async (id: string) => {
    if (
      confirm(
        'Are you sure you want to delete this project? This action cannot be undone.'
      )
    ) {
      try {
        await artProjectService.deleteProject(id);
        setArtProjects(artProjects.filter(project => project.id !== id));
        setTotalCount(prev => prev - 1);
      } catch (err) {
        alert(
          'Error deleting project: ' +
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

  const handleSaveProject = (savedProject: ArtProject) => {
    if (editingProject) {
      setArtProjects(
        artProjects.map(project =>
          project.id === savedProject.id ? savedProject : project
        )
      );
    } else {
      setArtProjects([savedProject, ...artProjects]);
      setTotalCount(prev => prev + 1);
    }
    setShowProjectForm(false);
    setEditingProject(null);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingPost(null);
    setShowProjectForm(false);
    setEditingProject(null);
  };

  const handleEdit = (post: BlogPost) => {
    setEditingPost(post);
    setShowForm(true);
  };

  const handleEditProject = (project: ArtProject) => {
    setEditingProject(project);
    setShowProjectForm(true);
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

  if (loading && posts.length === 0 && artProjects.length === 0) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner} />
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <AccountLayout>
      <div className={styles.page}>
        <div className={styles.container}>
          {!showForm && !showProjectForm ? (
            <>
              <header className={styles.header}>
                <div className={styles.headerContent}>
                  <h1 className={styles.title}>
                    {activeTab === 'blog'
                      ? 'Blog Administration'
                      : 'Art Project Administration'}
                  </h1>
                  <p className={styles.subtitle}>
                    {activeTab === 'blog'
                      ? 'Manage your blog posts and content'
                      : 'Manage your art projects and creative works'}
                  </p>
                </div>
                <div className={styles.headerActions}>
                  <button
                    onClick={() =>
                      activeTab === 'blog'
                        ? setShowForm(true)
                        : setShowProjectForm(true)
                    }
                    className={styles.createButton}
                  >
                    <FiPlus />
                    {activeTab === 'blog'
                      ? 'Create New Post'
                      : 'Create New Project'}
                  </button>
                  <Link
                    href={activeTab === 'blog' ? '/blog' : '/progress'}
                    className={styles.viewBlogButton}
                  >
                    <FiEye />
                    {activeTab === 'blog' ? 'View Blog' : 'View Progress'}
                  </Link>
                </div>
              </header>

              {/* Tab Navigation */}
              <div
                style={{
                  display: 'flex',
                  gap: '10px',
                  marginBottom: '20px',
                  borderBottom: '1px solid #ccc',
                }}
              >
                <button
                  onClick={() => {
                    setActiveTab('blog');
                    setCurrentPage(1);
                  }}
                  style={{
                    padding: '10px 20px',
                    border: 'none',
                    borderBottom:
                      activeTab === 'blog'
                        ? '2px solid #007bff'
                        : '2px solid transparent',
                    background: 'transparent',
                    color: activeTab === 'blog' ? '#007bff' : '#666',
                    cursor: 'pointer',
                    fontWeight: activeTab === 'blog' ? 'bold' : 'normal',
                  }}
                >
                  Blog Posts
                </button>
                <button
                  onClick={() => {
                    setActiveTab('art');
                    setCurrentPage(1);
                  }}
                  style={{
                    padding: '10px 20px',
                    border: 'none',
                    borderBottom:
                      activeTab === 'art'
                        ? '2px solid #007bff'
                        : '2px solid transparent',
                    background: 'transparent',
                    color: activeTab === 'art' ? '#007bff' : '#666',
                    cursor: 'pointer',
                    fontWeight: activeTab === 'art' ? 'bold' : 'normal',
                  }}
                >
                  Art Projects
                </button>
              </div>

              {error && (
                <div className={styles.error}>
                  <h3>
                    Error Loading {activeTab === 'blog' ? 'Posts' : 'Projects'}
                  </h3>
                  <p>{error}</p>
                  <button
                    onClick={
                      activeTab === 'blog' ? fetchPosts : fetchArtProjects
                    }
                    className={styles.retryButton}
                  >
                    <FiRefreshCw />
                    Try Again
                  </button>
                </div>
              )}

              {/* Stats Grid */}
              <div className={styles.statsGrid}>
                {activeTab === 'blog' ? (
                  <>
                    <div className={styles.statCard}>
                      <div className={styles.statIcon}>
                        <HiOutlineDocumentText />
                      </div>
                      <div className={styles.statContent}>
                        <h3>Total Posts</h3>
                        <p>{stats.total}</p>
                      </div>
                    </div>
                    <div className={styles.statCard}>
                      <div className={styles.statIcon}>
                        <HiOutlineCheckCircle />
                      </div>
                      <div className={styles.statContent}>
                        <h3>Published</h3>
                        <p>{stats.published}</p>
                      </div>
                    </div>
                    <div className={styles.statCard}>
                      <div className={styles.statIcon}>
                        <HiOutlineDocument />
                      </div>
                      <div className={styles.statContent}>
                        <h3>Drafts</h3>
                        <p>{stats.drafts}</p>
                      </div>
                    </div>
                    <div className={styles.statCard}>
                      <div className={styles.statIcon}>
                        <HiOutlineArchive />
                      </div>
                      <div className={styles.statContent}>
                        <h3>Archived</h3>
                        <p>{stats.archived}</p>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className={styles.statCard}>
                      <div className={styles.statIcon}>
                        <HiOutlineDocumentText />
                      </div>
                      <div className={styles.statContent}>
                        <h3>Total Projects</h3>
                        <p>{artStats.total}</p>
                      </div>
                    </div>
                    <div className={styles.statCard}>
                      <div className={styles.statIcon}>
                        <HiOutlineCheckCircle />
                      </div>
                      <div className={styles.statContent}>
                        <h3>Completed</h3>
                        <p>{artStats.completed}</p>
                      </div>
                    </div>
                    <div className={styles.statCard}>
                      <div className={styles.statIcon}>
                        <HiOutlineDocument />
                      </div>
                      <div className={styles.statContent}>
                        <h3>In Progress</h3>
                        <p>{artStats.in_progress}</p>
                      </div>
                    </div>
                    <div className={styles.statCard}>
                      <div className={styles.statIcon}>
                        <HiOutlineArchive />
                      </div>
                      <div className={styles.statContent}>
                        <h3>Planning</h3>
                        <p>{artStats.planning}</p>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Content Table */}
              <div className={styles.tableContainer}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      {activeTab === 'blog' ? (
                        <>
                          <th>Post</th>
                          <th>Status</th>
                          <th>Images</th>
                          <th>Views</th>
                          <th>Created</th>
                          <th>Updated</th>
                          <th>Actions</th>
                        </>
                      ) : (
                        <>
                          <th>Project</th>
                          <th>Status</th>
                          <th>Progress</th>
                          <th>Images</th>
                          <th>Created</th>
                          <th>Updated</th>
                          <th>Actions</th>
                        </>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {activeTab === 'blog'
                      ? posts.map(post => (
                          <tr key={post.id}>
                            <td>
                              <div className={styles.postInfo}>
                                <h4 className={styles.postTitle}>
                                  {post.title}
                                </h4>
                                {post.excerpt && (
                                  <p className={styles.postExcerpt}>
                                    {post.excerpt.substring(0, 100)}...
                                  </p>
                                )}
                                {post.tags && post.tags.length > 0 && (
                                  <div className={styles.postTags}>
                                    {post.tags.slice(0, 3).map(tag => (
                                      <span
                                        key={tag}
                                        className={styles.postTag}
                                      >
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
                                  <FiEye />
                                </Link>
                                <button
                                  onClick={() => handleEdit(post)}
                                  className={styles.editButton}
                                  title='Edit post'
                                >
                                  <FiEdit3 />
                                </button>
                                <button
                                  onClick={() => handleDelete(post.id)}
                                  className={styles.deleteButton}
                                  title='Delete post'
                                >
                                  <FiTrash2 />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      : artProjects.map(project => (
                          <tr key={project.id}>
                            <td>
                              <div className={styles.postInfo}>
                                <h4 className={styles.postTitle}>
                                  {project.title}
                                </h4>
                                {project.description && (
                                  <p className={styles.postExcerpt}>
                                    {project.description.substring(0, 100)}...
                                  </p>
                                )}
                              </div>
                            </td>
                            <td>
                              <span
                                className={`${styles.statusBadge} ${styles[project.status.replace('_', '')]}`}
                              >
                                {project.status.replace('_', ' ')}
                              </span>
                            </td>
                            <td>
                              <span className={styles.percentage}>
                                {project.completion}%
                              </span>
                            </td>
                            <td>
                              <span className={styles.imageCount}>
                                {project.images?.length || 0}
                              </span>
                            </td>
                            <td>{formatDate(project.created_at)}</td>
                            <td>{formatDate(project.updated_at)}</td>
                            <td>
                              <div className={styles.actionButtons}>
                                <Link
                                  href='/artistic/progress'
                                  className={styles.viewButton}
                                  target='_blank'
                                  title='View progress'
                                >
                                  <FiEye />
                                </Link>
                                <button
                                  onClick={() => handleEditProject(project)}
                                  className={styles.editButton}
                                  title='Edit project'
                                >
                                  <FiEdit3 />
                                </button>
                                <button
                                  onClick={() =>
                                    handleDeleteProject(project.id)
                                  }
                                  className={styles.deleteButton}
                                  title='Delete project'
                                >
                                  <FiTrash2 />
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
          ) : activeTab === 'blog' ? (
            <BlogPostForm
              post={editingPost}
              onSave={handleSave}
              onCancel={handleCancel}
            />
          ) : (
            <ArtProjectForm
              project={editingProject}
              onSave={handleSaveProject}
              onCancel={handleCancel}
            />
          )}
        </div>
      </div>
    </AccountLayout>
  );
}

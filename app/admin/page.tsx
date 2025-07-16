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
import Title from '@/components/Typography/Title';
import Text from '@/components/Typography/Text';
import { Button } from '@/components/Button/Button';
import { Loader } from '@/components/Loader/Loader';
import { FadeIn } from '@/components/Animations/FadeIn/FadeIn';
import StaggerChildren from '@/components/Animations/StaggerChildren/StaggerChildren';
import { HoverScale } from '@/components/Animations/HoverScale/HoverScale';

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
    return <Loader isLoading={loading} />;
  }

  return (
    <AccountLayout>
      <div className={styles.page}>
        <div className={styles.container}>
          {!showForm && !showProjectForm ? (
            <>
              <FadeIn delay={0.2}>
                <header className={styles.header}>
                  <div className={styles.headerContent}>
                    <Title level='h1' className={styles.title}>
                      {activeTab === 'blog'
                        ? 'Blog Administration'
                        : 'Art Project Administration'}
                    </Title>
                    <Text className={styles.subtitle}>
                      {activeTab === 'blog'
                        ? 'Manage your blog posts and content'
                        : 'Manage your art projects and creative works'}
                    </Text>
                  </div>
                  <div className={styles.headerActions}>
                    <HoverScale scale={1.05}>
                      <Button
                        onClick={() =>
                          activeTab === 'blog'
                            ? setShowForm(true)
                            : setShowProjectForm(true)
                        }
                        variant='primary'
                        className={styles.createButton}
                      >
                        <FiPlus />
                        {activeTab === 'blog'
                          ? 'Create New Post'
                          : 'Create New Project'}
                      </Button>
                    </HoverScale>
                    <HoverScale scale={1.05}>
                      <Button
                        href={activeTab === 'blog' ? '/blog' : '/progress'}
                        variant='secondary'
                        className={styles.viewBlogButton}
                      >
                        <FiEye />
                        {activeTab === 'blog' ? 'View Blog' : 'View Progress'}
                      </Button>
                    </HoverScale>
                  </div>
                </header>
              </FadeIn>

              {/* Tab Navigation */}
              <FadeIn delay={0.3}>
                <div
                  style={{
                    display: 'flex',
                    gap: '10px',
                    marginBottom: '20px',
                    borderBottom: '1px solid #ccc',
                  }}
                >
                  <HoverScale scale={1.02}>
                    <Button
                      onClick={() => {
                        setActiveTab('blog');
                        setCurrentPage(1);
                      }}
                      variant='outline'
                      style={{
                        padding: '10px 20px',
                        border: 'none',
                        borderBottom:
                          activeTab === 'blog'
                            ? '2px solid #007bff'
                            : '2px solid transparent',
                        background: 'transparent',
                        color: activeTab === 'blog' ? '#007bff' : '#666',
                        fontWeight: activeTab === 'blog' ? 'bold' : 'normal',
                      }}
                    >
                      Blog Posts
                    </Button>
                  </HoverScale>
                  <HoverScale scale={1.02}>
                    <Button
                      onClick={() => {
                        setActiveTab('art');
                        setCurrentPage(1);
                      }}
                      variant='outline'
                      style={{
                        padding: '10px 20px',
                        border: 'none',
                        borderBottom:
                          activeTab === 'art'
                            ? '2px solid #007bff'
                            : '2px solid transparent',
                        background: 'transparent',
                        color: activeTab === 'art' ? '#007bff' : '#666',
                        fontWeight: activeTab === 'art' ? 'bold' : 'normal',
                      }}
                    >
                      Art Projects
                    </Button>
                  </HoverScale>
                </div>
              </FadeIn>

              {error && (
                <FadeIn delay={0.4}>
                  <div className={styles.error}>
                    <Title level='h2'>
                      Error Loading{' '}
                      {activeTab === 'blog' ? 'Posts' : 'Projects'}
                    </Title>
                    <Text>{error}</Text>
                    <Button
                      onClick={
                        activeTab === 'blog' ? fetchPosts : fetchArtProjects
                      }
                      variant='primary'
                      className={styles.retryButton}
                    >
                      <FiRefreshCw />
                      Try Again
                    </Button>
                  </div>
                </FadeIn>
              )}

              {/* Stats Grid */}
              <FadeIn delay={0.5}>
                <StaggerChildren staggerDelay={0.1}>
                  <div className={styles.statsGrid}>
                    {activeTab === 'blog' ? (
                      <>
                        <HoverScale scale={1.03}>
                          <div className={styles.statCard}>
                            <div className={styles.statIcon}>
                              <HiOutlineDocumentText />
                            </div>
                            <div className={styles.statContent}>
                              <Title level='h3'>Total Posts</Title>
                              <Text>{stats.total}</Text>
                            </div>
                          </div>
                        </HoverScale>
                        <HoverScale scale={1.03}>
                          <div className={styles.statCard}>
                            <div className={styles.statIcon}>
                              <HiOutlineCheckCircle />
                            </div>
                            <div className={styles.statContent}>
                              <Title level='h3'>Published</Title>
                              <Text>{stats.published}</Text>
                            </div>
                          </div>
                        </HoverScale>
                        <HoverScale scale={1.03}>
                          <div className={styles.statCard}>
                            <div className={styles.statIcon}>
                              <HiOutlineDocument />
                            </div>
                            <div className={styles.statContent}>
                              <Title level='h3'>Drafts</Title>
                              <Text>{stats.drafts}</Text>
                            </div>
                          </div>
                        </HoverScale>
                        <HoverScale scale={1.03}>
                          <div className={styles.statCard}>
                            <div className={styles.statIcon}>
                              <HiOutlineArchive />
                            </div>
                            <div className={styles.statContent}>
                              <Title level='h3'>Archived</Title>
                              <Text>{stats.archived}</Text>
                            </div>
                          </div>
                        </HoverScale>
                      </>
                    ) : (
                      <>
                        <HoverScale scale={1.03}>
                          <div className={styles.statCard}>
                            <div className={styles.statIcon}>
                              <HiOutlineDocumentText />
                            </div>
                            <div className={styles.statContent}>
                              <Title level='h3'>Total Projects</Title>
                              <Text>{artStats.total}</Text>
                            </div>
                          </div>
                        </HoverScale>
                        <HoverScale scale={1.03}>
                          <div className={styles.statCard}>
                            <div className={styles.statIcon}>
                              <HiOutlineCheckCircle />
                            </div>
                            <div className={styles.statContent}>
                              <Title level='h3'>Completed</Title>
                              <Text>{artStats.completed}</Text>
                            </div>
                          </div>
                        </HoverScale>
                        <HoverScale scale={1.03}>
                          <div className={styles.statCard}>
                            <div className={styles.statIcon}>
                              <HiOutlineDocument />
                            </div>
                            <div className={styles.statContent}>
                              <Title level='h3'>In Progress</Title>
                              <Text>{artStats.in_progress}</Text>
                            </div>
                          </div>
                        </HoverScale>
                        <HoverScale scale={1.03}>
                          <div className={styles.statCard}>
                            <div className={styles.statIcon}>
                              <HiOutlineArchive />
                            </div>
                            <div className={styles.statContent}>
                              <Title level='h3'>Planning</Title>
                              <Text>{artStats.planning}</Text>
                            </div>
                          </div>
                        </HoverScale>
                      </>
                    )}
                  </div>
                </StaggerChildren>
              </FadeIn>

              {/* Content Table */}
              <FadeIn delay={0.6}>
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
                                  <Title
                                    level='h4'
                                    className={styles.postTitle}
                                  >
                                    {post.title}
                                  </Title>
                                  {post.excerpt && (
                                    <Text className={styles.postExcerpt}>
                                      {post.excerpt.substring(0, 100)}...
                                    </Text>
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
                                <HoverScale scale={1.05}>
                                  <Button
                                    onClick={() => handleStatusToggle(post)}
                                    variant='outline'
                                    size='small'
                                    className={`${styles.statusBadge} ${
                                      styles[post.status]
                                    }`}
                                  >
                                    {post.status}
                                  </Button>
                                </HoverScale>
                              </td>
                              <td>
                                <Text className={styles.imageCount}>
                                  {post.images?.length || 0}
                                </Text>
                              </td>
                              <td>
                                <Text className={styles.viewCount}>
                                  {post.view_count || 0}
                                </Text>
                              </td>
                              <td>
                                <Text>{formatDate(post.created_at)}</Text>
                              </td>
                              <td>
                                <Text>{formatDate(post.updated_at)}</Text>
                              </td>
                              <td>
                                <div className={styles.actionButtons}>
                                  <HoverScale scale={1.1}>
                                    <Button
                                      href={`/blog/${post.slug}`}
                                      variant='outline'
                                      size='small'
                                      className={styles.viewButton}
                                      target='_blank'
                                    >
                                      <FiEye />
                                    </Button>
                                  </HoverScale>
                                  <HoverScale scale={1.1}>
                                    <Button
                                      onClick={() => handleEdit(post)}
                                      variant='outline'
                                      size='small'
                                      className={styles.editButton}
                                      title='Edit post'
                                    >
                                      <FiEdit3 />
                                    </Button>
                                  </HoverScale>
                                  <HoverScale scale={1.1}>
                                    <Button
                                      onClick={() => handleDelete(post.id)}
                                      variant='outline'
                                      size='small'
                                      className={styles.deleteButton}
                                      title='Delete post'
                                    >
                                      <FiTrash2 />
                                    </Button>
                                  </HoverScale>
                                </div>
                              </td>
                            </tr>
                          ))
                        : artProjects.map(project => (
                            <tr key={project.id}>
                              <td>
                                <div className={styles.postInfo}>
                                  <Title
                                    level='h4'
                                    className={styles.postTitle}
                                  >
                                    {project.title}
                                  </Title>
                                  {project.description && (
                                    <Text className={styles.postExcerpt}>
                                      {project.description.substring(0, 100)}...
                                    </Text>
                                  )}
                                </div>
                              </td>
                              <td>
                                <Text
                                  className={`${styles.statusBadge} ${styles[project.status.replace('_', '')]}`}
                                >
                                  {project.status.replace('_', ' ')}
                                </Text>
                              </td>
                              <td>
                                <Text className={styles.percentage}>
                                  {project.completion}%
                                </Text>
                              </td>
                              <td>
                                <Text className={styles.imageCount}>
                                  {project.images?.length || 0}
                                </Text>
                              </td>
                              <td>
                                <Text>{formatDate(project.created_at)}</Text>
                              </td>
                              <td>
                                <Text>{formatDate(project.updated_at)}</Text>
                              </td>
                              <td>
                                <div className={styles.actionButtons}>
                                  <HoverScale scale={1.1}>
                                    <Button
                                      href='/artistic/progress'
                                      variant='outline'
                                      size='small'
                                      className={styles.viewButton}
                                      target='_blank'
                                    >
                                      <FiEye />
                                    </Button>
                                  </HoverScale>
                                  <HoverScale scale={1.1}>
                                    <Button
                                      onClick={() => handleEditProject(project)}
                                      variant='outline'
                                      size='small'
                                      className={styles.editButton}
                                      title='Edit project'
                                    >
                                      <FiEdit3 />
                                    </Button>
                                  </HoverScale>
                                  <HoverScale scale={1.1}>
                                    <Button
                                      onClick={() =>
                                        handleDeleteProject(project.id)
                                      }
                                      variant='outline'
                                      size='small'
                                      className={styles.deleteButton}
                                      title='Delete project'
                                    >
                                      <FiTrash2 />
                                    </Button>
                                  </HoverScale>
                                </div>
                              </td>
                            </tr>
                          ))}
                    </tbody>
                  </table>
                </div>
              </FadeIn>

              <FadeIn delay={0.7}>
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  totalItems={totalCount}
                  itemsPerPage={postsPerPage}
                  onPageChange={handlePageChange}
                />
              </FadeIn>
            </>
          ) : activeTab === 'blog' ? (
            <FadeIn>
              <BlogPostForm
                post={editingPost}
                onSave={handleSave}
                onCancel={handleCancel}
              />
            </FadeIn>
          ) : (
            <FadeIn>
              <ArtProjectForm
                project={editingProject}
                onSave={handleSaveProject}
                onCancel={handleCancel}
              />
            </FadeIn>
          )}
        </div>
      </div>
    </AccountLayout>
  );
}

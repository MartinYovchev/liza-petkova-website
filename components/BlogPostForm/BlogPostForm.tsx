import { useState, FormEvent, ChangeEvent } from 'react';
import {
  HiOutlineDocumentText,
  HiOutlinePhotograph,
  HiOutlineSearchCircle,
  HiOutlineCog,
} from 'react-icons/hi';
import { blogService } from '../../lib/blogService';
import { BlogPost, BlogPostFormData } from '../../lib/types';
import ImageUpload from '../ImageUpload/ImageUpload';
import styles from './BlogPostForm.module.scss';

interface BlogPostFormProps {
  post?: BlogPost | null;
  onSave?: (post: BlogPost) => void;
  onCancel?: () => void;
}

export default function BlogPostForm({
  post = null,
  onSave,
  onCancel,
}: BlogPostFormProps) {
  const [formData, setFormData] = useState<BlogPostFormData>({
    title: post?.title || '',
    slug: post?.slug || '',
    content: post?.content || '',
    excerpt: post?.excerpt || '',
    status: post?.status || 'draft',
    tags: post?.tags?.join(', ') || '',
    meta_title: post?.meta_title || '',
    meta_description: post?.meta_description || '',
    author_name: post?.author_name || '',
    author_email: post?.author_email || '',
    featured: post?.featured || false,
  });
  const [newImages, setNewImages] = useState<File[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>(
    post?.images || []
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('content');

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    // Auto-generate slug from title
    if (name === 'title') {
      const slug = value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      setFormData(prev => ({
        ...prev,
        slug,
        meta_title: prev.meta_title || value,
      }));
    }
  };

  const handleImagesChange = (
    images: File[],
    existing: string[] = existingImages
  ) => {
    setNewImages(images);
    setExistingImages(existing);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Calculate which images to delete
      const originalImages = post?.images || [];
      const imagesToDelete = originalImages.filter(
        img => !existingImages.includes(img)
      );

      let savedPost: BlogPost;
      if (post) {
        // Update existing post
        savedPost = await blogService.updatePost(
          post.id,
          formData,
          newImages,
          imagesToDelete
        );
      } else {
        // Create new post
        savedPost = await blogService.createPost(formData, newImages);
      }

      onSave?.(savedPost);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: 'content', label: 'Content', icon: HiOutlineDocumentText },
    { id: 'images', label: 'Images', icon: HiOutlinePhotograph },
    { id: 'seo', label: 'SEO', icon: HiOutlineSearchCircle },
    { id: 'settings', label: 'Settings', icon: HiOutlineCog },
  ];

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.header}>
          <h2>{post ? 'Edit Post' : 'Create New Post'}</h2>
          {error && <div className={styles.error}>{error}</div>}
        </div>

        <div className={styles.tabs}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              type='button'
              onClick={() => setActiveTab(tab.id)}
              className={`${styles.tab} ${
                activeTab === tab.id ? styles.activeTab : ''
              }`}
            >
              <span className={styles.tabIcon}>
                <tab.icon />
              </span>
              {tab.label}
            </button>
          ))}
        </div>

        <div className={styles.tabContent}>
          {activeTab === 'content' && (
            <div className={styles.tabPanel}>
              <div className={styles.formGroup}>
                <label htmlFor='title' className={styles.label}>
                  Title *
                </label>
                <input
                  type='text'
                  id='title'
                  name='title'
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className={styles.input}
                  placeholder='Enter post title...'
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor='slug' className={styles.label}>
                  Slug *
                </label>
                <input
                  type='text'
                  id='slug'
                  name='slug'
                  value={formData.slug}
                  onChange={handleChange}
                  required
                  className={styles.input}
                  placeholder='post-url-slug'
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor='excerpt' className={styles.label}>
                  Excerpt
                </label>
                <textarea
                  id='excerpt'
                  name='excerpt'
                  value={formData.excerpt}
                  onChange={handleChange}
                  rows={3}
                  className={styles.textarea}
                  placeholder='Brief description of the post...'
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor='content' className={styles.label}>
                  Content *
                </label>
                <textarea
                  id='content'
                  name='content'
                  value={formData.content}
                  onChange={handleChange}
                  rows={20}
                  required
                  className={`${styles.textarea} ${styles.contentTextarea}`}
                  placeholder='Write your blog post content here...'
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor='tags' className={styles.label}>
                  Tags
                </label>
                <input
                  type='text'
                  id='tags'
                  name='tags'
                  value={formData.tags}
                  onChange={handleChange}
                  className={styles.input}
                  placeholder='react, nextjs, tutorial (comma-separated)'
                />
              </div>
            </div>
          )}

          {activeTab === 'images' && (
            <div className={styles.tabPanel}>
              <ImageUpload
                images={newImages}
                existingImages={existingImages}
                onImagesChange={handleImagesChange}
                maxImages={8}
              />
            </div>
          )}

          {activeTab === 'seo' && (
            <div className={styles.tabPanel}>
              <div className={styles.formGroup}>
                <label htmlFor='meta_title' className={styles.label}>
                  Meta Title
                </label>
                <input
                  type='text'
                  id='meta_title'
                  name='meta_title'
                  value={formData.meta_title}
                  onChange={handleChange}
                  className={styles.input}
                  placeholder='SEO title for search engines'
                />
                <span className={styles.hint}>
                  {formData.meta_title?.length}/60 characters
                </span>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor='meta_description' className={styles.label}>
                  Meta Description
                </label>
                <textarea
                  id='meta_description'
                  name='meta_description'
                  value={formData.meta_description}
                  onChange={handleChange}
                  rows={3}
                  className={styles.textarea}
                  placeholder='SEO description for search engines'
                />
                <span className={styles.hint}>
                  {formData.meta_description?.length}/160 characters
                </span>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className={styles.tabPanel}>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor='author_name' className={styles.label}>
                    Author Name
                  </label>
                  <input
                    type='text'
                    id='author_name'
                    name='author_name'
                    value={formData.author_name}
                    onChange={handleChange}
                    className={styles.input}
                    placeholder='Author name'
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor='author_email' className={styles.label}>
                    Author Email
                  </label>
                  <input
                    type='email'
                    id='author_email'
                    name='author_email'
                    value={formData.author_email}
                    onChange={handleChange}
                    className={styles.input}
                    placeholder='author@example.com'
                  />
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor='status' className={styles.label}>
                    Status
                  </label>
                  <select
                    id='status'
                    name='status'
                    value={formData.status}
                    onChange={handleChange}
                    className={styles.select}
                  >
                    <option value='draft'>Draft</option>
                    <option value='published'>Published</option>
                    <option value='archived'>Archived</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className={styles.actions}>
          <button
            type='submit'
            disabled={loading}
            className={`${styles.button} ${styles.primaryButton}`}
          >
            {loading ? (
              <>
                <div className={styles.spinner} />
                Saving...
              </>
            ) : post ? (
              'Update Post'
            ) : (
              'Create Post'
            )}
          </button>

          {onCancel && (
            <button
              type='button'
              onClick={onCancel}
              className={`${styles.button} ${styles.secondaryButton}`}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

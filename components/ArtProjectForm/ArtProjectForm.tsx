'use client';

import { useState, useRef } from 'react';
import { ArtProject, artProjectService } from '@/lib/artService';
import Title from '../Typography/Title';
import Text from '../Typography/Text';
import { Button } from '../Button/Button';
import styles from './ArtProjectForm.module.scss';

interface ArtProjectFormProps {
  project?: ArtProject | null;
  onSave: (project: ArtProject) => void;
  onCancel: () => void;
}

export default function ArtProjectForm({
  project,
  onSave,
  onCancel,
}: ArtProjectFormProps) {
  const [formData, setFormData] = useState({
    title: project?.title || '',
    description: project?.description || '',
    status: project?.status || 'planning',
    completion: project?.completion || 0,
  });
  const [loading, setLoading] = useState(false);
  const [uploadingImages, setUploadingImages] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let savedProject;
      if (project) {
        savedProject = await artProjectService.updateProject(
          project.id,
          formData
        );
      } else {
        savedProject = await artProjectService.createProject(formData);
      }
      onSave(savedProject);
    } catch (error) {
      alert('Error saving project: ' + (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || !project) return;

    setUploadingImages(true);
    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const imageUrl = await artProjectService.uploadImage(file, project.id);
        await artProjectService.addProjectImage(project.id, {
          url: imageUrl,
          description: `Uploaded image ${i + 1}`,
          upload_order: i,
        });
      }
      // Refresh the project data
      const updatedProject = await artProjectService.getProject(project.id);
      onSave(updatedProject);
    } catch (error) {
      alert('Error uploading images: ' + (error as Error).message);
    } finally {
      setUploadingImages(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Title level='h2'>
          {project ? 'Edit Project' : 'Create New Project'}
        </Title>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <Text as='label' htmlFor='title' className={styles.label}>
            Title
          </Text>
          <input
            id='title'
            type='text'
            value={formData.title}
            onChange={e => setFormData({ ...formData, title: e.target.value })}
            required
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <Text as='label' htmlFor='description' className={styles.label}>
            Description
          </Text>
          <textarea
            id='description'
            value={formData.description}
            onChange={e =>
              setFormData({ ...formData, description: e.target.value })
            }
            rows={4}
            className={styles.textarea}
          />
        </div>

        <div className={styles.formGroup}>
          <Text as='label' htmlFor='status' className={styles.label}>
            Status
          </Text>
          <select
            id='status'
            value={formData.status}
            onChange={e =>
              setFormData({ ...formData, status: e.target.value as any })
            }
            className={styles.select}
          >
            <option value='planning'>Planning</option>
            <option value='in_progress'>In Progress</option>
            <option value='completed'>Completed</option>
            <option value='on_hold'>On Hold</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <Text as='label' htmlFor='completion' className={styles.label}>
            Completion (%)
          </Text>
          <input
            id='completion'
            type='number'
            min='0'
            max='100'
            value={formData.completion}
            onChange={e =>
              setFormData({
                ...formData,
                completion: parseInt(e.target.value) || 0,
              })
            }
            className={styles.input}
          />
        </div>

        {project && (
          <div className={styles.imageUploadSection}>
            <Text className={styles.label}>Upload Images</Text>
            <input
              ref={fileInputRef}
              type='file'
              multiple
              accept='image/*'
              onChange={handleImageUpload}
              disabled={uploadingImages}
              className={styles.fileInput}
            />
            {uploadingImages && (
              <Text as='p' className={styles.uploadingText}>
                <span className={styles.spinner}></span>
                Uploading images...
              </Text>
            )}

            {/* Show existing images */}
            {project.images && project.images.length > 0 && (
              <div className={styles.currentImagesSection}>
                <Text as='p' className={styles.currentImagesTitle}>
                  Current Images:
                </Text>
                <div className={styles.imagesGrid}>
                  {project.images.map(image => (
                    <div key={image.id} className={styles.imageItem}>
                      <img
                        src={image.url || '/placeholder.svg'}
                        alt={image.description}
                        className={styles.imagePreview}
                      />
                      <Button
                        type='button'
                        variant='outline'
                        size='small'
                        onClick={async () => {
                          if (confirm('Delete this image?')) {
                            await artProjectService.deleteProjectImage(
                              image.id
                            );
                            const updatedProject =
                              await artProjectService.getProject(project.id);
                            onSave(updatedProject);
                          }
                        }}
                        className={styles.deleteImageButton}
                      >
                        ×
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </form>

      <div className={styles.actions}>
        <Button
          type='button'
          variant='secondary'
          size='medium'
          onClick={onCancel}
          disabled={loading}
        >
          Cancel
        </Button>
        <Button
          type='submit'
          variant='primary'
          size='medium'
          disabled={loading}
          onClick={handleSubmit}
        >
          {loading && <span className={styles.spinner}></span>}
          {loading ? 'Saving...' : 'Save Project'}
        </Button>
      </div>
    </div>
  );
}

import { useState, useRef, ChangeEvent, DragEvent } from 'react';
import Image from 'next/image';
import { getImageUrl } from '../../lib/supabase';
import { ImageUploadProps } from '../../lib/types';
import Title from '../Typography/Title';
import Text from '../Typography/Text';
import { Button } from '../Button/Button';
import styles from './ImageUpload.module.scss';

export default function ImageUpload({
  images = [],
  onImagesChange,
  maxImages = 5,
  existingImages = [],
}: ImageUploadProps) {
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (files: FileList) => {
    const fileArray = Array.from(files);
    const validFiles = fileArray.filter(file => {
      const isImage = file.type.startsWith('image/');
      const isValidSize = file.size <= 5 * 1024 * 1024; // 5MB limit
      return isImage && isValidSize;
    });

    if (validFiles.length + images.length + existingImages.length > maxImages) {
      alert(`Maximum ${maxImages} images allowed`);
      return;
    }

    onImagesChange([...images, ...validFiles], existingImages);
  };

  const handleDrag = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFileInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  const removeImage = (index: number, isExisting: boolean = false) => {
    if (isExisting) {
      const updatedExisting = existingImages.filter((_, i) => i !== index);
      onImagesChange(images, updatedExisting);
    } else {
      const updatedImages = images.filter((_, i) => i !== index);
      onImagesChange(updatedImages, existingImages);
    }
  };

  const moveImage = (
    fromIndex: number,
    toIndex: number,
    isExisting: boolean = false
  ) => {
    if (isExisting) {
      const updatedExisting = [...existingImages];
      const [movedImage] = updatedExisting.splice(fromIndex, 1);
      updatedExisting.splice(toIndex, 0, movedImage);
      onImagesChange(images, updatedExisting);
    } else {
      const updatedImages = [...images];
      const [movedImage] = updatedImages.splice(fromIndex, 1);
      updatedImages.splice(toIndex, 0, movedImage);
      onImagesChange(updatedImages, existingImages);
    }
  };

  const totalImages = existingImages.length + images.length;

  return (
    <div className={styles.container}>
      <div
        className={`${styles.uploadZone} ${
          dragActive ? styles.dragActive : ''
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type='file'
          multiple
          accept='image/*'
          onChange={handleFileInput}
          className={styles.hiddenInput}
        />

        <div className={styles.uploadContent}>
          <div className={styles.uploadIcon}>
            <svg viewBox='0 0 24 24' fill='none' stroke='currentColor'>
              <path d='M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4' />
              <polyline points='17,8 12,3 7,8' />
              <line x1='12' y1='3' x2='12' y2='15' />
            </svg>
          </div>
          <Title level='h3'>Upload Images</Title>
          <Text>Click to browse or drag and drop images here</Text>
          <Text as='span' className={styles.hint}>
            Maximum {maxImages} images • 5MB each • JPG, PNG, GIF, WebP
          </Text>
        </div>
      </div>

      {totalImages > 0 && (
        <div className={styles.previewSection}>
          <div className={styles.previewHeader}>
            <Title level='h4'>
              Images ({totalImages}/{maxImages})
            </Title>
            <Text as='span' className={styles.coverNote}>
              First image will be the cover
            </Text>
          </div>

          <div className={styles.previewGrid}>
            {/* Existing Images */}
            {existingImages.map((imagePath, index) => (
              <div key={`existing-${index}`} className={styles.previewItem}>
                <div className={styles.imageWrapper}>
                  <Image
                    src={getImageUrl(imagePath) || '/placeholder.svg'}
                    alt={`Existing ${index + 1}`}
                    fill
                    className={styles.previewImage}
                    sizes='150px'
                  />
                  {index === 0 && totalImages > 0 && (
                    <div className={styles.coverBadge}>Cover</div>
                  )}
                </div>

                <div className={styles.imageControls}>
                  <Button
                    type='button'
                    variant='outline'
                    size='small'
                    onClick={() => removeImage(index, true)}
                    className={styles.removeBtn}
                    title='Remove image'
                  >
                    <svg viewBox='0 0 24 24' fill='none' stroke='currentColor'>
                      <line x1='18' y1='6' x2='6' y2='18' />
                      <line x1='6' y1='6' x2='18' y2='18' />
                    </svg>
                  </Button>

                  <div className={styles.moveControls}>
                    {index > 0 && (
                      <Button
                        type='button'
                        variant='outline'
                        size='small'
                        onClick={() => moveImage(index, index - 1, true)}
                        className={styles.moveBtn}
                        title='Move left'
                      >
                        <svg
                          viewBox='0 0 24 24'
                          fill='none'
                          stroke='currentColor'
                        >
                          <polyline points='15,18 9,12 15,6' />
                        </svg>
                      </Button>
                    )}
                    {index < existingImages.length - 1 && (
                      <Button
                        type='button'
                        variant='outline'
                        size='small'
                        onClick={() => moveImage(index, index + 1, true)}
                        className={styles.moveBtn}
                        title='Move right'
                      >
                        <svg
                          viewBox='0 0 24 24'
                          fill='none'
                          stroke='currentColor'
                        >
                          <polyline points='9,18 15,12 9,6' />
                        </svg>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {/* New Images */}
            {images.map((file, index) => (
              <div key={`new-${index}`} className={styles.previewItem}>
                <div className={styles.imageWrapper}>
                  <Image
                    src={URL.createObjectURL(file) || '/placeholder.svg'}
                    alt={`New ${index + 1}`}
                    fill
                    className={styles.previewImage}
                    sizes='150px'
                  />
                  {existingImages.length === 0 && index === 0 && (
                    <div className={styles.coverBadge}>Cover</div>
                  )}
                  <div className={styles.newBadge}>New</div>
                </div>

                <div className={styles.imageControls}>
                  <Button
                    type='button'
                    variant='outline'
                    size='small'
                    onClick={() => removeImage(index, false)}
                    className={styles.removeBtn}
                    title='Remove image'
                  >
                    <svg viewBox='0 0 24 24' fill='none' stroke='currentColor'>
                      <line x1='18' y1='6' x2='6' y2='18' />
                      <line x1='6' y1='6' x2='18' y2='18' />
                    </svg>
                  </Button>

                  <div className={styles.moveControls}>
                    {index > 0 && (
                      <Button
                        type='button'
                        variant='outline'
                        size='small'
                        onClick={() => moveImage(index, index - 1, false)}
                        className={styles.moveBtn}
                        title='Move left'
                      >
                        <svg
                          viewBox='0 0 24 24'
                          fill='none'
                          stroke='currentColor'
                        >
                          <polyline points='15,18 9,12 15,6' />
                        </svg>
                      </Button>
                    )}
                    {index < images.length - 1 && (
                      <Button
                        type='button'
                        variant='outline'
                        size='small'
                        onClick={() => moveImage(index, index + 1, false)}
                        className={styles.moveBtn}
                        title='Move right'
                      >
                        <svg
                          viewBox='0 0 24 24'
                          fill='none'
                          stroke='currentColor'
                        >
                          <polyline points='9,18 15,12 9,6' />
                        </svg>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

'use client';

import Title from '@/components/Typography/Title';
import styles from './Progress.module.scss';
import { projects } from './constants';
import Text from '@/components/Typography/Text';
import { useState, useEffect } from 'react';
import { Button } from '@/components/Button/Button';
import Image from 'next/image';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

interface UploadedImage {
  url: string;
  description: string;
}

export default function Progress() {
  const [expandedProject, setExpandedProject] = useState<number | null>(null);
  const [projectImages, setProjectImages] = useState<
    Record<number, UploadedImage[]>
  >({});

  // Simulate fetching uploaded images for each project
  useEffect(() => {
    const fetchProjectImages = async () => {
      // This would typically fetch from your API/database
      const mockUploadedImages: Record<number, UploadedImage[]> = {
        0: [
          {
            url: '/uploads/1749386535043_cod.svg',
            description: 'Digital art piece #1',
          },
          {
            url: '/uploads/1749386977912_1111.jpg',
            description: 'Work in progress sketch',
          },
          {
            url: '/uploads/1749387174501_check.png',
            description: 'Concept validation',
          },
        ],
        1: [
          {
            url: '/uploads/1749387251459_check.png',
            description: 'Photography concept',
          },
        ],
        2: [
          {
            url: '/uploads/1749386535043_cod.svg',
            description: 'Sculpture design',
          },
          {
            url: '/uploads/1749386977912_1111.jpg',
            description: 'Final installation',
          },
        ],
      };
      setProjectImages(mockUploadedImages);
    };

    fetchProjectImages();
  }, []);

  const toggleProject = (index: number) => {
    setExpandedProject(expandedProject === index ? null : index);
  };

  const getProjectImages = (projectIndex: number) => {
    const uploaded = projectImages[projectIndex] || [];
    const original = projects[projectIndex]?.images || [];

    // Combine uploaded and original images, limit to 5 maximum
    const allImages = [...uploaded, ...original];
    return allImages.slice(0, 5);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Title level='h1' className={styles.title}>
          Creative Progress
        </Title>
        <Text as='p' className={styles.subtitle}>
          Journey through ongoing artistic endeavors and completed works
        </Text>
      </div>

      <div className={styles.timeline}>
        {projects.map((project, index) => {
          const images = getProjectImages(index);

          return (
            <div key={index} className={styles.project}>
              <div className={styles.projectHeader}>
                <Title level='h3' className={styles.projectTitle}>
                  {project.title}
                </Title>
                <Text
                  as='span'
                  className={`${styles.status} ${
                    styles[project.status.toLowerCase().replace(' ', '')]
                  }`}
                >
                  {project.status}
                </Text>
              </div>

              <Text as='p' className={styles.projectDescription}>
                {project.description}
              </Text>

              <div className={styles.progressContainer}>
                <div className={styles.progressBar}>
                  <div
                    className={styles.progressFill}
                    style={{ width: `${project.completion}%` }}
                    role='progressbar'
                    aria-valuenow={project.completion}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  ></div>
                </div>
                <Text as='span' className={styles.percentage}>
                  {project.completion}% Complete
                </Text>
              </div>

              {images && images.length > 0 && (
                <div className={styles.expandSection}>
                  <Button
                    className={`${styles.expandButton} ${
                      expandedProject === index ? styles.expanded : ''
                    }`}
                    onClick={() => toggleProject(index)}
                    aria-expanded={expandedProject === index}
                    aria-label={`${expandedProject === index ? 'Hide' : 'Show'} project images`}
                  >
                    <span className={styles.arrow}>
                      {expandedProject === index ? (
                        <FaChevronUp />
                      ) : (
                        <FaChevronDown />
                      )}
                    </span>
                  </Button>

                  <Text as='p' className={styles.imageCount}>
                    {images.length} image{images.length !== 1 ? 's' : ''}{' '}
                    available
                  </Text>

                  {expandedProject === index && (
                    <div className={styles.expandedContent}>
                      <div className={styles.imageGrid}>
                        {images.map((image, imgIndex) => (
                          <div key={imgIndex} className={styles.imageContainer}>
                            <div className={styles.imageWrapper}>
                              <Image
                                src={image.url}
                                alt={image.description}
                                className={styles.projectImage}
                                width={400}
                                height={300}
                                style={{ objectFit: 'cover' }}
                                onError={e => {
                                  // Fallback for broken images
                                  const target = e.target as HTMLImageElement;
                                  target.src = '/placeholder.jpg';
                                }}
                              />
                            </div>
                            <Text as='p' className={styles.imageDescription}>
                              {image.description}
                            </Text>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

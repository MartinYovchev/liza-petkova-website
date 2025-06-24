'use client';

import Title from '@/components/Typography/Title';
import styles from './Progress.module.scss';
import Text from '@/components/Typography/Text';
import { useState, useEffect } from 'react';
import { Button } from '@/components/Button/Button';
import Image from 'next/image';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { artProjectService, ArtProject } from '@/lib/artService';

export default function Progress() {
  const [expandedProject, setExpandedProject] = useState<number | null>(null);
  const [projects, setProjects] = useState<ArtProject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const result = await artProjectService.getAllProjects(1, 50); // Get all projects
        setProjects(result.projects);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const toggleProject = (index: number) => {
    setExpandedProject(expandedProject === index ? null : index);
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <Title level='h1' className={styles.title}>
            Creative Progress
          </Title>
          <Text as='p' className={styles.subtitle}>
            Loading projects...
          </Text>
        </div>
      </div>
    );
  }

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
          const images = project.images || [];

          return (
            <div key={project.id} className={styles.project}>
              <div className={styles.projectHeader}>
                <Title level='h3' className={styles.projectTitle}>
                  {project.title}
                </Title>
                <Text
                  as='span'
                  className={`${styles.status} ${
                    styles[project.status.toLowerCase().replace('_', '')]
                  }`}
                >
                  {project.status.replace('_', ' ')}
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
                          <div key={image.id} className={styles.imageContainer}>
                            <div className={styles.imageWrapper}>
                              <Image
                                src={image.url || '/placeholder.svg'}
                                alt={image.description}
                                className={styles.projectImage}
                                width={400}
                                height={300}
                                style={{ objectFit: 'cover' }}
                                onError={e => {
                                  const target = e.target as HTMLImageElement;
                                  target.src =
                                    '/placeholder.svg?height=300&width=400&text=Image+Not+Found';
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

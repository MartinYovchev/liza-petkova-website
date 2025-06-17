"use client";

import Title from "@/components/Typography/Title";
import styles from "./Progress.module.scss";
import { projects } from "./constants";
import Text from "@/components/Typography/Text";
import { useState } from "react";
import { Button } from "@/components/Button/Button";
import Image from "next/image";

export default function Progress() {
  const [expandedProject, setExpandedProject] = useState<number | null>(null);

  const toggleProject = (index: number) => {
    setExpandedProject(expandedProject === index ? null : index);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Title level="h1" className={styles.title}>
          Creative Progress
        </Title>
        <Text as="p" className={styles.subtitle}>
          Journey through ongoing artistic endeavors and completed works
        </Text>
      </div>

      <div className={styles.timeline}>
        {projects.map((project, index) => (
          <div key={index} className={styles.project}>
            <div className={styles.projectHeader}>
              <Title level="h3" className={styles.projectTitle}>
                {project.title}
              </Title>
              <Text
                as="span"
                className={`${styles.status} ${
                  styles[project.status.toLowerCase().replace(" ", "")]
                }`}
              >
                {project.status}
              </Text>
            </div>
            <Text as="p" className={styles.projectDescription}>
              {project.description}
            </Text>
            <div className={styles.progressBar}>
              <div
                className={styles.progressFill}
                style={{ width: `${project.completion}%` }}
                role="progressbar"
                aria-valuenow={project.completion}
                aria-valuemin={0}
                aria-valuemax={100}
              ></div>
            </div>
            <Text as="span" className={styles.percentage}>
              {project.completion}% Complete
            </Text>

            {project.images && project.images.length > 0 && (
              <>
                <Button
                  className={`${styles.expandButton} ${
                    expandedProject === index ? styles.expanded : ""
                  }`}
                  onClick={() => toggleProject(index)}
                  aria-expanded={expandedProject === index}
                >
                  <Text as="span" className={styles.arrow}>
                    {expandedProject === index ? "↑" : "↓"}
                  </Text>
                </Button>

                {expandedProject === index && (
                  <div className={styles.expandedContent}>
                    {project.images.map((image, imgIndex) => (
                      <div key={imgIndex} className={styles.imageContainer}>
                        <Image
                          src={image.url}
                          alt={image.description}
                          className={styles.projectImage}
                          width={100}
                          height={100}
                        />
                        <Text as="p" className={styles.imageDescription}>
                          {image.description}
                        </Text>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

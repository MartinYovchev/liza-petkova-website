"use client";
import Link from "next/link";
import { FadeIn } from "@/components/Animations/FadeIn/FadeIn";
import StaggerChildren from "@/components/Animations/StaggerChildren/StaggerChildren";
import { HoverScale } from "@/components/Animations/HoverScale/HoverScale";
import styles from "./ServiceSection.module.scss";
import Title from "@/components/Typography/Title";
import Text from "@/components/Typography/Text";

type ServicesSectionProps = {
  title: string;
  subtitle: string;
  services: {
    icon: string;
    title: string;
    description: string;
    features: string[];
  }[];
};

export default function ServicesSection({
  title,
  subtitle,
  services,
}: ServicesSectionProps) {
  return (
    <section className={styles.services}>
      <div className={styles.container}>
        <FadeIn delay={0.2} direction="up" className={styles.sectionHeader}>
          <Title level="h2" noStyles={true} className={styles.sectionTitle}>
            {title}
          </Title>
          <Text as="p" noStyles={true} className={styles.sectionSubtitle}>
            {subtitle}
          </Text>
        </FadeIn>

        <StaggerChildren className={styles.servicesGrid}>
          {services.map((service, index) => (
            <HoverScale key={index} scale={1.03}>
              <div className={styles.serviceCard}>
                <div className="text-4xl mb-4">{service.icon}</div>

                <Title
                  level="h3"
                  noStyles={true}
                  className={styles.serviceTitle}
                >
                  {service.title}
                </Title>
                <Text
                  as="p"
                  noStyles={true}
                  className={styles.serviceDescription}
                >
                  {service.description}
                </Text>

                <ul className={styles.serviceFeatures}>
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className={styles.serviceFeature}>
                      <Text
                        as="span"
                        noStyles={true}
                        className="text-blue-500 mr-2"
                      >
                        ✓
                      </Text>
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className={styles.serviceLink}>
                  <Link
                    href="/professional/services"
                    className={styles.serviceLink}
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            </HoverScale>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}

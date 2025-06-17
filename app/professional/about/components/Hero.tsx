import Image from "next/image";
import styles from "../ProfessionalAbout.module.scss";
import Text from "@/components/Typography/Text";
import Title from "@/components/Typography/Title";

export default function Hero() {
  return (
    <div className={styles.hero}>
      <div className={styles.heroContent}>
        <div className={styles.heroText}>
          <Title level="h1" className={styles.heroTitle}>
            About GeoTech
          </Title>
          <Text as="p" className={styles.heroSubtitle}>
            For over 15 years, we've been at the forefront of geodetic
            innovation, delivering precision surveying solutions that shape the
            built environment.
          </Text>
          <div className={styles.heroStats}>
            <div className={styles.stat}>
              <Text as="span" className={styles.statNumber}>
                500+
              </Text>
              <Text as="span" className={styles.statLabel}>
                Projects Completed
              </Text>
            </div>
            <div className={styles.stat}>
              <Text as="span" className={styles.statNumber}>
                15+
              </Text>
              <Text as="span" className={styles.statLabel}>
                Years Experience
              </Text>
            </div>
            <div className={styles.stat}>
              <Text as="span" className={styles.statNumber}>
                50+
              </Text>
              <Text as="span" className={styles.statLabel}>
                Team Members
              </Text>
            </div>
          </div>
        </div>
        <div className={styles.heroImage}>
          <Image
            src="/placeholder.svg?height=500&width=600"
            alt="GeoTech team at work"
            className={styles.heroImg}
            width={500}
            height={600}
          />
        </div>
      </div>
    </div>
  );
}

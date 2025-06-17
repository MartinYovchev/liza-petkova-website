import Link from "next/link";
import styles from "../About.module.scss";
import Title from "@/components/Typography/Title";
import Text from "@/components/Typography/Text";
import Image from "next/image";

export const Hero = () => {
  return (
    <div className={styles.hero}>
      <div className={styles.heroContent}>
        <div className={styles.heroLeft}>
          <div className={styles.heroImageContainer}>
            <Image
              src="/placeholder.svg?height=600&width=500"
              alt="Natalia - Creative Coach and Artist"
              className={styles.heroImage}
              width={500}
              height={600}
            />
            <div className={styles.floatingQuote}>
              <Text as="p">
                "Creativity is not a talent. It is a way of operating." - John
                Cleese
              </Text>
            </div>
          </div>
        </div>
        <div className={styles.heroRight}>
          <Title level="h1" className={styles.heroTitle}>
            Hi, I'm <span className={styles.highlight}>Natalia</span>
          </Title>
          <Text as="p" className={styles.heroSubtitle}>
            Creative Coach, Artist & Transformation Guide
          </Text>
          <div className={styles.heroDescription}>
            <Text as="p">
              I'm passionate about helping people discover their creative
              potential and transform their lives through art. With a background
              in fine arts and psychology, I combine technical expertise with
              deep understanding of the human creative process.
            </Text>
            <Text as="p">
              My journey has been one of constant exploration—from traditional
              painting to digital art, from personal creation to guiding others
              on their creative paths. I believe that everyone has a unique
              artistic voice waiting to be discovered.
            </Text>
          </div>
          <div className={styles.heroActions}>
            <Link href="/artistic/contact" className={styles.ctaPrimary}>
              Work With Me
            </Link>
            <Link href="/artistic/progress" className={styles.ctaSecondary}>
              View My Work
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

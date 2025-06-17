import Title from "@/components/Typography/Title";
import styles from "../About.module.scss";
import Text from "@/components/Typography/Text";
import Image from "next/image";

export const Philosophy = () => {
  return (
    <div className={styles.philosophy}>
      <div className={styles.philosophyContent}>
        <div className={styles.philosophyLeft}>
          <Title level="h2" className={styles.sectionTitle}>
            My Creative Philosophy
          </Title>
          <div className={styles.philosophyText}>
            <Text as="p">
              I believe that creativity is not a luxury or a talent reserved for
              the few—it's a fundamental human capacity that we all possess. My
              role is not to teach you how to be creative, but to help you
              remember and reconnect with the creative being you already are.
            </Text>
            <Text as="p">
              Through my work, I've discovered that the most profound
              transformations happen when we approach creativity with curiosity
              rather than judgment, with play rather than pressure. When we
              create from a place of authenticity and joy, magic happens.
            </Text>
            <Text as="p">
              Every person I work with teaches me something new about the
              infinite ways creativity can manifest. This reciprocal learning is
              what makes this work so deeply fulfilling for me.
            </Text>
          </div>
          <blockquote className={styles.quote}>
            "The creative process is a spiritual path. This adventure is about
            us, about the deep self, the composer in all of us, waiting to be
            released."
            <cite>- Julia Cameron</cite>
          </blockquote>
        </div>
        <div className={styles.philosophyRight}>
          <div className={styles.philosophyImageGrid}>
            <Image
              src="/placeholder.svg"
              alt="Creative process"
              className={styles.philosophyImage}
              width={250}
              height={300}
            />
            <Image
              src="/placeholder.svg?height=250&width=300"
              alt="Art workshop"
              className={styles.philosophyImage}
              width={250}
              height={300}
            />
            <Image
              src="/placeholder.svg?height=250&width=300"
              alt="Personal transformation"
              className={styles.philosophyImage}
              width={250}
              height={300}
            />
            <Image
              src="/placeholder.svg?height=250&width=300"
              alt="Creative community"
              className={styles.philosophyImage}
              width={250}
              height={300}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

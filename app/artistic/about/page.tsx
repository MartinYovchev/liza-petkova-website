"use client";
// import { useLanguage } from "../../components/language-context"
import Link from "next/link";
import styles from "./About.module.scss";
import { Hero } from "./components/Hero";
import { Values } from "./components/Values";
import { Journey } from "./components/Journey";
import { Philosophy } from "./components/Philosophy";
import { Achievements } from "./components/Achievements";
import { PersonalTouch } from "./components/PersonalTouch";
import { CTA } from "./components/CTA";

export default function ArtisticAbout() {
  // const { t } = useLanguage()

  return (
    <div className={styles.container}>
      <Hero />
      <Values />
      <Journey />
      <Philosophy />
      <Achievements />
      <PersonalTouch />
      <CTA />
    </div>
  );
}

'use client';

import styles from './About.module.scss';
import { Hero } from './components/Hero';
import { Values } from './components/Values';
import { Journey } from './components/Journey';
import { Philosophy } from './components/Philosophy';
import { Achievements } from './components/Achievements';
import { PersonalTouch } from './components/PersonalTouch';
import { CTA } from './components/CTA';
import { Layout } from '@/components/Layout/Layout';

export default function ArtisticAbout() {
  return (
    <Layout>
      <div className={styles.container}>
        <Hero />
        <Values />
        <Journey />
        <Philosophy />
        <Achievements />
        <PersonalTouch />
        <CTA />
      </div>
    </Layout>
  );
}

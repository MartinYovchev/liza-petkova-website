'use client';
import { useState } from 'react';
// import { useLanguage } from "@/components/AdminUtils/components/language-context";
import styles from './ProfessionalServices.module.scss';
import { categories, services } from './constants';
import { Hero } from './components/Hero/Hero';
import { Breadcrumb } from './components/Breadcrumb/Breadcrumb';
import { Sidebar } from './components/Sidebar/Sidebar';
import { ServicesGrid } from './components/ServicesGrid/ServicesGrid';
import { Process } from './components/Process/Process';
import { CTA } from './components/CTA/CTA';

export default function ServicesPage() {
  //   const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredServices =
    selectedCategory === 'all'
      ? services
      : services.filter(service => service.category === selectedCategory);

  return (
    <div className={styles.container}>
      <Hero />
      <Breadcrumb />
      <div className={styles.mainContent}>
        <Sidebar
          selectedCategory={selectedCategory}
          onCategorySelect={setSelectedCategory}
        />
        <ServicesGrid
          services={filteredServices}
          selectedCategory={selectedCategory}
          categories={categories}
        />
      </div>
      <Process />
      <CTA />
    </div>
  );
}

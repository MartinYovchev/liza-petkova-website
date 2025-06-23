'use client';

import { Layout } from '@/components/Layout/Layout';
import HomePage from './home/HomePage';

export default function Home() {
  return (
    <Layout showFooter={false}>
      <HomePage />
    </Layout>
  );
}

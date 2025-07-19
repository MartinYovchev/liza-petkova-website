'use client';

import dynamic from 'next/dynamic';
import { Loader } from '@/components/Loader/Loader';

// Dynamically import the admin component with SSR disabled
const AdminDashboard = dynamic(() => import('./AdminDashboard'), {
  ssr: false,
  loading: () => <Loader isLoading={true} />,
});

export default function AdminPage() {
  return <AdminDashboard />;
}

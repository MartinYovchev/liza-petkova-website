import ServiceDetails from './ServiceDetails';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ServiceDetailsPage({ params }: PageProps) {
  const { id } = await params;
  return <ServiceDetails id={id} />;
}

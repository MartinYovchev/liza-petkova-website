import ServiceDetails from './ServiceDetails';

interface PageProps {
  params: {
    id: string;
  };
}

export default function ServiceDetailsPage({ params }: PageProps) {
  return <ServiceDetails id={params.id} />;
}

import { Layout } from '@/components/Layout/Layout';
import ProfessionalHomePage from './home/ProfessionalHomePage';

export default function Professional() {
  return (
    <Layout showFooter={false}>
      <ProfessionalHomePage />
    </Layout>
  );
}

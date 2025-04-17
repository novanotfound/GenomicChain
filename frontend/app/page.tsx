import HeroSection from '@/components/HeroSection';
import FeatureSection from '@/components/FeatureSection';
import FAQSection from '@/components/FAQSection';
import CTASection from '@/components/CTASection';
import { ToastContainer } from 'react-toastify';

export default function Home() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-900">
      <HeroSection />
      <FeatureSection />
      {/* <FAQSection /> */}
      <CTASection />
      <ToastContainer />
    </main>
  );
}
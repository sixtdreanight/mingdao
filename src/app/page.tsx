'use client';

import { useRouter } from 'next/navigation';
import { HeroSection } from '@/components/landing/HeroSection';
import { FeatureGrid } from '@/components/landing/FeatureGrid';

export default function LandingPage() {
  const router = useRouter();

  const handleEnter = () => {
    router.push('/main');
  };

  return (
    <main>
      <HeroSection onEnter={handleEnter} />
      <FeatureGrid onEnter={handleEnter} />
    </main>
  );
}

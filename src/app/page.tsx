'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/authStore';
import IntroSequence from '@/components/IntroSequence';

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);
  const { isAuthenticated } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, router]);

  const handleIntroComplete = () => {
    setShowIntro(false);
    router.push('/auth/login');
  };

  if (showIntro) {
    return <IntroSequence onComplete={handleIntroComplete} />;
  }

  return null;
}

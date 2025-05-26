'use client';

import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function BackButton({ className }: { className?: string }) {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className={className}
      aria-label="뒤로가기"
    >
      <ChevronLeft />
    </button>
  );
}

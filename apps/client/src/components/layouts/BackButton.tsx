'use client';

import { cn } from '@repo/ui/lib/utils';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function BackButton({ className }: { className?: string }) {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className={cn('cursor-pointer', className)}
      aria-label="뒤로가기"
    >
      <ChevronLeft />
    </button>
  );
}

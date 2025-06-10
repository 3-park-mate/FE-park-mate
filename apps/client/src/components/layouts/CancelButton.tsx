'use client';

import { cn } from '@repo/ui/lib/utils';
import { useRouter } from 'next/navigation';

export default function CancelButton(className: { className?: string }) {
  const router = useRouter();
  return (
    <button
      type="button"
      className={cn(
        'text-lg text-gray-2 hover:text-black cursor-pointer',
        className
      )}
      onClick={() => router.back()}
    >
      <p>Cancel</p>
    </button>
  );
}

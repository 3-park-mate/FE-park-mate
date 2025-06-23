'use client';

import { cn } from '@repo/ui/lib/utils';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface BackButtonProps {
  className?: string;
  onClick?: () => void;
}

export default function BackButton({ className, onClick }: BackButtonProps) {
  const router = useRouter();

  const handleClick = () => {
    if (onClick) onClick();
    else router.back();
  };

  return (
    <button onClick={handleClick} className={cn('cursor-pointer', className)}>
      <ChevronLeft />
    </button>
  );
}

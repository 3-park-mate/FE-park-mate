'use client';

import { cn } from '@repo/ui/lib/utils';
import { MousePointer2Icon } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function SimpleMapRedirectButton({
  icon: Icon = MousePointer2Icon,
  className,
  label,
  lat,
  lng,
}: {
  icon?: React.FC<{ className?: string }>;
  className?: string;
  label: string;
  lat?: number;
  lng?: number;
}) {
  const router = useRouter();
  return (
    <button
      type="button"
      className="flex w-full items-center gap-3 bg-white border-1 rounded-lg py-2.5 px-4 cursor-pointer"
      onClick={() => router.replace(`/map?lat=${lat}&lon=${lng}`)}
    >
      <>
        <Icon className={cn(className)} />
        <p className="text-xl py-1">{label}</p>
      </>
    </button>
  );
}

'use client';

import { cn } from '@repo/ui/lib/utils';
import { MousePointer2Icon } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function MapRedirectButton({
  icon: Icon = MousePointer2Icon,
  IconclassName,
  className,
  label,
  subText,
  position = { lat: undefined, lng: undefined },
}: {
  icon?: React.FC<{ className?: string }>;
  IconclassName?: string;
  className?: string;
  label: string;
  subText?: string;
  position?: { lat: number | undefined; lng: number | undefined };
}) {
  const router = useRouter();
  return (
    <button
      type="button"
      className={cn(
        'flex w-full items-center gap-3 bg-white border-1 rounded-lg py-4 px-4 cursor-pointer',
        className
      )}
      onClick={() =>
        router.replace(`/map?lat=${position.lat}&lng=${position.lng}`)
      }
    >
      <Icon
        className={cn('size-15 flex-shrink-0  rounded-lg p-3.5', IconclassName)}
      />
      <p className="flex flex-col flex-1 text-left overflow-hidden">
        <span className="text-17px font-medium">{label}</span>
        <span className="text-gray-2 text-15px leading-4 break-words whitespace-pre-line">
          {subText}
        </span>
      </p>
    </button>
  );
}

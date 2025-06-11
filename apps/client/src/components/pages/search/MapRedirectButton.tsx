'use client';

import { cn } from '@repo/ui/lib/utils';
import { useRouter } from 'next/navigation';

export default function MapRedirectButton({
  type,
  className,
  label,
  address,
  position,
}: {
  type: 'location' | 'parkinglot';
  className?: string;
  label: string;
  address: string;
  position: { lat: number; lng: number };
}) {
  const router = useRouter();
  return (
    <div
      className={cn('px-6 py-4', className)}
      onClick={() =>
        router.replace(`/map?lat=${position.lat}&lon=${position.lng}`)
      }
    >
      {/* type==='parkinglot' 추가 필요 */}
      {type === 'location' && (
        <>
          <p>{label}</p>
          <p className="text-sm text-gray-2">{address}</p>
        </>
      )}
    </div>
  );
}

import Image from 'next/image';
import { Car, MapPin } from 'lucide-react';
import { IconWithText, Rating } from '@repo/ui/components/common/CommonLayouts';
import { cn } from '@repo/ui/lib/utils';

export default function InfoWithThumbnail({
  thumbImageUrl,
  name,
  averageRating,
  totalReviews,
  capacity,
  address,
}: {
  thumbImageUrl?: string;
  name: string;
  averageRating: number;
  totalReviews: number;
  capacity: number;
  address: string;
}) {
  const isOperating = true;
  return (
    <section className="relative">
      <div className="aspect-[155/102] flex items-center justify-center relative">
        <Image
          src={thumbImageUrl ?? '/img/no-image.png'}
          alt="주차장 이미지"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <div className="flex justify-between items-start mb-2">
            <div
              className={cn(
                'text-xs text-white px-2 py-1 rounded-lg',
                isOperating ? 'bg-secondary' : 'bg-gray-400'
              )}
            >
              {isOperating ? '운영중' : '운영준비중'}
            </div>
          </div>
          <h1 className="text-2xl font-bold mb-2">{name}</h1>
          <Rating className="mb-3">
            {averageRating} ({totalReviews})
          </Rating>
          <div className="flex flex-col gap-1 text-sm">
            <IconWithText Icon={MapPin}>{address}</IconWithText>
            <IconWithText Icon={Car}>{capacity}면</IconWithText>
          </div>
        </div>
      </div>
    </section>
  );
}

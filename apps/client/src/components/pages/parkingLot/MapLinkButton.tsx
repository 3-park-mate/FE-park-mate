import { buttonVariants } from '@repo/ui/components/base/button';
import MarkerIcon from '@repo/ui/components/icon/MarkerIcon';
import { ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function MapLinkButton({
  mainAddress,
  parkingLotUuid,
  latitude,
  longitude,
}: {
  mainAddress: string;
  parkingLotUuid: string;
  latitude: number;
  longitude: number;
}) {
  return (
    <Link
      href={`/map?lat=${latitude}&lng=${longitude}&uuid=${parkingLotUuid}`}
      className={`${buttonVariants({
        variant: 'default',
      })} w-full h-auto justify-start items-center gap-5 rounded-2xl !bg-black`}
    >
      <div className="relative flex-shrink-0 w-[64px] h-[64px]">
        <Image
          src="/img/map-thumb.png"
          alt="지도 썸네일"
          fill
          sizes="64px"
          style={{ objectFit: 'cover' }}
        />
        <MarkerIcon
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
          !w-6 !h-6 z-10"
        />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-primary text-15px">지도 바로가기</p>
        <p className="text-gray-3 whitespace-pre-wrap">{mainAddress}</p>
      </div>
      <ChevronRight className="text-primary !w-5 !h-5 flex-shrink-0" />
    </Link>
  );
}

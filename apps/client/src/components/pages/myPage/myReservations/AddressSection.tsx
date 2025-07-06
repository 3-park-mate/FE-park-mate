import MarkerIcon from '@repo/ui/components/icon/MarkerIcon';
import Image from 'next/image';
import Link from 'next/link';

export default function AddressSection({
  parkingLotUuid,
  mainAddress,
  detailAddress,
  latitude,
  longitude,
}: {
  mainAddress: string;
  detailAddress: string;
  parkingLotUuid: string;
  latitude: number;
  longitude: number;
}) {
  return (
    <section className="flex flex-row justify-between items-center gap-3">
      <div className="flex-1 min-w-0 space-y-1">
        <p className="text-gray-2 text-15px">주소</p>
        <p className="text-15px font-semibold">{mainAddress}</p>
        <p className="text-sm text-gray-2">{detailAddress}</p>
      </div>
      <Link
        href={`/map?lat=${latitude}&lng=${longitude}&uuid=${parkingLotUuid}`}
      >
        <div className="flex-shrink-0 relative w-[64px] h-[62px]">
          <MarkerIcon className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 !w-6 !h-6" />
          <Image
            src="/img/map-thumb.png"
            alt="지도 썸네일"
            width={64}
            height={64}
          />
        </div>
      </Link>
    </section>
  );
}

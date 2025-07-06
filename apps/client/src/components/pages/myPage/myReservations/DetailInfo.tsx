import { statusBadgeMap } from '@/data/initialDatas';
import { ReservationStatus } from '@/types/reservationDataTypes';
import { CommonBadge } from '@repo/ui/components/common/CommonLayouts';
import Image from 'next/image';

export default function DetailInfo({
  reservationCode,
  parkingLotName,
  status,
  thumbnailUrl,
}: {
  reservationCode: string;
  parkingLotName: string;
  status: ReservationStatus;
  thumbnailUrl: string;
}) {
  const badge = statusBadgeMap[status];
  return (
    <section>
      {/* <p className="text-gray-2 text-xs pb-1">예약코드 : {reservationCode}</p> */}
      <div className="flex  items-center gap-3">
        <Image
          src={thumbnailUrl ?? '/img/no-image.png'}
          alt="thumbnail"
          width={70}
          height={70}
          className="rounded-2xl aspect-square object-cover"
        />
        <div>
          <h1 className="font-bold text-lg">{parkingLotName}</h1>
          {badge && (
            <CommonBadge className={badge.className}>{badge.label}</CommonBadge>
          )}
        </div>
      </div>
    </section>
  );
}

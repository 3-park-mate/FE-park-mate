import { statusBadgeMap } from '@/data/initialDatas';
import { ReservationItemDataType } from '@/types/reservationDataTypes';
import { formatDate } from '@/utils/datetimeUtils';
import { CommonBadge } from '@repo/ui/components/common/CommonLayouts';
import { Car, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function MyReservationItem({
  data,
}: {
  data: ReservationItemDataType;
}) {
  const badge = statusBadgeMap[data.status];
  return (
    <Link
      href={`my-reservations/${data.reservationCode}`}
      className="flex justify-between items-center
       cursor-pointer"
    >
      <div className="flex flex-col">
        <p className="text-15px pb-0.5">{data.parkingLotName}</p>
        <p className="text-gray-3 py-0.5 text-13px">
          {formatDate(data.entryTime)} - {formatDate(data.exitTime)}
        </p>
        <p className="flex items-center gap-1 text-gray-3 text-13px">
          <Car fill="currentColor" className="text-gray-light-2" size={18} />
          {data.vehicleNumber}
        </p>
      </div>
      <div className="flex flex-shrink-0 flex-col items-end gap-2">
        <ChevronRight className="text-gray-3" size={18} />
        {badge && (
          <CommonBadge className={badge.className}>{badge.label}</CommonBadge>
        )}
      </div>
    </Link>
  );
}

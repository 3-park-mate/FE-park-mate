import { CommonBadge } from '@repo/ui/components/common/CommonLayouts';
import { Car, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function MyReservationItem() {
  return (
    <div>
      <Link
        href="/my-reservations/1"
        className="flex justify-between items-center
       cursor-pointer"
      >
        <div className="flex flex-col">
          {/* <ParkingSpotDetail
            name="주차장이름 주차장이름"
            locations="부산광역시북구"
          /> */}
          <p className="text-15px pb-0.5">주차장이름 주차장이름 주차장이름</p>
          <p className="text-gray-3 py-0.5 text-13px">
            05. 29. (목) 08:30 - 05. 29. (목) 08:30
          </p>
          <p className="flex items-center gap-1 text-gray-3 text-13px">
            <Car fill="currentColor" className="text-gray-light-2" size={18} />
            12가3456
          </p>
        </div>
        <div className="flex flex-shrink-0 flex-col items-end gap-2">
          <ChevronRight className="text-gray-3" size={18} />
          <CommonBadge className="mt-auto">이용완료</CommonBadge>
        </div>
      </Link>
    </div>
  );
}

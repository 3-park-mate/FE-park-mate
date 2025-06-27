import { getMyParkingLots } from '@/actions/parking/parking-service';
import ParkingCarousel from '@/components/common/ParkingCarousel';
import { ParkingLotItem } from '@/types/parkingDataTypes';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default async function MyParkingLotSection() {
  const { data: parkingLots } = (await getMyParkingLots()) as {
    success: true;
    data: ParkingLotItem[];
  };

  return (
    <section className="pl-6">
      <div className="flex items-center justify-between">
        <h2 className="text-[22px] font-bold py-4">내 주차장</h2>
        <Link href="/my-parking-lot" className="mr-6">
          <p className="flex items-center gap-0.5 text-13px text-gray-2">
            전체보기
            <ChevronRight size={14} />
          </p>
        </Link>
      </div>
      <ParkingCarousel carouselDatas={parkingLots} />
    </section>
  );
}

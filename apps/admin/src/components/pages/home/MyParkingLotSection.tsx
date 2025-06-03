import ParkingCarousel from '@/components/common/ParkingCarousel';
import { parkingCarouselItemsDummy } from '@/data/parkingDummyDatas';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function MyParkingLotSection() {
  return (
    <section className="pl-6">
      <div className="flex items-center justify-between">
        <h2 className="text-[22px] font-bold py-4">내 주차장</h2>
        <Link href="#" className="mr-6">
          <p className="flex items-center gap-0.5 text-13px text-gray-2">
            전체보기
            <ChevronRight size={14} />
          </p>
        </Link>
      </div>
      <ParkingCarousel carouselDatas={parkingCarouselItemsDummy} />
    </section>
  );
}

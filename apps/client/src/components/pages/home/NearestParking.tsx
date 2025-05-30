import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import ParkingCarousel from '@/components/common/ParkingCarousel';

export default function NearestParking() {
  return (
    <section className="pl-6">
      <div className="flex items-center justify-between">
        <h2 className="text-[22px] font-bold py-4">
          주변 주차장을 둘러보세요.
        </h2>
        <Link href="#" className="mr-6">
          <p className="flex items-center gap-0.5 text-13px text-gray-2">
            전체보기
            <ChevronRight size={14} />
          </p>
        </Link>
      </div>
      <ParkingCarousel />
    </section>
  );
}

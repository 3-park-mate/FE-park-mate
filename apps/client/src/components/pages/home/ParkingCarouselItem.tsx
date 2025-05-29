import ParkingSpotDetail from '@repo/ui/components/common/ParkingSpotDetail';
import { Star } from 'lucide-react';
import Image from 'next/image';

export default function ParkingCarouselItem() {
  return (
    <div>
      <div
        className="relative rounded-md overflow-hidden 
        bg-gray-1 flex aspect-[3/2] mb-2"
      >
        <Image
          src="https://dummyimage.com/155x102"
          alt="주차장 이미지"
          fill
          className="object-cover"
        />
        <div className="absolute bottom-2 right-2 text-xs bg-primary-dark-50 px-2 py-1 rounded-lg shadow-md">
          1,000원<span className="text-[10px] text-black/80">/1시간</span>
        </div>
      </div>
      <ParkingSpotDetail name="주차장명" locations="100m" />
      <p className="flex items-center gap-1 text-[13px]">
        <Star fill="currentColor" className="text-[#ffc800]" size={14} /> 4.9
      </p>
    </div>
  );
}

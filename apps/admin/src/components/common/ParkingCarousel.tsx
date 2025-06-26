import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@repo/ui/components/base/carousel';
import { ChevronRightCircle } from 'lucide-react';
import Link from 'next/link';
import ParkingCardItem from './ParkingCardItem';
import { ParkingLotItem } from '@/types/parkingDataTypes';

export default function ParkingCarousel({
  carouselDatas,
}: {
  carouselDatas: ParkingLotItem[];
}) {
  return (
    <Carousel
      opts={{
        align: 'start',
      }}
      className="w-full"
    >
      <CarouselContent className="select-none">
        {carouselDatas.map((item, index) => (
          <CarouselItem
            key={index}
            className="flex-[0_0_auto] min-w-[155px] min-[500px]:min-w-[180px] max-w-[180px]"
          >
            <ParkingCardItem {...item} />
          </CarouselItem>
        ))}
        <CarouselItem
          key="view-all"
          className="flex flex-col flex-[0_0_auto] min-w-[155px] min-[500px]:min-w-[180px]
            justify-center items-center pb-6 pr-6"
        >
          <Link href="/my-parking-lot">
            <ChevronRightCircle
              className="text-gray-dark-1"
              size={45}
              strokeWidth={1}
            />
            <p className="text-sm pt-1 text-gray-dark-2">전체보기</p>
          </Link>
        </CarouselItem>
      </CarouselContent>
    </Carousel>
  );
}

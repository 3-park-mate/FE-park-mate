import { parkingCarouselItemsDummy } from '@/data/parkingDummyDatas';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@repo/ui/components/base/carousel';
import ParkingCarouselItem from './ParkingCarouselItem';
import { ChevronRightCircle } from 'lucide-react';
import Link from 'next/link';

export default function ParkingCarousel() {
  return (
    <Carousel
      opts={{
        align: 'start',
      }}
      className="w-full"
    >
      <CarouselContent className="select-none">
        {parkingCarouselItemsDummy.map((item, index) => (
          <CarouselItem
            key={index}
            className="flex-[0_0_auto] min-w-[155px] min-[500px]:min-w-[180px]"
          >
            <ParkingCarouselItem {...item} />
          </CarouselItem>
        ))}
        <CarouselItem
          key="view-all"
          className="flex flex-col flex-[0_0_auto] min-w-[155px] min-[500px]:min-w-[180px]
            justify-center items-center pb-6 pr-6"
        >
          <Link href="#">
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

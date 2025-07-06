import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@repo/ui/components/base/carousel';
import ParkingCardItemSkeleton from './ParkingCardItemSkeleton';

export default function ParkingCarouselSkeleton() {
  const numberOfSkeletons = 4;

  return (
    <Carousel
      opts={{
        align: 'start',
      }}
      className="w-full"
    >
      <CarouselContent className="select-none">
        {[...Array(numberOfSkeletons)].map((_, index) => (
          <CarouselItem
            key={index}
            className="flex-[0_0_auto] min-w-[155px] min-[500px]:min-w-[180px] max-w-[164px]"
          >
            <ParkingCardItemSkeleton />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}

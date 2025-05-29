import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@repo/ui/components/base/carousel';
import ParkingCarouselItem from './ParkingCarouselItem';

export default function NearestParking() {
  return (
    <section className="pl-6">
      <h2 className="text-[22px] font-bold py-4">주변 주차장을 둘러보세요.</h2>
      <Carousel
        opts={{
          align: 'start',
        }}
        className="w-full"
      >
        <CarouselContent className="select-none">
          {Array.from({ length: 6 }).map((_, index) => (
            <CarouselItem
              key={index}
              className="flex-[0_0_auto] min-w-[155px] min-[500px]:min-w-[180px]"
            >
              <ParkingCarouselItem />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
}

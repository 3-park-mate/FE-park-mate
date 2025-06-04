'use client';
import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@repo/ui/components/base/carousel';
import Image from 'next/image';

export default function ImageCarouselWithDots({
  images,
}: {
  images: { src: string }[];
}) {
  const [api, setApi] = React.useState<any>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };

    api.on('select', onSelect);

    return () => {
      api.off('select', onSelect);
    };
  }, [api]);

  return (
    <>
      <Carousel opts={{ align: 'center' }} className="w-full" setApi={setApi}>
        <CarouselContent className="select-none">
          {images.map((img, index) => (
            <CarouselItem key={index} className="basis-5/6">
              <div className="relative rounded-md overflow-hidden bg-gray-1 flex aspect-[3/2]">
                <Image
                  src={img.src}
                  alt={`이미지 ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="left-1 top-1/2 -translate-y-1/2 transition-opacity duration-300 disabled:opacity-0 disabled:pointer-events-none" />
        <CarouselNext className="right-1 top-1/2 -translate-y-1/2 transition-opacity duration-300 disabled:opacity-0 disabled:pointer-events-none" />
      </Carousel>

      <div className="flex justify-center space-x-2 mt-4">
        {Array.from({ length: count }).map((_, i) => (
          <button
            key={i}
            aria-label={`슬라이드 ${i + 1}`}
            className={`w-[9px] h-[9px] rounded-full transition-colors duration-300 cursor-pointer ${
              current === i ? 'bg-primary-dark' : 'bg-gray-300'
            }`}
            onClick={() => api?.scrollTo(i)}
          />
        ))}
      </div>
    </>
  );
}

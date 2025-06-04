import ImageCarouselWithDots from '@/components/common/ImageCarouselWithDots';

export default function ImageCarouselSection() {
  const images = [
    { src: 'https://dummyimage.com/326x205' },
    { src: 'https://dummyimage.com/326x205' },
    { src: 'https://dummyimage.com/326x205' },
    { src: 'https://dummyimage.com/326x205' },
    { src: 'https://dummyimage.com/326x205' },
  ];

  return (
    <section className="bg-white py-7 px-5">
      <ImageCarouselWithDots images={images} />
    </section>
  );
}

import ImageCarouselWithDots from '@/components/common/ImageCarouselWithDots';

export default function ImageCarouselSection({
  imageUrls,
}: {
  imageUrls: string[];
}) {
  return (
    <section className="bg-white py-7 px-5" id="images">
      <h2 className="text-lg font-semibold mb-5">주차장 사진</h2>
      <ImageCarouselWithDots images={imageUrls} />
    </section>
  );
}

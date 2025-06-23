import MarkerIcon from '@repo/ui/components/icon/MarkerIcon';
import Image from 'next/image';

export default function AddressSection() {
  return (
    <section className="flex flex-row justify-between items-center gap-3">
      <div className="flex-1 min-w-0 space-y-1">
        <p className="text-gray-2 text-15px">주소</p>
        <p className="text-15px font-semibold">
          부산광역시북구부산광역시북구부산광역시북구
        </p>
        <p className="text-sm text-gray-2">상세주소가 들어갑니다.</p>
      </div>
      <div className="flex-shrink-0 relative w-[64px] h-[62px]">
        <MarkerIcon className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 !w-6 !h-6" />
        <Image
          src="/img/map-thumb.png"
          alt="지도 썸네일"
          width={64}
          height={64}
        />
      </div>
    </section>
  );
}

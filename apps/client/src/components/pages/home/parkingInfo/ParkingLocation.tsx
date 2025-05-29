import MarkerIcon from '@repo/ui/components/icon/MarkerIcon';
import Image from 'next/image';

export default function ParkingLocation() {
  return (
    <div className="flex justify-between items-center">
      <div>
        <p className="text-[15px] pb-0.5">코엑스 제2빌딩 주차장 A</p>
        <p className="flex items-center gap-1 text-gray-3 text-[13px]">
          <MarkerIcon size={12} className="text-gray-light-2" /> 0.31 mi away ·
          B09 (Base 7)
        </p>
      </div>
      <div className="bg-white w-12 aspect-square rounded-lg drop-shadow-lg flex justify-center items-center">
        {/* <Image
          src="https://dummyimage.com/32x32"
          alt="qr-image"
          width={32}
          height={32}
        /> */}
      </div>
    </div>
  );
}

import ParkingSpotDetail from '@repo/ui/components/common/ParkingSpotDetail';
import Image from 'next/image';

export default function ParkingLocation() {
  return (
    <div className="flex justify-between items-center">
      <ParkingSpotDetail
        name="코엑스 제2빌딩 주차장 A"
        locations="100m · B09 (7구역)"
      />
      <div className="bg-white w-12 aspect-square rounded-lg drop-shadow-lg flex justify-center items-center">
        <Image
          src="https://dummyimage.com/32x32"
          alt="qr-image"
          width={32}
          height={32}
        />
      </div>
    </div>
  );
}

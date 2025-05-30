import { ParkingLocationDataType } from '@/types/parkingDataTypes';
import ParkingSpotDetail from '@repo/ui/components/common/ParkingSpotDetail';
import { Car } from 'lucide-react';
import Image from 'next/image';

export default function ParkingLocation({
  parkingLotName,
  parkingLotDistance,
  parkingSpotName,
  vehicleNumber,
}: ParkingLocationDataType) {
  return (
    <div className="flex justify-between items-center">
      <div>
        <ParkingSpotDetail
          name={parkingLotName}
          locations={`${parkingLotDistance}m · ${parkingSpotName}`}
        />
        <p className="flex items-center gap-1 text-gray-3 text-13px">
          <Car fill="currentColor" className="text-gray-light-2" size={18} />
          {vehicleNumber}
        </p>
      </div>
      {/* parkingLotDistance 거리에 따라서 km, m 변환 추가 필요 */}
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

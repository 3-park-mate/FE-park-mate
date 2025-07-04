import { PaddedSectionWithTitle } from '@repo/ui/components/common/CommonLayouts';
import MyCarItem from '../myPage/myCar/MyCarItem';
import { Car } from 'lucide-react';

export default function CarInfoSection({
  vehicleNumber,
}: {
  vehicleNumber: string;
}) {
  return (
    <PaddedSectionWithTitle title="이용 차량 정보" className="relative">
      {/* <MyCarItem
        vehicleNumber={vehicleNumber}
        isDefault
        nickname="차량별명"
        userVehicleNumbersId={1}
        showDeleteButton={false}
      /> */}
      <p className="flex items-center gap-1 text-gray-3 text-15px">
        <Car fill="currentColor" className="text-gray-light-2" size={18} />
        {vehicleNumber}
      </p>
      {/* <Button className="absolute top-6 right-6 h-7">변경</Button> */}
    </PaddedSectionWithTitle>
  );
}

import { PaddedSectionWithTitle } from '@repo/ui/components/common/CommonLayouts';
import MyCarItem from '../myPage/myCar/MyCarItem';

export default function CarInfoSection() {
  return (
    <PaddedSectionWithTitle title="이용 차량 정보" className="relative">
      <MyCarItem
        vehicleNumber="12가1234"
        isDefault
        nickname="차량별명"
        userVehicleNumbersId={1}
        showDeleteButton={false}
      />
      {/* <Button className="absolute top-6 right-6 h-7">변경</Button> */}
    </PaddedSectionWithTitle>
  );
}

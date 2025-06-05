import { ParkingCarouselItemDataType } from '@/types/parkingDataTypes';
import ParkingCardItem from '../../common/ParkingCardItem';

export default function MyParkingLotListSection({
  parkingLotDatas,
}: {
  parkingLotDatas: ParkingCarouselItemDataType[];
}) {
  return (
    <section className="grid grid-cols-2 gap-4">
      {parkingLotDatas.map((item, index) => (
        <ParkingCardItem key={index} {...item} />
      ))}
    </section>
  );
}

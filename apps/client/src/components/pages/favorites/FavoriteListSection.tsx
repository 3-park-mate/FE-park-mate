import ParkingCardlItem from '@/components/common/ParkingCardItem';
import { ParkingCarouselItemDataType } from '@/types/parkingDataTypes';

export default function FavoriteListSection({
  favoriteDatas,
}: {
  favoriteDatas: ParkingCarouselItemDataType[];
}) {
  return (
    <section className="grid grid-cols-2 gap-4">
      {favoriteDatas.map((item, index) => (
        <ParkingCardlItem key={index} {...item} />
      ))}
    </section>
  );
}

import ParkingCardItem from '@/components/common/ParkingCardItem';
import { ParkingCarouselItemDataType } from '@/types/parkingDataTypes';
import { PaddedSection } from '@repo/ui/components/common/CommonLayouts';

export default function FavoriteListSection({
  favoriteDatas,
}: {
  favoriteDatas: ParkingCarouselItemDataType[];
}) {
  return (
    <PaddedSection className="grid grid-cols-2 gap-4 py-4">
      {favoriteDatas.map((item, index) => (
        <ParkingCardItem key={index} {...item} />
      ))}
    </PaddedSection>
  );
}

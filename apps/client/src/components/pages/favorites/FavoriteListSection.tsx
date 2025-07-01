import { getFavoritesData } from '@/actions/user/user-service';
import ParkingCardItem from '@/components/common/ParkingCardItem';
import { PaddedSection } from '@repo/ui/components/common/CommonLayouts';

export default async function FavoriteListSection() {
  const { data: favoriteDatas } = (await getFavoritesData()) as {
    success: true;
    data: { parkingLotUuid: string }[];
  };
  return (
    <PaddedSection className="grid grid-cols-2 gap-4 py-4">
      {favoriteDatas.map((item, index) => (
        <ParkingCardItem key={index} parkingLotUuid={item.parkingLotUuid} />
      ))}
    </PaddedSection>
  );
}

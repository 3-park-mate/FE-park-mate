import { getFavoritesData } from '@/actions/user/user-service';
import GnbNavBar from '@/components/layouts/GnbNavBar';
import SimpleHeader from '@/components/layouts/SimpleHeader';
import FavoriteListSection from '@/components/pages/favorites/FavoriteListSection';
import { parkingCarouselItemsDummy } from '@/data/parkingDummyDatas';

export default async function page() {
  const { data: favoriteDatas } = (await getFavoritesData()) as {
    success: true;
    data: { parkingLotUuid: string }[];
  };

  return (
    <>
      <SimpleHeader title="즐겨찾기" />
      <main className="pb-32">
        <FavoriteListSection favoriteDatas={parkingCarouselItemsDummy} />
      </main>
      <GnbNavBar />
    </>
  );
}

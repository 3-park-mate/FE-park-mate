import GnbNavBar from '@/components/layouts/GnbNavBar';
import HomeMainHeader from '@/components/layouts/HomeMainHeader';
import FavoriteListSection from '@/components/pages/favorites/FavoriteListSection';
import { parkingCarouselItemsDummy } from '@/data/parkingDummyDatas';

export default function page() {
  return (
    <>
      <HomeMainHeader title="즐겨찾기" type="backButton" />
      <main className="pb-32">
        <FavoriteListSection favoriteDatas={parkingCarouselItemsDummy} />
      </main>
      <GnbNavBar />
    </>
  );
}

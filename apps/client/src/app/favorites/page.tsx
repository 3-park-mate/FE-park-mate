import SortDropdown from '@/components/common/SortDropDown';
import GnbNavBar from '@/components/layouts/GnbNavBar';
import HomeMainHeader from '@/components/layouts/HomeMainHeader';
import FavoriteListSection from '@/components/pages/favorites/FavoriteListSection';
import { favoritesSortMenu } from '@/data/initialDatas';
import { parkingCarouselItemsDummy } from '@/data/parkingDummyDatas';
import { PaddedLayout } from '@repo/ui/components/common/CommonLayouts';

export default function page() {
  return (
    <>
      <HomeMainHeader title="즐겨찾기" type="backButton" />
      <main className="pb-32">
        <PaddedLayout>
          <SortDropdown
            className="pt-1 pb-3"
            paramKey="sort"
            options={favoritesSortMenu}
          />
          <FavoriteListSection favoriteDatas={parkingCarouselItemsDummy} />
        </PaddedLayout>
      </main>
      <GnbNavBar />
    </>
  );
}

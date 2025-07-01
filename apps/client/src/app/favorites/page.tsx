import GnbNavBar from '@/components/layouts/GnbNavBar';
import SimpleHeader from '@/components/layouts/SimpleHeader';
import FavoriteListSection from '@/components/pages/favorites/FavoriteListSection';

export default async function page() {
  return (
    <>
      <SimpleHeader title="즐겨찾기" />
      <main className="pb-32">
        <FavoriteListSection />
      </main>
      <GnbNavBar />
    </>
  );
}

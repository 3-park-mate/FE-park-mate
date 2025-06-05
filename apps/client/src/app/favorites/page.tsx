import GnbNavBar from '@/components/layouts/GnbNavBar';
import HomeMainHeader from '@/components/layouts/HomeMainHeader';

export default function page() {
  return (
    <>
      <HomeMainHeader title="즐겨찾기" type="backButton" />
      <main className="pb-32"></main>
      <GnbNavBar />
    </>
  );
}

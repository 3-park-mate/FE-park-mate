import ActionSection from '@/components/pages/home/ActionSection';
import MenuSection from '@/components/pages/home/MenuSection';
import MapPinIcon from '@repo/ui/components/icon/MapPinIcon';
import SearchIcon from '@repo/ui/components/icon/SearchIcon';

export default function page() {
  return (
    <main>
      <header className="px-5 flex justify-between bg-white pt-12 pb-6 items-center">
        <div className="flex items-center space-x-2 font-semibold">
          <MapPinIcon className="size-8" />
          <p>서울 강남 코엑스 주변</p>
        </div>
        <SearchIcon className="size-7" />
      </header>
      {/* <ActionSection />
      <MenuSection /> */}
    </main>
  );
}

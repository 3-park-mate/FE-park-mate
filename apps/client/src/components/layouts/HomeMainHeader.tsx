import SearchIcon from '@repo/ui/components/icon/SearchIcon';
import MarkerIcon from '@repo/ui/components/icon/MarkerIcon';

export default function HomeMainHeader() {
  return (
    <>
      <header className="flex justify-between items-center bg-white p-5 shadow-md">
        <div className="flex items-center space-x-2">
          <MarkerIcon className="size-6" />
          <p className="text-[0.813rem] font-semibold">서울 강남 코엑스 주변</p>
        </div>
        <SearchIcon className="size-6.5" />
      </header>
    </>
  );
}

import SearchIcon from '@repo/ui/components/icon/SearchIcon';
import MarkerIcon from '@repo/ui/components/icon/MarkerIcon';
import AlertBell from '../common/AlertBell';

export default function HomeMainHeader() {
  return (
    <header className="fixed top-0 w-full max-w-[600px] h-[65px] flex justify-between items-center bg-white p-5 shadow-md space-x-[9px] z-50">
      <div className="w-full flex items-center gap-2">
        <MarkerIcon className="size-6" />
        <p className="text-[0.813rem] font-semibold">서울 강남 코엑스 주변</p>
      </div>
      <SearchIcon className="size-[24px] flex-none" />
      <AlertBell count={4} />
    </header>
  );
}

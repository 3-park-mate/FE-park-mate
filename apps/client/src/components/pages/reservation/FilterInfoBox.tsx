import { useParkingFilterStore } from '@/store/useParkingFilterStore';
import { ReservationInfoBoxProps } from '@/types/filterInfoType';

export function FilterInfoBox({
  id = 'schedule',
  boxName = '',
  buttonName = '',
  selected,
  children,
  onClick,
}: ReservationInfoBoxProps) {
  const filterInfo = useParkingFilterStore((state) => state);

  return selected || filterInfo[id] ? (
    <>
      <div className="rounded-sm px-6 pt-4 bg-white shadow-md transition-all">
        <h2 className="text-2xl font-semibold">{boxName}</h2>
        {children}
      </div>
    </>
  ) : (
    <div
      className="h-[50px] rounded-sm px-4 bg-white flex justify-between items-center shadow-md"
      onClick={onClick}
    >
      <p className="text-[16px] text-gray-2 font-bold">{boxName}</p>
      <p>{buttonName}</p>
    </div>
  );
}

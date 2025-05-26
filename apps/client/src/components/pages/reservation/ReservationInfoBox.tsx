import { ReservationInfoBoxProps } from '@/types/reservationType';

export function ReservationInfoBox({
  boxName = '',
  buttonName = '',
  selected,
  children,
  onClick,
}: ReservationInfoBoxProps) {
  return selected ? (
    <>
      <div className="rounded-sm p-6 bg-white/60 shadow-md  transition-all">
        <h2 className="text-2xl font-semibold transition-none">{boxName}</h2>
        {children}
      </div>
    </>
  ) : (
    <div
      className="h-[50px] rounded-sm px-4 bg-white/60 flex justify-between items-center shadow-md cursor-pointer"
      onClick={onClick}
    >
      <p className="text-[16px] text-gray-2 font-bold">{boxName}</p>
      <p>{buttonName}</p>
    </div>
  );
}

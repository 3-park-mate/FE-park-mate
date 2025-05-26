import { ReservationInfoBoxProps } from '@/types/reservationType';

export function ReservationInfoBox({
  boxName = '',
  buttonName = '',
  id = '',
  onClick,
}: ReservationInfoBoxProps) {
  return (
    <div className="h-[50px] rounded-sm px-4 bg-white/60 flex justify-between items-center shadow-md">
      <p className="text-[16px] text-gray-2 font-bold">{boxName}</p>
      {/* <button onClick={onClick} className="text-[16px]">
        {buttonName}
      </button> */}
      <p>{buttonName}</p>
    </div>
  );
}

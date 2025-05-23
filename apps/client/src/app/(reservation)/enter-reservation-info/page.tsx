import React from 'react';

interface ReservationInfoBoxProps {
  boxName: string;
  buttonName: string;
  onClick?: () => void;
}

export default function page() {
  return (
    <div className="px-5">
      <header className="text-[24px] font-semibold py-10">
        예약 정보를 입력해주세요.
      </header>
      <section className="space-y-4 pt-5">
        <ReservationInfoBox boxName="위치" buttonName="장소 추가" />
        <ReservationInfoBox boxName="날짜" buttonName="날짜 추가" />
        <ReservationInfoBox boxName="차량" buttonName="차량 정보 추가" />
      </section>
    </div>
  );
}

export function ReservationInfoBox({
  boxName = '',
  buttonName = '',
  onClick,
}: ReservationInfoBoxProps) {
  return (
    <div className="h-[50px] rounded-sm px-4 bg-white/60 flex justify-between items-center shadow-md">
      <p className="text-[16px] text-gray-2 font-bold">{boxName}</p>
      <button onClick={onClick} className="text-[16px]">
        {buttonName}
      </button>
    </div>
  );
}

import ReservationInfoSection from '@/components/pages/reservation/ReservationInfoSection';
import React from 'react';

export default function page() {
  return (
    <>
      <header className="text-[24px] font-semibold py-6 px-5">
        예약 정보를 입력해주세요.
      </header>
      <main>
        <ReservationInfoSection />
      </main>
    </>
  );
}

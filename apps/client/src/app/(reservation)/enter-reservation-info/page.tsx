import FilterInfoSection from '@/components/pages/reservation/FilterInfoSection';
import React from 'react';

export default function page() {
  return (
    <>
      <header className="text-[24px] font-semibold py-6 px-5">
        검색 조건을 입력해주세요.
      </header>
      <main>
        <FilterInfoSection />
      </main>
    </>
  );
}

import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import MenuButton from './MenuButton';
import { menuItems } from '@/data/initialDatas';

export default function MenuSection() {
  return (
    <section
      className="absolute left-0 right-0 bottom-0 top-[500px] 
        bg-white rounded-t-[50px] p-8 shadow-2xl
        flex flex-col"
    >
      <h2 className="font-semibold text-lg pb-5">주요서비스 바로가기</h2>
      <div className="flex justify-between px-5">
        {menuItems.map((menu) => (
          <MenuButton item={menu} key={menu.label} />
        ))}
      </div>
      <Link
        href="/"
        className="bg-primary rounded-[20px]
          text-white font-semibold text-lg
          py-3 px-5
          flex justify-between items-center mt-auto"
      >
        호스트 서비스 바로가기
        <ChevronRight />
      </Link>
    </section>
  );
}

import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import MenuButtonArea from './MenuButtonArea';

const menuItems = [
  {
    icon: '/icon/star-icon-fill.svg',
    label: '즐겨찾기',
    href: '#',
  },
  {
    icon: '/icon/user-icon-fill.svg',
    label: '마이페이지',
    href: '#',
  },
  {
    icon: '/icon/chat-icon-fill.svg',
    label: '채팅',
    href: '#',
  },
  {
    icon: '/icon/rsv-icon-fill.svg',
    label: 'My예약',
    href: '#',
  },
];

export default function MenuSection() {
  return (
    <section
      className="absolute left-0 right-0 bottom-0 top-[500px] 
        bg-white rounded-t-[50px] p-8 shadow-2xl
        flex flex-col"
    >
      <h2 className="font-semibold text-lg pb-5">주요서비스 바로가기</h2>
      <MenuButtonArea items={menuItems} />
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

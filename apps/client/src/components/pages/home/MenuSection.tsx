import { ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default function MenuSection() {
  return (
    <section
      className="absolute left-0 right-0 bottom-0 top-[500px] 
        bg-white rounded-t-[50px] p-8 shadow-2xl
        flex flex-col"
    >
      <h2 className="font-semibold text-lg pb-5">주요서비스 바로가기</h2>
      <ul className="flex justify-between px-6">
        <li className="flex flex-col gap-1 items-center">
          <div
            className="w-14 h-14 bg-gray-light-1 rounded-[20px]
              flex justify-center items-center"
          >
            <Image
              src="/icon/star-icon-fill.svg"
              alt="icon"
              width={33}
              height={33}
            />
          </div>
          <p className="font-light text-xs">즐겨찾기</p>
        </li>
        <li className="flex flex-col gap-1 items-center">
          <div
            className="w-14 h-14 bg-gray-light-1 rounded-[20px]
              flex justify-center items-center"
          >
            <Image
              src="/icon/user-icon-fill.svg"
              alt="icon"
              width={33}
              height={33}
            />
          </div>
          <p className="font-light text-xs">마이페이지</p>
        </li>
        <li className="flex flex-col gap-1 items-center">
          <div
            className="w-14 h-14 bg-gray-light-1 rounded-[20px]
              flex justify-center items-center"
          >
            <Image
              src="/icon/chat-icon-fill.svg"
              alt="icon"
              width={33}
              height={33}
            />
          </div>
          <p className="font-light text-xs">채팅</p>
        </li>
        <li className="flex flex-col gap-1 items-center">
          <div
            className="w-14 h-14 bg-gray-light-1 rounded-[20px]
              flex justify-center items-center"
          >
            <Image
              src="/icon/rsv-icon-fill.svg"
              alt="icon"
              width={38}
              height={38}
            />
          </div>
          <p className="font-light text-xs">My예약</p>
        </li>
      </ul>
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

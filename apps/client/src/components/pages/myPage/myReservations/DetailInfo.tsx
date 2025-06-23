import { CommonBadge } from '@repo/ui/components/common/CommonLayouts';
import Image from 'next/image';

export default function DetailInfo() {
  return (
    <section>
      <p className="text-gray-2 text-xs pb-1">예약번호 : 1234</p>
      <div className="flex  items-center gap-3">
        <Image
          src="https://dummyimage.com/140x140"
          alt="thumbnail"
          width={70}
          height={70}
          className="rounded-2xl"
        />
        <div>
          <h1 className="font-bold text-lg">주차장 이름</h1>
          <CommonBadge className="mt-1">이용 완료</CommonBadge>
        </div>
      </div>
    </section>
  );
}

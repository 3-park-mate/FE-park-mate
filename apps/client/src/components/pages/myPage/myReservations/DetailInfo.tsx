import { CommonBadge } from '@repo/ui/components/common/CommonLayouts';
import Image from 'next/image';

export default function DetailInfo() {
  return (
    <section className="flex gap-4 items-center">
      <Image
        src="https://dummyimage.com/140x140"
        alt="thumbnail"
        width={80}
        height={80}
        className="rounded-2xl"
      />
      <div>
        <h1 className="font-bold text-xl">주차장 이름입니다,</h1>
        <CommonBadge className="pt-1">이용 완료</CommonBadge>
      </div>
    </section>
  );
}

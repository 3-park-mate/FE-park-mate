import { CommonBadge } from '@repo/ui/components/common/CommonLayouts';
import Image from 'next/image';

export default function DetailInfo() {
  return (
    <section className="flex justify-between items-center">
      <div className="flex gap-4 items-center">
        <Image
          src="https://dummyimage.com/140x140"
          alt="thumbnail"
          width={70}
          height={70}
          className="rounded-2xl"
        />
        <div>
          <h1 className="font-bold text-lg">
            주차장 이름주차장 이름주차장 이름주차장 이름주차장 이름
          </h1>
          <CommonBadge className="mt-1">이용 완료</CommonBadge>
        </div>
      </div>
      {/* <button className="bg-white w-12 h-12 aspect-square rounded-lg drop-shadow-lg flex justify-center items-center cursor-pointer">
        <Image
          src="https://dummyimage.com/32x32"
          alt="qr-image"
          width={32}
          height={32}
        />
      </button> */}
    </section>
  );
}

import {
  IconWithText,
  PaddedSectionWithTitle,
} from '@repo/ui/components/common/CommonLayouts';
import { MapPin } from 'lucide-react';
import Image from 'next/image';

export default function OrderInfoSection() {
  return (
    <PaddedSectionWithTitle title="주문상세">
      <dl className="space-y-2 text-sm text-gray-600">
        <div className="flex justify-between">
          <dt>주문 코드</dt>
          <dd>ORD12345678</dd>
        </div>
        <div className="flex items-center gap-3 pt-1">
          <Image
            src="https://dummyimage.com/155x102"
            alt="thumbnail"
            width={70}
            height={70}
            className="rounded-xl aspect-square object-cover"
          />
          <div>
            <h1 className="font-bold text-lg text-black">주차장이름</h1>
            <IconWithText Icon={MapPin}>주소주소</IconWithText>
          </div>
        </div>
        <hr className="my-5" />
        <div className="flex justify-between">
          <dt>입차 시간</dt>
          <dd>2025-06-26 10:00</dd>
        </div>
        <div className="flex justify-between">
          <dt>출차 시간</dt>
          <dd>2025-06-26 12:30</dd>
        </div>
      </dl>
    </PaddedSectionWithTitle>
  );
}

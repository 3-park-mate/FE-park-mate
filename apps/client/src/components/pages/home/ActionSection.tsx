import { PaddedLayout } from '@repo/ui/components/base/CommonLayout';
import ActionButton from './ActionButton';
import Image from 'next/image';

export default function ActionSection() {
  return (
    <PaddedLayout className="space-y-2.5">
      <ActionButton
        title="즉시예약"
        className="bg-gradient-to-b from-primary to-primary-dark"
      >
        <p className="leading-5">
          내 근처 주차장을 찾고,
          <br />
          빠르게 예약하세요.
        </p>
        <Image
          src="/img/car-thumb.png"
          alt="button-thumbnail"
          width={111}
          height={112}
          className="absolute bottom-0 right-6"
          quality={100}
          priority
        />
      </ActionButton>
      <ActionButton
        title="둘러보기"
        className="bg-gradient-to-b from-white to-[#DDF6F6] 
              border-[1.5px] border-primary
              text-primary-dark"
      >
        <p className="leading-5">
          지도를 둘러보며
          <br />
          인근 주차장 정보를 탐색하세요.
        </p>
        <Image
          src="/img/search-thumb.png"
          alt="button-thumbnail"
          width={150}
          height={150}
          className="absolute -bottom-5 -right-2"
          quality={100}
          priority
        />
      </ActionButton>
    </PaddedLayout>
  );
}

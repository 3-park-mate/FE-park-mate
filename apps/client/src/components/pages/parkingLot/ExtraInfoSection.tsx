import { PaddedSection } from '@repo/ui/components/common/CommonLayouts';
import { Car, ChevronRight, MapPin, MessageSquare, Plug } from 'lucide-react';
import Link from 'next/link';

export default function ExtraInfoSection() {
  return (
    <PaddedSection className="py-7 space-y-2.5 bg-white">
      <div className="flex gap-1.5 items-center text-sm">
        <MapPin className="w-4 h-4 text-gray-2" />
        <span className="text-gray-2">부산광역시 해운대구 APEC로 17</span>
        <Link href="#" className="flex items-center text-secondary ms-1.5">
          지도 <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
      <div className="flex gap-1.5 items-center text-sm">
        <Plug className="w-4 h-4 text-gray-2" />
        <span className="text-gray-2">전기차 충전 가능</span>
      </div>
      <div className="flex gap-1.5 items-center text-sm">
        <Car className="w-4 h-4 text-gray-2" />
        <span className="text-gray-2">경차/소형차/중형차 수용 가능</span>
      </div>
      <div className="flex gap-1.5 text-sm">
        <MessageSquare className="w-4 h-4 text-gray-2 mt-0.5" />
        <span className="text-gray-2">
          기타 호스트가 입력한 정보 들어가는 부분
          <br />
          1. 정보
          <br />
          2. 등등
        </span>
      </div>
    </PaddedSection>
  );
}

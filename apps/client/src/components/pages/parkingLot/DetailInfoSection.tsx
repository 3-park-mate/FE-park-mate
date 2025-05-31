import Image from 'next/image';

import { Car, MapPin } from 'lucide-react';
import {
  CommonPriceBadge,
  Rating,
} from '@repo/ui/components/common/CommonLayouts';
import BadgeCheckIcon from '@repo/ui/components/icon/BadgeCheckIcon';

export default function DetailInfoSection() {
  return (
    <section className="relative">
      <div className="aspect-[155/102] flex items-center justify-center relative">
        <Image
          src="https://dummyimage.com/375x455"
          alt="주차장 이미지"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <div className="flex justify-between items-start mb-2">
            <div className="text-xs bg-gray-600 text-white px-2 py-1 rounded-lg">
              1/5
            </div>
            <CommonPriceBadge className="text-black">5,000원</CommonPriceBadge>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm">파크메이트 주차장</span>
            <BadgeCheckIcon size={14} />
          </div>

          <h1 className="text-2xl font-bold mb-2">
            어반포트 광화문 S타워 주차장
          </h1>
          <Rating className="mb-3">4.9 (349)</Rating>

          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>700m</span>
            </div>
            <div className="flex items-center gap-1">
              <Car className="w-4 h-4" />
              <span>12/20 주차면</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

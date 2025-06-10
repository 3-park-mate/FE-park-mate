import { buttonVariants } from '@repo/ui/components/base/button';
import {
  IconWithText,
  PaddedSection,
} from '@repo/ui/components/common/CommonLayouts';
import MarkerIcon from '@repo/ui/components/icon/MarkerIcon';
import { Car, ChevronRight, MapPin, MessageSquare, Plug } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import MapLinkButton from './MapLinkButton';

export default function DetailExtraInfoSection({
  mainAddress,
  evChargingAvailable,
  extraInfo,
}: {
  mainAddress: string;
  evChargingAvailable: boolean;
  extraInfo: string;
}) {
  return (
    <PaddedSection className="py-7 space-y-10 bg-white">
      {/* <IconWithText Icon={MapPin}>
        <div className="flex items-center gap-1.5">
          <span>{mainAddress}</span>
          <Link href="#" className="flex items-center text-secondary">
            지도 <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </IconWithText>
      {evChargingAvailable && (
        <IconWithText Icon={Plug}>전기차 충전 가능</IconWithText>
      )}
      <IconWithText Icon={Car}>경차/소형차/중형차 수용 가능</IconWithText>
      <IconWithText Icon={MessageSquare} className="mt-0.5">
        {extraInfo}
      </IconWithText> */}
      <div>
        <h2 className="text-lg font-semibold mb-2">개요</h2>
        <p className="text-sm text-gray-2">{extraInfo}</p>
      </div>
      <div>
        <h2 className="text-lg font-semibold mb-2">영업시간</h2>
        <p className="text-sm text-gray-2">월요일 : 09:00 - 24:00</p>
        <p className="text-sm text-gray-2">화요일(오늘) : 09:00 - 24:00</p>
      </div>
      <MapLinkButton mainAddress={mainAddress} />
    </PaddedSection>
  );
}

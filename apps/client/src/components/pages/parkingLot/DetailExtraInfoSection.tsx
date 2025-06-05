import {
  IconWithText,
  PaddedSection,
} from '@repo/ui/components/common/CommonLayouts';
import { Car, ChevronRight, MapPin, MessageSquare, Plug } from 'lucide-react';
import Link from 'next/link';

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
    <PaddedSection className="py-7 space-y-2.5 bg-white text-gray-2">
      <IconWithText Icon={MapPin}>
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
      </IconWithText>
    </PaddedSection>
  );
}

import { buttonVariants } from '@repo/ui/components/base/button';
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
        <h2 className="text-lg font-semibold mb-3">개요</h2>
        <p className="text-sm text-gray-2">{extraInfo}</p>
      </div>
      <div>
        <h2 className="text-lg font-semibold mb-3">영업시간</h2>
        <p className="text-sm text-gray-2">{extraInfo}</p>
      </div>
      <Link
        href="#"
        className={`${buttonVariants({ variant: 'default' })} w-full h-auto justify-start gap-5 rounded-2xl !bg-black`}
      >
        <div className="rounded-2xl w-16 h-16 bg-gray-1"></div>
        <div>
          <p className="text-primary text-15px">지도 바로가기</p>
          <p className="text-gray-3">{mainAddress}</p>
        </div>
        <ChevronRight className="text-primary !w-5 !h-5 ml-auto" />
      </Link>
      {/* <Link
        href="#"
        className="flex items-center justify-between p-2 w-full rounded-2xl bg-black text-primary"
      >
        <div className="rounded-2xl w-16 h-16 bg-gray-1"></div>
        {mainAddress}
        <ChevronRight />
      </Link> */}
    </PaddedSection>
  );
}

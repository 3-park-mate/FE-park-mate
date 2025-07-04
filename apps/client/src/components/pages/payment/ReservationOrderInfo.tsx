import { formatDate, formatDuration } from '@/utils/datetimeUtils';
import {
  IconWithText,
  PaddedSectionWithTitle,
} from '@repo/ui/components/common/CommonLayouts';
import { MapPin } from 'lucide-react';
import Image from 'next/image';

export default function ReservationOrderInfo({
  parkingLotName,
  address,
  entryTime,
  exitTime,
  amount,
  thumbnailUrl,
}: {
  parkingLotName: string;
  address: string;
  entryTime: string;
  exitTime: string;
  amount: number;
  thumbnailUrl: string;
}) {
  return (
    <PaddedSectionWithTitle title="주문상세">
      <dl className="space-y-2 text-sm text-gray-600">
        <div className="flex items-center gap-3 pt-1">
          <Image
            src={thumbnailUrl ?? `/img/no-image.png`}
            alt="thumbnail"
            width={70}
            height={70}
            className="rounded-xl aspect-square object-cover"
          />
          <div>
            <h1 className="font-bold text-lg text-black">{parkingLotName}</h1>
            <IconWithText Icon={MapPin}>{address}</IconWithText>
          </div>
        </div>
        <hr className="my-5" />
        <div className="flex justify-between">
          <dt>입차 시간</dt>
          <dd>{formatDate(entryTime)}</dd>
        </div>
        <div className="flex justify-between">
          <dt>출차 시간</dt>
          <dd>{formatDate(exitTime)}</dd>
        </div>
        <hr className="my-5" />
        <div className="flex justify-between">
          <dt>총 이용 시간</dt>
          <dd className="font-semibold text-black">
            {formatDuration(entryTime, exitTime)}
          </dd>
        </div>
        <div className="flex justify-between">
          <dt>이용 요금</dt>
          <dd className="font-bold text-black">{amount.toLocaleString()}원</dd>
        </div>
      </dl>
    </PaddedSectionWithTitle>
  );
}

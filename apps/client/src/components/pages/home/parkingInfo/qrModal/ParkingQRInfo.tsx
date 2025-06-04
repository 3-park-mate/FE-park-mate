import { ParkingQRDataType } from '@/types/parkingDataTypes';
import { formatDateParts } from '@/utils/datetimeUtils';
import { Button, buttonVariants } from '@repo/ui/components/base/button';
import { PaddedLayout } from '@repo/ui/components/common/CommonLayouts';
import Link from 'next/link';
import QRExtraInfoSection from './QRExtraInfoSection';
import QRcodeBoxSection from './QRcodeBoxSection';

export default function ParkingQRInfo({
  parkingLotUuid,
  parkingSpotName,
  vehicleNumber,
  entryTime,
  exitTime,
}: ParkingQRDataType) {
  const entry = formatDateParts(entryTime);
  const exit = formatDateParts(exitTime);

  const timeItems = [
    { label: '입차시간', time: entry.time, date: entry.date },
    { label: '출차시간', time: exit.time, date: exit.date },
  ];

  const infoItems = [
    { label: '주차면', value: parkingSpotName },
    { label: '차량번호', value: vehicleNumber },
    { label: '이용시간', value: '3시간' },
  ];

  return (
    <PaddedLayout className="py-4 space-y-5">
      <div className="bg-white rounded-lg shadow-md py-6">
        <QRcodeBoxSection />
        <hr className="w-full border-t border-dashed border-gray-1 my-8" />
        <QRExtraInfoSection timeItems={timeItems} infoItems={infoItems} />
      </div>
      <div className="flex justify-center gap-3 items-center w-full">
        <Link
          href={`/parking-lot/${parkingLotUuid}`}
          className={`${buttonVariants({ variant: 'default' })} w-1/2 !text-black h-10`}
        >
          주차장 상세보기
        </Link>
        <Button className="bg-white border border-red-1 text-red-1 w-1/2 h-10">
          예약취소
        </Button>
      </div>
    </PaddedLayout>
  );
}

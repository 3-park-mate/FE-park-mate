import { formatDateParts } from '@/utils/datetimeUtils';
import QRExtraInfoSection from '../../home/parkingInfo/qrModal/QRExtraInfoSection';
import DetailInfo from './DetailInfo';
import { Button, buttonVariants } from '@repo/ui/components/base/button';
import Link from 'next/link';
import { PaddedSection } from '@repo/ui/components/common/CommonLayouts';

export default function ReservationDetail() {
  const entry = formatDateParts('2025-06-19T14:30:00');
  const exit = formatDateParts('2025-06-19T14:30:00');

  const timeItems = [
    { label: '입차시간', time: entry.time, date: entry.date },
    { label: '출차시간', time: exit.time, date: exit.date },
  ];

  const infoItems = [
    { label: '주차면', value: 'A-12' },
    { label: '차량번호', value: '12가3456' },
    { label: '이용시간', value: '3시간' },
  ];
  return (
    <PaddedSection className="space-y-8">
      <DetailInfo />
      <QRExtraInfoSection timeItems={timeItems} infoItems={infoItems} />
      <hr className="mx-6" />
      <div className="flex justify-center gap-3 items-center w-full">
        <Button className="flex-1 bg-white border border-red-1 text-red-1 h-10">
          예약취소
        </Button>
        <Link
          href={`#`}
          className={`${buttonVariants({ variant: 'default' })} flex-1 !text-black h-10`}
        >
          주차장 상세보기
        </Link>
      </div>
    </PaddedSection>
  );
}

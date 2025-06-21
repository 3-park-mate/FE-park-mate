import { formatDateParts } from '@/utils/datetimeUtils';
import ReservationInfoList from '../../../common/ReservationInfoList';
import DetailInfo from './DetailInfo';
import { Button, buttonVariants } from '@repo/ui/components/base/button';
import Link from 'next/link';
import { PaddedSection } from '@repo/ui/components/common/CommonLayouts';
import AddressSection from './AddressSection';
import ReservationActionButtons from '@/components/common/ReservationActionButtons';

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
    <PaddedSection className="space-y-6 py-5">
      <DetailInfo />
      <AddressSection />
      <ReservationInfoList timeItems={timeItems} infoItems={infoItems} />
      <section className="space-y-1">
        <p className="text-gray-2 text-15px">가격</p>
        <p className="text-15px font-semibold">3000원</p>
      </section>
      <hr />

      <hr />
      <ReservationActionButtons showQrButton />
    </PaddedSection>
  );
}

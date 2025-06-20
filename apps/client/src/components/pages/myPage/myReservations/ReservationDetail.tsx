import { formatDateParts } from '@/utils/datetimeUtils';
import QRExtraInfoSection from '../../home/parkingInfo/qrModal/QRExtraInfoSection';
import DetailInfo from './DetailInfo';
import { Button, buttonVariants } from '@repo/ui/components/base/button';
import Link from 'next/link';
import {
  CommonButton,
  PaddedSection,
} from '@repo/ui/components/common/CommonLayouts';
import MarkerIcon from '@repo/ui/components/icon/MarkerIcon';
import Image from 'next/image';

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
    <>
      <PaddedSection className="space-y-6 py-5">
        <p className="text-gray-2 text-xs">예약번호 : 1234</p>
        <DetailInfo />

        <section className="pt-3 flex flex-row justify-between items-center gap-3">
          <div className="flex-1 min-w-0 space-y-1">
            <p className="text-gray-2 text-15px">주소</p>
            <p className="text-15px font-semibold">
              부산광역시북구부산광역시북구부산광역시북구
            </p>
            <p className="text-sm text-gray-2">상세주소가 들어갑니다.</p>
          </div>
          <div className="flex-shrink-0 relative w-[64px] h-[62px]">
            <MarkerIcon
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                  !w-6 !h-6"
            />
            <Image
              src="/img/map-thumb.png"
              alt="지도 썸네일"
              width={64}
              height={64}
            />
          </div>
        </section>

        <QRExtraInfoSection timeItems={timeItems} infoItems={infoItems} />

        <section className="space-y-1">
          <p className="text-gray-2 text-15px">가격</p>
          <p className="text-15px font-semibold">3000원</p>
        </section>

        <hr />

        <hr />

        <div className="space-y-4">
          <Button
            variant={'outline'}
            className="w-full text-primary-dark-50 h-10 border-primary"
          >
            입출차 QR코드 확인
          </Button>
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
        </div>
      </PaddedSection>
    </>
  );
}

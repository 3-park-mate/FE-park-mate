'use client';
import { Button, buttonVariants } from '@repo/ui/components/base/button';
import Link from 'next/link';
import ReservationCancelDialog from './ReservationCancelDialog';

export default function ReservationActionButtons({
  showQrButton = false,
  showCancelButton = false,
  parkingLotUuid,
  parkingLotName = '더미이름',
  reservationCode = 'dummyCode',
}: {
  showQrButton?: boolean;
  showCancelButton?: boolean;
  parkingLotUuid: string;
  parkingLotName?: string;
  reservationCode?: string;
}) {
  return (
    <div className="space-y-4">
      {showQrButton && (
        <Button className="w-full bg-white text-primary-dark-50 h-10 border border-primary">
          입출차 QR코드 확인
        </Button>
      )}
      <div className="flex justify-center gap-3 items-center w-full">
        {showCancelButton && (
          <ReservationCancelDialog
            parkingLotName={parkingLotName}
            reservationCode={reservationCode}
          />
        )}
        <Link
          href={`/parking-lot/${parkingLotUuid}`}
          className={`${buttonVariants({ variant: 'default' })} flex-1 !text-black h-10`}
        >
          주차장 상세보기
        </Link>
      </div>
    </div>
  );
}

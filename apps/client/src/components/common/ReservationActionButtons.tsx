import { Button, buttonVariants } from '@repo/ui/components/base/button';
import Link from 'next/link';

export default function ReservationActionButtons({
  showQrButton = false,
}: {
  showQrButton?: boolean;
}) {
  return (
    <div className="space-y-4">
      {showQrButton && (
        <Button
          variant={'outline'}
          className="w-full text-primary-dark-50 h-10 border-primary"
        >
          입출차 QR코드 확인
        </Button>
      )}
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
  );
}

import { PaddedSection } from '@repo/ui/components/common/CommonLayouts';
import OrderInfoSection from '../myPage/myReservations/OrderInfoSection';
import Link from 'next/link';
import { buttonVariants } from '@repo/ui/components/base/button';
import { CircleCheck } from 'lucide-react';

export default function ReservationSuccess() {
  return (
    <PaddedSection className="space-y-6 w-full flex flex-col">
      <section className="flex flex-col justify-center items-center gap-3">
        <CircleCheck
          className="text-white fill-primary w-16 h-16"
          strokeWidth={1.5}
        />
        <h2 className="text-15px text-gray-800">주차장 예약이 완료되었어요.</h2>
      </section>
      <OrderInfoSection />
      <section className="flex flex-col gap-3">
        <Link
          href="#"
          className={`${buttonVariants({ variant: 'default' })} h-11`}
        >
          예약 내역 바로가기
        </Link>
        <Link
          href="/"
          className={`${buttonVariants({ variant: 'default' })} bg-white border !border-primary !text-primary h-11`}
        >
          홈으로
        </Link>
      </section>
    </PaddedSection>
  );
}

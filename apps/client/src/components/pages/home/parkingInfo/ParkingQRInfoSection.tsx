import { formatDateParts } from '@/utils/datetimeUtils';
import { Button, buttonVariants } from '@repo/ui/components/base/button';
import {
  PaddedLayout,
  PaddedSection,
} from '@repo/ui/components/common/CommonLayouts';
import Image from 'next/image';
import Link from 'next/link';

export default function ParkingQRInfoSection() {
  const { time, date } = formatDateParts('2025-05-30T09:00:00');

  return (
    <PaddedLayout className="py-4 space-y-4">
      <div className="bg-white rounded-lg shadow-md py-6">
        <PaddedSection className="flex flex-col items-center">
          <p className="text-center text-gray-2 pt-2 pb-4 text-15px break-keep">
            화면의 리더기에 아래 QR 코드를 인식시켜 주세요.
          </p>
          <div className="w-[35vw] max-w-[200px] min-w-[140px] aspect-square bg-white rounded-lg drop-shadow-lg flex justify-center items-center cursor-pointer">
            <Image
              src="https://dummyimage.com/140x140"
              alt="qr-image"
              fill
              className="object-contain p-4"
            />
          </div>
        </PaddedSection>
        <hr className="w-full border-t border-dashed border-gray-1 my-8" />
        <PaddedSection>
          <div className="flex gap-4">
            <div className="w-1/2">
              <p className="text-gray-2 text-15px pb-2">입차시간</p>
              <div className="bg-gray-light-1 rounded-lg px-4 py-3">
                <p className="font-semibold">{time}</p>
                <p className="text-gray-2 text-15px">{date}</p>
              </div>
            </div>

            <div className="w-1/2">
              <p className="text-gray-2 text-15px pb-2">출차시간</p>
              <div className="bg-gray-light-1 rounded-lg px-4 py-3">
                <p className="font-semibold">{time}</p>
                <p className="text-gray-2 text-15px">{date}</p>
              </div>
            </div>
          </div>

          <div className="flex gap-4 py-4">
            <div className="w-1/3">
              <p className="text-gray-2 text-15px pb-2">주차면</p>
              <p className="font-semibold ms-0.5">A-12</p>
            </div>
            <div className="w-1/3">
              <p className="text-gray-2 text-15px pb-2">차량번호</p>
              <p className="font-semibold ms-0.5">12가3456</p>
            </div>
            <div className="w-1/3">
              <p className="text-gray-2 text-15px pb-2">기간</p>
              <p className="font-semibold ms-0.5">3시간</p>
            </div>
          </div>
        </PaddedSection>
      </div>
      <div className="flex justify-center gap-3 items-center w-full">
        <Link
          href="#"
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

import ImageViewDialog from '@/components/common/ImageViewDialog';
import { ParkingQRDataType } from '@/types/parkingDataTypes';
import { formatDateParts } from '@/utils/datetimeUtils';
import { Button, buttonVariants } from '@repo/ui/components/base/button';
import {
  PaddedLayout,
  PaddedSection,
} from '@repo/ui/components/common/CommonLayouts';
import Image from 'next/image';
import Link from 'next/link';

export default function ParkingQRInfoSection(ParkingQRData: ParkingQRDataType) {
  const entry = formatDateParts(ParkingQRData.entryTime);
  const exit = formatDateParts(ParkingQRData.exitTime);

  const timeItems = [
    { label: '입차시간', time: entry.time, date: entry.date },
    { label: '출차시간', time: exit.time, date: exit.date },
  ];

  const infoItems = [
    { label: '주차면', value: ParkingQRData.parkingSpotName },
    { label: '차량번호', value: ParkingQRData.vehicleNumber },
    { label: '이용시간', value: '3시간' },
  ];

  return (
    <PaddedLayout className="py-4 space-y-5">
      <div className="bg-white rounded-lg shadow-md py-6">
        <PaddedSection className="flex flex-col items-center">
          <p className="text-center text-gray-2 pt-2 pb-4 text-15px break-keep">
            주차장의 리더기에 아래 QR 코드를 인식시켜 주세요.
          </p>
          <ImageViewDialog imgSrc="https://dummyimage.com/140x140">
            <div className="w-[35vw] max-w-[200px] min-w-[140px] aspect-square bg-white rounded-lg drop-shadow-lg flex justify-center items-center cursor-pointer">
              <Image
                src="https://dummyimage.com/140x140"
                alt="qr-image"
                fill
                className="object-contain p-4"
              />
            </div>
          </ImageViewDialog>
        </PaddedSection>
        <hr className="w-full border-t border-dashed border-gray-1 my-8" />
        <PaddedSection>
          <div className="flex gap-4">
            {timeItems.map(({ label, time, date }) => (
              <div key={label} className="w-1/2">
                <p className="text-gray-2 text-15px pb-2">{label}</p>
                <div className="bg-gray-light-1 rounded-lg px-4 py-3">
                  <p className="font-semibold">{time}</p>
                  <p className="text-gray-2 text-15px">{date}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex gap-4 py-4">
            {infoItems.map(({ label, value }, index) => (
              <div
                key={label}
                className={`w-1/3 pr-4 ${
                  index !== infoItems.length - 1
                    ? 'border-r border-gray-200'
                    : ''
                }`}
              >
                <p className="text-gray-2 text-15px pb-2">{label}</p>
                <p className="font-semibold ms-0.5">{value}</p>
              </div>
            ))}
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

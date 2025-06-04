'use client';
import {
  GlobalContainerView,
  HeaderLayout,
} from '@repo/ui/components/common/CommonLayouts';
import { ChevronLeft } from 'lucide-react';
import ParkingQRInfoSection from './ParkingQRInfoSection';
import { ParkingQRDataType } from '@/types/parkingDataTypes';

interface Props extends ParkingQRDataType {
  isOpen: boolean;
  onClose: () => void;
}

export default function ParkingQRModal({
  isOpen,
  onClose,
  ...ParkingQRData
}: Props) {
  if (!isOpen) return null;

  return (
    <GlobalContainerView className="fixed inset-0 z-50 flex flex-col bg-gray-light-1 outline-none">
      <HeaderLayout className="bg-gray-light-1">
        <button
          onClick={onClose}
          className="absolute left-0 flex justify-center cursor-pointer"
        >
          <ChevronLeft className="ml-3" />
        </button>
        <h1 className="font-semibold">입출차 등록 QR</h1>
      </HeaderLayout>
      <ParkingQRInfoSection {...ParkingQRData} />
    </GlobalContainerView>
  );
}

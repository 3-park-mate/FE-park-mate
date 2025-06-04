'use client';
import { useQRModalStore } from '@/store/useQRModalStore';
import {
  GlobalContainerView,
  HeaderLayout,
} from '@repo/ui/components/common/CommonLayouts';
import { ChevronLeft } from 'lucide-react';
import ParkingQRInfoSection from './ParkingQRInfoSection';

export default function ParkingQRModal() {
  const { isOpen, close } = useQRModalStore();
  if (!isOpen) return null;

  return (
    <GlobalContainerView className="fixed inset-0 z-50 flex flex-col bg-gray-light-1 outline-none">
      <HeaderLayout className="bg-gray-light-1">
        <button
          onClick={close}
          className="absolute left-0 flex justify-center cursor-pointer"
        >
          <ChevronLeft className="ml-3" />
        </button>
        <h1 className="font-semibold">입출차 등록 QR</h1>
      </HeaderLayout>
      <ParkingQRInfoSection />
    </GlobalContainerView>
  );
}

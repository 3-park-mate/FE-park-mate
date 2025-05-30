import { useParkingFilterStore } from '@/store/useParkingFilterStore';
import { getCurrentLocationUtils } from '@/utils/getCurrentLocationUtils';
import CurrentLocationIcon from '@repo/ui/components/icon/CurrentLocationIcon';
import React from 'react';

export default function CurrentLocationButton({
  onClick,
}: {
  onClick: () => void;
}) {
  const setMapCenter = useParkingFilterStore((state) => state.setMapCenter);

  return (
    <button
      onClick={onClick}
      className="absolute bottom-25 right-5 z-10 bg-primary p-3 rounded-full shadow-md hover:bg-gray-100"
    >
      <CurrentLocationIcon className="size-8 stroke-white" />
    </button>
  );
}

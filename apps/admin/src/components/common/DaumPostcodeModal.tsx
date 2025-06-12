'use client';
import CarLoader from '@repo/ui/components/common/CarLoader';
import {
  GlobalContainerView,
  HeaderLayout,
} from '@repo/ui/components/common/CommonLayouts';
import { XIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import DaumPostcode, { Address } from 'react-daum-postcode';

export default function DaumPostcodeModal({
  onClose,
  onComplete,
}: {
  onClose: () => void;
  onComplete: (data: Address) => void;
}) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <GlobalContainerView className="fixed inset-0 z-50 flex flex-col bg-gray-light-1 outline-none">
      <HeaderLayout className="bg-gray-light-1">
        <button
          onClick={onClose}
          className="absolute right-0 flex justify-center cursor-pointer"
        >
          <XIcon className="mr-5" />
        </button>
        <h1 className="font-semibold">주소 검색</h1>
      </HeaderLayout>
      {isLoading ? (
        <CarLoader className="text-secondary" />
      ) : (
        <DaumPostcode
          onComplete={onComplete}
          style={{ width: '100%', height: '450px' }}
        />
      )}
    </GlobalContainerView>
  );
}

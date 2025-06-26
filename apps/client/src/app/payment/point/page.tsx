import PageHeader from '@/components/layouts/PageHeader';
import ChargePointSection from '@/components/pages/payment/ChargePointSection';
import {
  CommonButton,
  PaddedSection,
} from '@repo/ui/components/common/CommonLayouts';

export default function Page() {
  const currentPoints = 12000;

  return (
    <div className="min-h-screen flex flex-col">
      <PageHeader title="포인트 충전" />

      <main className="flex-1 flex flex-col justify-between">
        <ChargePointSection />

        <div className="bg-gray-light-1 shadow-md">
          <PaddedSection className="py-5">
            <div className="flex justify-between items-center pb-3">
              <p className="text-sm text-gray-2">충전 후 보유 포인트</p>
              <p className="text-2xl font-semibold">
                {currentPoints.toLocaleString()}원
              </p>
            </div>
            <CommonButton className="font-bold text-base text-black">
              결제하기
            </CommonButton>
          </PaddedSection>
        </div>
      </main>
    </div>
  );
}

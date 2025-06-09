'use client';
import {
  CommonButton,
  HeadingWithDesc,
} from '@repo/ui/components/common/CommonLayouts';
import SpotCountSelectSection from '../SpotCountSelectSection';

export default function ParkingSpotSetupStep({
  onNext,
  onBack,
}: {
  onNext: () => void;
  onBack: () => void;
}) {
  return (
    <section className="space-y-5">
      <HeadingWithDesc
        heading="수용 가능한 차량 종류에 따른 주차면수를 입력해 주세요."
        subHeading="각각 주차면의 면적을 확인하시고, 최대로 수용 가능한 차량 종류에 따라 주차면수를 작성해 주세요."
      />
      <SpotCountSelectSection />
      <hr />
      <p className="text-right px-3">
        <span className="text-gray-2 text-sm">전체 주차면수</span>
        <span className="font-bold text-3xl text-secondary ms-2">22</span>
      </p>
      <div className="space-y-3 mt-10">
        <CommonButton
          onClick={onBack}
          className="bg-white border border-secondary text-secondary"
        >
          이전
        </CommonButton>
        <CommonButton onClick={onNext} className="bg-secondary">
          다음
        </CommonButton>
      </div>
    </section>
  );
}

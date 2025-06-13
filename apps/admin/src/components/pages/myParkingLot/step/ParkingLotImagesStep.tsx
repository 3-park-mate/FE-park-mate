import { Sheet, SheetTrigger } from '@repo/ui/components/base/sheet';
import {
  CommonButton,
  HeadingWithDesc,
} from '@repo/ui/components/common/CommonLayouts';
import IsChargeableSheet from '../IsChargeableSheet';
import ImageUploadInput from '../ImageUploadInput';
import { AddParkingLotStep } from '../AddParkingLotFunnel';

export default function ParkingLotImagesStep({
  setStep,
}: {
  setStep: (step: AddParkingLotStep, skipEvStep?: boolean) => void;
}) {
  return (
    <section className="space-y-5">
      <HeadingWithDesc
        heading="주차장 모습을 보여주는 이미지를 등록해 주세요."
        subHeading="이미지는 최소 1개 등록을 필요로 하며, 최대 5개까지 등록하실 수 있습니다."
      />
      <ImageUploadInput />
      <div className="space-y-3 mt-10">
        <CommonButton
          onClick={() => setStep('step2')}
          className="bg-white border border-secondary text-secondary"
        >
          이전
        </CommonButton>
        <Sheet key="bottom">
          <SheetTrigger asChild>
            <CommonButton className="bg-secondary">다음</CommonButton>
          </SheetTrigger>
          <IsChargeableSheet
            onNext={() => setStep('step4', false)}
            onJump={() => setStep('step5', true)}
          />
        </Sheet>
      </div>
    </section>
  );
}

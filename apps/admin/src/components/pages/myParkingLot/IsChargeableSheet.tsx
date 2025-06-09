import {
  SheetContent,
  SheetDescription,
  SheetTitle,
} from '@repo/ui/components/base/sheet';
import {
  CommonButton,
  HeadingWithDesc,
} from '@repo/ui/components/common/CommonLayouts';

export default function IsChargeableSheet({ onNext }: { onNext?: () => void }) {
  return (
    <SheetContent
      side="bottom"
      className="fixed left-1/2 -translate-x-1/2 bottom-0 gap-2 w-full bg-white rounded-t-2xl px-5 pb-15 max-w-[600px]"
    >
      <SheetTitle />
      <SheetDescription />
      <section>
        <HeadingWithDesc
          heading="전기차 충전이 가능한가요?"
          subHeading="'예'를 선택할 시 전기차 충전 주차면을 설정하는 페이지로 이동합니다."
        />
        <div className="space-y-3 pt-5">
          <CommonButton
            onClick={onNext}
            className=" bg-white border border-secondary text-secondary"
          >
            예
          </CommonButton>
          <CommonButton className=" bg-secondary">아니오</CommonButton>
        </div>
      </section>
    </SheetContent>
  );
}

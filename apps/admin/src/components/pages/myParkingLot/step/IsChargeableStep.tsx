import { Button } from '@repo/ui/components/base/button';
import {
  CommonButton,
  HeadingWithDesc,
} from '@repo/ui/components/common/CommonLayouts';

export default function IsChargeableStep() {
  return (
    <section className="space-y-5">
      <HeadingWithDesc
        heading="전기차 충전이 가능한가요?"
        subHeading="'예'를 선택할 시 전기차 충전 주차면을 설정하는 페이지로 이동합니다."
      />
      {/* <div className="flex gap-3 w-full">
        <Button className="flex-1 bg-gray-1 h-11">네</Button>
        <Button className="flex-1 bg-secondary h-11">아니오</Button>
      </div> */}
      <div className="space-y-3 pt-5">
        <CommonButton className=" bg-secondary">예</CommonButton>
        <CommonButton className=" bg-secondary">아니오</CommonButton>
      </div>
    </section>
  );
}

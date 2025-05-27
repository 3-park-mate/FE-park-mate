import { Button } from '@repo/ui/components/base/button';
import { PaddedLayout } from '@repo/ui/components/common/CommonLayouts';

export default function UserInfo() {
  return (
    <PaddedLayout className="bg-gray-light-1 py-8">
      <p className="text-lg">
        <b>홍길동</b>님, 안녕하세요.
      </p>
      <p className="text-gray-3 text-sm">abc@naver.com</p>
      <div className="bg-white p-5 mt-5 rounded-t-lg">
        <p className="text-gray-3">보유 포인트</p>
        <div className="flex justify-between">
          <h2 className="text-[26px] font-semibold">12,000원</h2>
          <Button className="text-base px-5 rounded-2xl">충전</Button>
        </div>
      </div>
      <button className="w-full bg-white text-center rounded-b-lg border-t p-2 cursor-pointer">
        <p className="text-gray-3 text-sm">사용 내역</p>
      </button>
    </PaddedLayout>
  );
}

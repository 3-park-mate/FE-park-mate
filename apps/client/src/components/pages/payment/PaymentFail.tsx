import InfoRow, {
  PaddedSection,
} from '@repo/ui/components/common/CommonLayouts';
import Link from 'next/link';
import { buttonVariants } from '@repo/ui/components/base/button';
import { CircleX } from 'lucide-react';

export default function PaymentFail({
  message,
  code,
}: {
  message?: string;
  code?: string;
}) {
  return (
    <PaddedSection className="space-y-6 w-full flex flex-col">
      <section className="flex flex-col justify-center items-center gap-3">
        <CircleX
          className="text-white fill-red-2 w-16 h-16"
          strokeWidth={1.5}
        />

        <h2 className="text-15px text-gray-800">결제에 실패했습니다.</h2>
      </section>

      {(message || code) && (
        <section className="space-y-1 bg-gray-light-1 rounded-lg p-4">
          {message && <InfoRow label="오류메시지">{message}</InfoRow>}
          {code && <InfoRow label="오류코드">{code}</InfoRow>}
        </section>
      )}

      <div className="text-center flex flex-col gap-2">
        <p className="text-sm text-gray-2">
          문제가 반복될 시 관리자에게 문의해 주세요.
        </p>
        <Link
          href="/"
          className={`${buttonVariants({ variant: 'default' })} h-11`}
        >
          홈으로
        </Link>
      </div>
    </PaddedSection>
  );
}

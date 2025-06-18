import HostLogo from '@/components/common/HostLogo';
import { buttonVariants } from '@repo/ui/components/base/button';
import Link from 'next/link';

export default function NotFoundPage() {
  return (
    <main className="min-h-screen flex flex-col bg-inner-background-gray">
      <div className="flex-1 flex flex-col justify-center items-center px-4">
        <h1 className="text-2xl font-bold mb-1">페이지를 찾을 수 없습니다.</h1>
        <p className="mb-6 text-gray-2">
          요청하신 페이지가 존재하지 않거나 이동되었어요.
        </p>
        <Link
          href="/"
          className={`${buttonVariants({ variant: 'secondary' })} !text-white`}
        >
          홈으로 돌아가기
        </Link>
      </div>

      <footer className="w-4/5 border-t border-gray-300 pt-3 pb-6 flex justify-center mx-auto">
        <HostLogo />
      </footer>
    </main>
  );
}

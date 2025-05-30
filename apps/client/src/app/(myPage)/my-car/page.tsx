import PageHeader from '@/components/layouts/PageHeader';
import MyCarItem from '@/components/pages/myPage/myCar/MyCarItem';
import { buttonVariants } from '@repo/ui/components/base/button';
import { PaddedLayout } from '@repo/ui/components/common/CommonLayouts';
import { Plus } from 'lucide-react';
import Link from 'next/link';

export default function page() {
  return (
    <>
      <PageHeader title="내 차량" />
      <main>
        <PaddedLayout className="py-6">
          <MyCarItem />
          <Link
            href="#"
            className={`${buttonVariants({ variant: 'default' })} w-full h-10 bg-primary-dark mt-6`}
          >
            <Plus />내 차량 추가
          </Link>
          <p className="text-sm text-gray-3 mt-4">
            · 차량은 최대 10개 등록할 수 있습니다.
          </p>
        </PaddedLayout>
      </main>
    </>
  );
}

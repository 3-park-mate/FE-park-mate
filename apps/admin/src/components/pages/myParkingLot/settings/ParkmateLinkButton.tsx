import { buttonVariants } from '@repo/ui/components/base/button';
import { PaddedLayout } from '@repo/ui/components/common/CommonLayouts';
import { CarFront } from 'lucide-react';
import Link from 'next/link';

export default function ParkmateLinkButton() {
  return (
    <PaddedLayout className="my-4">
      <Link
        href="#"
        className={`${buttonVariants({ variant: 'secondary' })} w-full h-11`}
      >
        <CarFront className="text-white fill-white" />
        파크메이트 서비스 페이지 바로가기
      </Link>
    </PaddedLayout>
  );
}

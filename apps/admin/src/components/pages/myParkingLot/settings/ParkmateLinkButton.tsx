import { buttonVariants } from '@repo/ui/components/base/button';
import { PaddedLayout } from '@repo/ui/components/common/CommonLayouts';
import { CarFront } from 'lucide-react';

export default function ParkmateLinkButton({
  parkingLotUuid,
}: {
  parkingLotUuid: string;
}) {
  return (
    <PaddedLayout className="my-4">
      <a
        href={`https://parkmate.shop/parking-lot/${parkingLotUuid}`}
        className={`${buttonVariants({ variant: 'secondary' })} w-full h-11`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <CarFront className="text-white fill-white" />
        파크메이트 서비스 페이지 바로가기
      </a>
    </PaddedLayout>
  );
}

import MenuIconListItem from '@/components/common/MenuIconListItem';
import AlwaysVisibleTooltip from '@repo/ui/components/common/AlwaysVisibleTooltip';
import {
  CommonButton,
  PaddedSection,
} from '@repo/ui/components/common/CommonLayouts';
import { MessageCircle, Star, ThumbsDown, ThumbsUp } from 'lucide-react';

export default function DetailInfoMenuSection({
  hostUuid,
  parkingLotUuid,
  isActive,
  like,
  dislike,
  baseFee,
  availableSpots,
  registeredParkingCount,
}: {
  hostUuid: string;
  parkingLotUuid: string;
  isActive: boolean;
  like: number;
  dislike: number;
  baseFee: number;
  availableSpots: number;
  registeredParkingCount: number;
}) {
  // hostUuid => 채팅
  // parkingLotUuid => 즐겨찾기
  return (
    <PaddedSection className="py-5 space-y-5 bg-white">
      <nav>
        <ul className="flex justify-between px-4">
          <MenuIconListItem Icon={MessageCircle}>채팅</MenuIconListItem>
          <MenuIconListItem Icon={Star}>즐겨찾기</MenuIconListItem>
          <MenuIconListItem Icon={ThumbsUp}>좋아요 {like}</MenuIconListItem>
          <MenuIconListItem Icon={ThumbsDown}>
            싫어요 {dislike}
          </MenuIconListItem>
        </ul>
      </nav>
      {isActive ? (
        <AlwaysVisibleTooltip
          side="bottom"
          content={`1시간 ${baseFee.toLocaleString()}원`}
        >
          <CommonButton className="bg-primary-dark" disabled={!isActive}>
            예약하기 ({availableSpots}/{registeredParkingCount})
          </CommonButton>
        </AlwaysVisibleTooltip>
      ) : (
        <CommonButton className="bg-primary-dark" disabled>
          운영 준비중
        </CommonButton>
      )}
    </PaddedSection>
  );
}

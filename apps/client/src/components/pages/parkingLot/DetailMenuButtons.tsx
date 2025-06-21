import MenuIconListItem from '@/components/common/MenuIconListItem';
import { PaddedSection } from '@repo/ui/components/common/CommonLayouts';
import { MessageCircle, Star, ThumbsDown, ThumbsUp } from 'lucide-react';
import ReservationButton from './ReservationButton';

export default function DetailMenuButtons({
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
      <ReservationButton
        parkingLotUuid={parkingLotUuid}
        isActive={isActive}
        baseFee={baseFee}
        availableSpots={availableSpots}
        registeredParkingCount={registeredParkingCount}
      />
    </PaddedSection>
  );
}

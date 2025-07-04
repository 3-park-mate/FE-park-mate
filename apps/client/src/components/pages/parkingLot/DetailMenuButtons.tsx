'use client';
import MenuIconListItem from '@/components/common/MenuIconListItem';
import { PaddedSection } from '@repo/ui/components/common/CommonLayouts';
import { MessageCircle, Star, ThumbsDown, ThumbsUp } from 'lucide-react';
import ReservationButton from './ReservationButton';
import AlertModal from '@repo/ui/components/common/AlertModal';
import DotSpinner from '@repo/ui/components/icon/DotSpinner';
import { useFavoriteStatus } from '@/hooks/useFavoriteStatus';

export default function DetailMenuButtons({
  hostUuid,
  parkingLotUuid,
  like,
  dislike,
  baseFee,
  baseIntervalMinutes,
}: {
  hostUuid: string;
  parkingLotUuid: string;
  like: number;
  dislike: number;
  baseFee: number;
  baseIntervalMinutes: number;
}) {
  const {
    isFavorited,
    isInitialLoadComplete,
    handleAddFavorite,
    alertModalOpen,
    setAlertModalOpen,
    modalMessage,
  } = useFavoriteStatus({ parkingLotUuid });

  if (!isInitialLoadComplete) {
    return (
      <PaddedSection className="py-5 space-y-5 bg-white flex justify-center items-center h-[152px]">
        <DotSpinner />
      </PaddedSection>
    );
  }

  if (!isInitialLoadComplete) {
    return (
      <PaddedSection className="py-5 space-y-5 bg-white flex justify-center items-center h-[152px]">
        <DotSpinner />
      </PaddedSection>
    );
  }

  return (
    <PaddedSection className="py-5 space-y-5 bg-white">
      <AlertModal
        open={alertModalOpen}
        onOpenChange={setAlertModalOpen}
        errorMessage={modalMessage}
        onConfirm={() => {}}
      />
      <nav>
        <ul className="flex justify-between gap-4">
          <MenuIconListItem Icon={MessageCircle}>채팅</MenuIconListItem>
          <MenuIconListItem
            Icon={Star}
            onClick={handleAddFavorite}
            iconClassName={isFavorited ? 'text-[#ffc800]' : ''}
          >
            즐겨찾기
          </MenuIconListItem>
          <MenuIconListItem Icon={ThumbsUp}>좋아요 {like}</MenuIconListItem>
          <MenuIconListItem Icon={ThumbsDown}>
            싫어요 {dislike}
          </MenuIconListItem>
        </ul>
      </nav>
      <ReservationButton
        parkingLotUuid={parkingLotUuid}
        baseFee={baseFee}
        baseIntervalMinutes={baseIntervalMinutes}
      />
    </PaddedSection>
  );
}

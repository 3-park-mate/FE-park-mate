'use client';
import MenuIconListItem from '@/components/common/MenuIconListItem';
import { PaddedSection } from '@repo/ui/components/common/CommonLayouts';
import { MessageCircle, Star, ThumbsDown, ThumbsUp } from 'lucide-react';
import ReservationButton from './ReservationButton';
import { AddFavoriteAction } from '@/actions/user/user-service';
import { useAlertWithLoading } from '@/hooks/useAlertWithLoading';
import AlertModal from '@repo/ui/components/common/AlertModal';

export default function DetailMenuButtons({
  hostUuid,
  parkingLotUuid,
  isActive,
  like,
  dislike,
  baseFee,
}: {
  hostUuid: string;
  parkingLotUuid: string;
  isActive: boolean;
  like: number;
  dislike: number;
  baseFee: number;
}) {
  // hostUuid => 채팅
  const {
    loading,
    setLoading,
    alertModalOpen,
    setAlertModalOpen,
    modalMessage,
    handleAlert,
  } = useAlertWithLoading();

  const handleAddFavorite = async () => {
    try {
      const res = await AddFavoriteAction(parkingLotUuid);
      if (res.success) {
        handleAlert('즐겨찾기 추가 성공');
      } else {
        handleAlert(res.message);
      }
    } catch (e) {
      console.error('오류:', e);
    }
  };

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
          <MenuIconListItem Icon={Star} onClick={handleAddFavorite}>
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
        isActive={isActive}
        baseFee={baseFee}
      />
    </PaddedSection>
  );
}

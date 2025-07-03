'use client';
import MenuIconListItem from '@/components/common/MenuIconListItem';
import { PaddedSection } from '@repo/ui/components/common/CommonLayouts';
import { MessageCircle, Star, ThumbsDown, ThumbsUp } from 'lucide-react';
import ReservationButton from './ReservationButton';
import {
  AddFavoriteAction,
  DeleteFavoriteAction,
} from '@/actions/user/user-service';
import { checkIsFavorite } from '@/actions/user/user-service';
import { useAlertWithLoading } from '@/hooks/useAlertWithLoading';
import AlertModal from '@repo/ui/components/common/AlertModal';
import { useEffect, useState } from 'react';
import DotSpinner from '@repo/ui/components/icon/DotSpinner';

export default function DetailMenuButtons({
  hostUuid,
  parkingLotUuid,
  isActive,
  like,
  dislike,
  baseFee,
  baseIntervalMinutes,
}: {
  hostUuid: string;
  parkingLotUuid: string;
  isActive: boolean;
  like: number;
  dislike: number;
  baseFee: number;
  baseIntervalMinutes: number;
}) {
  const { alertModalOpen, setAlertModalOpen, modalMessage, handleAlert } =
    useAlertWithLoading();

  const [isFavorited, setIsFavorited] = useState<boolean>(false);
  const [isInitialLoadComplete, setIsInitialLoadComplete] =
    useState<boolean>(false);

  useEffect(() => {
    const fetchFavoriteStatus = async () => {
      try {
        const res = await checkIsFavorite(parkingLotUuid);
        if (!res.success || res.data === undefined) {
          setIsFavorited(false);
          return;
        }
        setIsFavorited(res.data);
      } catch (e) {
        console.error('초기 즐겨찾기 상태 불러오기 오류:', e);
        setIsFavorited(false);
      } finally {
        setIsInitialLoadComplete(true);
      }
    };
    fetchFavoriteStatus();
  }, [parkingLotUuid]);

  const handleAddFavorite = async () => {
    try {
      let res;
      if (isFavorited) {
        res = await DeleteFavoriteAction(parkingLotUuid);
      } else {
        res = await AddFavoriteAction(parkingLotUuid);
      }

      if (res.success) {
        handleAlert(res.data);
        setIsFavorited((prev) => !prev);
      } else {
        handleAlert(res.message);
      }
    } catch (e) {
      console.error('즐겨찾기 액션 오류:', e);
      handleAlert('즐겨찾기 처리 중 오류가 발생했습니다.');
    }
  };

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
        isActive={isActive}
        baseFee={baseFee}
        baseIntervalMinutes={baseIntervalMinutes}
      />
    </PaddedSection>
  );
}

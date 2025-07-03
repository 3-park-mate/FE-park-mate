'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  AddFavoriteAction,
  DeleteFavoriteAction,
  checkIsFavorite,
} from '@/actions/user/user-service';
import { useAlertWithLoading } from '@/hooks/useAlertWithLoading';

interface UseFavoriteStatusProps {
  parkingLotUuid: string;
}

export const useFavoriteStatus = ({
  parkingLotUuid,
}: UseFavoriteStatusProps) => {
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

  const handleAddFavorite = useCallback(async () => {
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
  }, [isFavorited, parkingLotUuid, handleAlert]);

  return {
    isFavorited,
    isInitialLoadComplete,
    handleAddFavorite,
    alertModalOpen,
    setAlertModalOpen,
    modalMessage,
  };
};

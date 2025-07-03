import { create } from 'zustand';
import {
  setupContinuousLocationWatcher,
  clearLocationWatcher,
  getCurrentCoordsUtil,
} from '@/utils/geolocationUtils';
import { useLocationAlertStore } from './useLocationAlertStore';

interface LocationState {
  latitude: number | null;
  longitude: number | null;
  isWatching: boolean;
  watchId: number | null;
  setLocation: (latitude: number, longitude: number) => void;
  startWatchingLocation: () => void;
  stopWatchingLocation: () => void;
  fetchCurrentLocation: () => Promise<void>;
}

export const useLocationStore = create<LocationState>((set, get) => ({
  latitude: null,
  longitude: null,
  isWatching: false,
  watchId: null,

  setLocation: (latitude, longitude) => set({ latitude, longitude }),

  // 현재 위치를 한 번만 가져와서 스토어에 저장하는 액션
  fetchCurrentLocation: async () => {
    try {
      const { lat, lng } = await getCurrentCoordsUtil();
      set({ latitude: lat, longitude: lng });
      console.log(`현재 위치 불러오기 성공: ${lat}, ${lng}`);
    } catch (error) {
      console.error('현재 위치 불러오기 실패:', error);
      useLocationAlertStore.getState().setOpenAlert(true); // 에러 발생 시 알림 표시
      set({ latitude: null, longitude: null }); // 실패 시 위치 정보 초기화
    }
  },

  startWatchingLocation: () => {
    if (get().isWatching) {
      console.log('이미 위치 감시 중입니다.');
      return;
    }

    const id = setupContinuousLocationWatcher(
      (position) => {
        set({
          latitude: position.latitude,
          longitude: position.longitude,
          isWatching: true,
        });
        console.log(
          `위치 업데이트: ${position.latitude}, ${position.longitude}`
        );
      },
      (error: Error | GeolocationPositionError) => {
        console.error('위치 감시 중 오류 발생:', error.message);
        useLocationAlertStore.getState().setOpenAlert(true);
        get().stopWatchingLocation();
      }
    );

    if (id !== -1) {
      set({ watchId: id, isWatching: true });
      console.log('위치 감시를 시작했습니다. watchId:', id);
    } else {
      set({ isWatching: false, watchId: null });
    }
  },

  stopWatchingLocation: () => {
    const { watchId } = get();
    if (watchId !== null) {
      clearLocationWatcher(watchId);
      set({ isWatching: false, watchId: null });
      console.log('위치 감시를 중지했습니다.');
    }
  },
}));

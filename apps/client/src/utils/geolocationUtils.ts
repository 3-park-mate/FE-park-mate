import { useLocationAlertStore } from '@/store/useLocationAlertStore';

export const getCurrentCoordsUtil = (): Promise<{
  lat: number;
  lng: number;
}> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation을 지원하지 않습니다.'));
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        resolve({ lat: latitude, lng: longitude });
      },
      (error) => {
        useLocationAlertStore.getState().setOpenAlert(true);
        reject(error.message);
      },
      {
        enableHighAccuracy: true,
        maximumAge: 0,
      }
    );
  });
};

export const watchLocationUtil = (): Promise<{
  latitude: number;
  longitude: number;
}> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation을 지원하지 않습니다.'));
    }

    navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        resolve({ latitude, longitude });
      },
      (error) => {
        reject(error);
      }
    );
  });
};

/**
 * @function setupContinuousLocationWatcher
 * @description navigator.geolocation.watchPosition을 사용하여 지속적으로 위치를 감시하고,
 * 위치 업데이트 및 오류 발생 시 콜백 함수를 호출합니다.
 * @param onPositionUpdate 위치가 업데이트될 때 호출될 콜백 함수 (위도, 경도 포함)
 * @param onError 위치 감시 중 오류가 발생할 때 호출될 콜백 함수 (Error 또는 GeolocationPositionError 객체 포함)
 * @returns watchPosition ID (감시 중지에 사용), 또는 -1 (Geolocation 미지원 시)
 */
export const setupContinuousLocationWatcher = (
  onPositionUpdate: (position: { latitude: number; longitude: number }) => void,
  // onError 콜백 인수를 Error | GeolocationPositionError 유니온 타입으로 변경
  onError: (error: Error | GeolocationPositionError) => void
): number => {
  if (!navigator.geolocation) {
    onError(new Error('Geolocation을 지원하지 않습니다.'));
    return -1;
  }

  const watchId = navigator.geolocation.watchPosition(
    (position) => {
      const { latitude, longitude } = position.coords;
      onPositionUpdate({ latitude, longitude });
    },
    (error) => {
      // watchPosition의 error 콜백에서 넘어오는 GeolocationPositionError를 그대로 전달합니다.
      // 이제 onError의 매개변수 타입이 이를 수용합니다.
      onError(error);
    },
    {
      enableHighAccuracy: true,
      maximumAge: 0,
      timeout: 10000,
    }
  );
  return watchId;
};

/**
 * @function clearLocationWatcher
 * @description setupContinuousLocationWatcher로 시작된 위치 감시를 중지합니다.
 * @param watchId watchPosition ID
 */
export const clearLocationWatcher = (watchId: number) => {
  if (watchId !== -1) {
    navigator.geolocation.clearWatch(watchId);
  }
};

'use client';
import { coordtoAddressUtil } from '@/utils/mapUtils';
import DotSpinner from '@repo/ui/components/icon/DotSpinner';
import { cn } from '@repo/ui/lib/utils';
import { useEffect, useState } from 'react';
import { useKakaoLoader } from 'react-kakao-maps-sdk';
import LocationPermissionModal from '../common/LocationPermissionModal';
import { useLocationStore } from '@/store/useLocationStore';

export default function LocationContent({ className }: { className?: string }) {
  const {
    latitude,
    longitude,
    fetchCurrentLocation,
    startWatchingLocation,
    stopWatchingLocation,
  } = useLocationStore();

  const [loadingKakao] = useKakaoLoader({
    // setloadingKakao는 사용되지 않으므로 제거하거나 이름을 _로 변경
    appkey: process.env.NEXT_PUBLIC_KAKAO_JS_KEY || '',
    libraries: ['services', 'clusterer'],
  });

  const [locationAddress, setLocationAddress] = useState<string | null>(null); // 초기값을 null로 설정하여 '주소 불러오기 실패'와 구분
  const [isLoadingInitial, setIsLoadingInitial] = useState(true); // 초기 로딩 상태만 관리
  const [isUpdatingAddress, setIsUpdatingAddress] = useState(false); // 주소 업데이트 중 로딩 상태 관리

  // 1. 컴포넌트 마운트 시 초기 위치 설정 및 지속적인 감시 시작
  useEffect(() => {
    const initializeAndWatchLocation = async () => {
      if (loadingKakao) {
        return;
      }

      setIsLoadingInitial(true); // 초기 로딩 시작
      try {
        await fetchCurrentLocation(); // 초기 위치 가져오기 (스토어 업데이트)
        // fetchCurrentLocation이 성공했어도, 주소 변환은 아래 useEffect에서 처리되므로 여기서는 기다리지 않음
        startWatchingLocation(); // 지속적인 감시 시작
      } catch (err) {
        console.error('초기 위치 설정 중 오류 발생:', err);
        // 오류가 발생하면 초기 로딩 상태에서 벗어나 바로 실패 메시지를 띄우기 위해 null 설정
        setLocationAddress(null);
      } finally {
        setIsLoadingInitial(false); // 초기 로딩 완료 (성공/실패 여부와 관계 없이)
      }
    };

    initializeAndWatchLocation();

    return () => {
      stopWatchingLocation();
    };
  }, [
    loadingKakao,
    fetchCurrentLocation,
    startWatchingLocation,
    stopWatchingLocation,
  ]);

  // 2. latitude 또는 longitude가 변경될 때마다 주소를 업데이트합니다.
  useEffect(() => {
    const updateAddress = async () => {
      if (latitude !== null && longitude !== null && !loadingKakao) {
        setIsUpdatingAddress(true); // 주소 업데이트 시작
        try {
          const address = await coordtoAddressUtil({
            lat: latitude,
            lng: longitude,
          });
          setLocationAddress(address || '주소 불러오기 실패'); // 주소가 비어있으면 실패로 간주
        } catch (err) {
          console.error('위도/경도 기반 주소 변환 중 오류 발생:', err);
          setLocationAddress('주소 불러오기 실패'); // 변환 실패 시 명확히 실패 메시지 설정
        } finally {
          setIsUpdatingAddress(false); // 주소 업데이트 완료
        }
      } else if (latitude === null || longitude === null) {
        // 위치 정보가 없는 경우 (예: 권한 거부, 초기 실패) 주소 초기화
        setLocationAddress(null);
      }
    };

    // 초기 로딩이 완료된 후에만 주소 업데이트 로직 실행
    // 혹은 latitude/longitude가 이미 설정된 상태에서만 실행
    if (!isLoadingInitial || (latitude !== null && longitude !== null)) {
      updateAddress();
    }
  }, [latitude, longitude, loadingKakao, isLoadingInitial]); // isLoadingInitial을 의존성 배열에 추가

  return (
    <>
      {/* 초기 로딩 중이거나 주소 업데이트 중일 때 스피너 표시 */}
      {isLoadingInitial || isUpdatingAddress ? (
        <DotSpinner className="fill-primary mx-2" />
      ) : locationAddress !== null ? ( // locationAddress가 null이 아니면 주소가 있거나 실패 메시지 설정됨
        <p className={cn('font-medium text-sm', className)}>
          {locationAddress}
        </p>
      ) : (
        // locationAddress가 여전히 null이면, 초기 위치를 가져오지 못했거나 에러 상태
        <p className={cn('font-medium text-sm', className)}>
          주소 불러오기 실패
        </p>
      )}
      <LocationPermissionModal />
    </>
  );
}

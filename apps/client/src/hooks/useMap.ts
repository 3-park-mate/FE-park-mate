'use client';

import { RefObject, useCallback, useEffect, useState, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { getCurrentCoordsUtil } from '@/utils/geolocationUtils';
import { ParkingLotsInBoxResponseType } from '@/types/parkingDataTypes';
import { getParkingLotsInBox } from '@/actions/parking/parking-service';

export default function useMap(mapRef: RefObject<kakao.maps.Map | null>) {
  const searchParams = useSearchParams();
  const latParam = Number(searchParams.get('lat'));
  const lngParam = Number(searchParams.get('lng'));

  const [center, setCenter] = useState({
    lat: latParam || 37.5714,
    lng: lngParam || 126.9768,
  });

  const [parkingLotList, setParkingLotList] =
    useState<ParkingLotsInBoxResponseType>({ parkingLots: [] });

  const [isLoading, setIsLoading] = useState(false);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const lastBoundsRef = useRef<string>('');
  const lastSearchParamsRef = useRef<string>('');

  const centerMapToCurrentLocation = useCallback(async () => {
    try {
      const { lat, lng } = await getCurrentCoordsUtil();
      setCenter({ lat, lng });
    } catch (err) {
      console.log('현재 위치를 가져오는데 실패했습니다:', err);
    }
  }, []);

  const initMap = useCallback(async () => {
    if (latParam && lngParam) {
      setCenter({ lat: latParam, lng: lngParam });
    } else {
      await centerMapToCurrentLocation();
    }
  }, [latParam, lngParam, centerMapToCurrentLocation]);

  const fetchData = useCallback(async () => {
    const map = mapRef.current;
    if (!map || isLoading) return;

    const sw = map.getBounds().getSouthWest();
    const ne = map.getBounds().getNorthEast();

    // 현재 bounds를 문자열로 변환하여 중복 요청 방지
    const currentBounds = `${sw.getLat()},${sw.getLng()},${ne.getLat()},${ne.getLng()}`;
    if (lastBoundsRef.current === currentBounds) return;

    lastBoundsRef.current = currentBounds;
    setIsLoading(true);

    try {
      const evParam = searchParams.get('ev') === 'true';
      const start = searchParams.get('start') || '';
      const end = searchParams.get('end') || '';

      const data = await getParkingLotsInBox({
        swLat: sw.getLat(),
        swLng: sw.getLng(),
        neLat: ne.getLat(),
        neLng: ne.getLng(),
        isEvChargingAvailable: evParam,
        startDateTime: start,
        endDateTime: end,
      });
      setParkingLotList(data);
    } catch (error) {
      console.error('주차장 데이터를 가져오는데 실패했습니다:', error);
    } finally {
      setIsLoading(false);
    }
  }, [mapRef, searchParams, isLoading]);

  const handleMapChange = useCallback(() => {
    const map = mapRef.current;
    if (!map) return;

    if (map.getLevel() < 7) {
      // 디바운싱 적용
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }

      debounceTimerRef.current = setTimeout(() => {
        fetchData();
      }, 300);
    }
  }, [mapRef, fetchData]);

  useEffect(() => {
    initMap();
  }, [initMap]);

  // searchParams 변경 감지하여 데이터 새로 가져오기
  useEffect(() => {
    const currentSearchParams = searchParams.toString();

    // searchParams가 변경되었고, 지도가 초기화된 상태에서만 데이터를 새로 가져옴
    if (currentSearchParams !== lastSearchParamsRef.current && mapRef.current) {
      lastSearchParamsRef.current = currentSearchParams;
      lastBoundsRef.current = ''; // bounds 캐시 초기화하여 강제로 데이터 가져오기

      // 디바운싱 타이머가 있다면 취소
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }

      // 즉시 데이터 가져오기
      fetchData();
    }
  }, [searchParams, mapRef, fetchData]);

  // 컴포넌트 언마운트 시 타이머 정리
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  return {
    center,
    centerMapToCurrentLocation,
    handleMapChange,
    parkingLotList,
    fetchData,
    isLoading,
  };
}

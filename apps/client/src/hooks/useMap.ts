'use client';

import { RefObject, useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { getCurrentCoordsUtil } from '@/utils/geolocationUtils';
import { getParkingLotsInBox } from '@/actions/map/map-service';
import { ParkingLotsInBoxResponseType } from '@/types/mapDataTypes';

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

  const centerMapToCurrentLocation = useCallback(async () => {
    try {
      const { lat, lng } = await getCurrentCoordsUtil();
      setCenter({ lat, lng });
    } catch (err) {
      console.error('현재 위치를 가져오는데 실패했습니다:', err);
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
    if (!map) return;

    const sw = map.getBounds().getSouthWest();
    const ne = map.getBounds().getNorthEast();

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
    console.log(data, evParam);
    setParkingLotList(data);
  }, [mapRef, searchParams]);

  const handleMapChange = () => {
    const map = mapRef.current;
    if (!map) return;

    if (map.getLevel() < 7) {
      fetchData();
    }
  };

  useEffect(() => {
    initMap();
  }, [initMap]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    center,
    centerMapToCurrentLocation,
    handleMapChange,
    parkingLotList,
    fetchData,
  };
}

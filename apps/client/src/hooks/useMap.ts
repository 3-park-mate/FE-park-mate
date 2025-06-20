import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { getCurrentCoordsUtil } from '@/utils/geolocationUtils';
import { getParkingLotsInBox } from '@/actions/map/map-service';
import { ParkingLotsInBoxResponseType } from '@/types/mapDataTypes';

export default function useMap() {
  const searchParams = useSearchParams();

  const [center, setCenter] = useState({ lat: 37.5714, lng: 126.9768 });
  const [parkingLotList, setParkingLotList] =
    useState<ParkingLotsInBoxResponseType>({
      parkingLots: [],
    });

  const initMap = useCallback(async () => {
    const latParam = Number(searchParams.get('lat'));
    const lngParam = Number(searchParams.get('lng'));
    if (latParam && lngParam) {
      setCenter({ lat: latParam, lng: lngParam });
    } else {
      try {
        const { latitude, longitude } = await getCurrentCoordsUtil();
        setCenter({ lat: latitude, lng: longitude });
      } catch (err) {
        console.log('지도 중심 설정 실패:', err);
      }
    }
  }, [searchParams]);

  const centerMapToCurrentLocation = useCallback(async () => {
    try {
      const { latitude, longitude } = await getCurrentCoordsUtil();
      setCenter({ lat: latitude, lng: longitude });
    } catch (err) {
      console.log('지도 중심 설정 실패:', err);
    }
  }, []);

  const handleMapChange = (map: kakao.maps.Map) => {
    const lat = map.getCenter().getLat();
    const lng = map.getCenter().getLng();
    const swLatLng = map.getBounds().getSouthWest();
    const neLatLng = map.getBounds().getNorthEast();
    setCenter({ lat, lng });
    const fetchData = async () => {
      const data = await getParkingLotsInBox({
        swLat: swLatLng.getLat(),
        swLng: swLatLng.getLng(),
        neLat: neLatLng.getLat(),
        neLng: neLatLng.getLng(),
        isEvChargingAvailable: true,
      });
      setParkingLotList(data);
    };
    if (map.getLevel() < 6) fetchData();
  };

  useEffect(() => {
    initMap();
  }, [initMap]);

  return {
    center,
    initMap,
    centerMapToCurrentLocation,
    handleMapChange,
    parkingLotList,
  };
}

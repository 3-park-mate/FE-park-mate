import { initMapProps } from '@/types/mapDataTypes';
import { SearchLocationResultType } from '@/types/searchDataTypes';
import { getCurrentCoordsUtil } from './geolocationUtils';

export const searchLocationByKeywordUtil = (
  keyword: string
): Promise<SearchLocationResultType[]> => {
  return new Promise((resolve) => {
    const ps = new kakao.maps.services.Places();

    ps.keywordSearch(keyword, (data, status) => {
      if (status === kakao.maps.services.Status.OK) {
        const results: SearchLocationResultType[] = data.map((item) => ({
          position: {
            lat: parseFloat(item.y || ''),
            lng: parseFloat(item.x || ''),
          },
          content: item.place_name || '',
          road_address_name: item.road_address_name || '',
        }));

        resolve(results);
      } else {
        resolve([]);
      }
    });
  });
};

export const coordtoAddressUtil = (position: {
  lat: number;
  lng: number;
}): Promise<string | null> => {
  return new Promise((resolve, reject) => {
    console.log(position.lat, position.lng);
    const geocoder = new kakao.maps.services.Geocoder();
    console.log(geocoder);
    geocoder.coord2Address(position.lng, position.lat, (result, status) => {
      if (
        status === kakao.maps.services.Status.OK &&
        result &&
        result.length > 0
      ) {
        const address = result[0]?.address || result[0]?.road_address || null;
        resolve(address?.address_name || '');
      } else {
        reject(new Error('주소를 변환할 수 없습니다.'));
      }
    });
  });
};

export function parseInitMapParams(
  searchParams: URLSearchParams
): Partial<initMapProps> {
  const lat = Number(searchParams.get('lat'));
  const lng = Number(searchParams.get('lng'));

  const latValid = !isNaN(lat);
  const lngValid = !isNaN(lng);

  return {
    parkingLotUuid: searchParams.get('uuid') || '',
    lat: latValid ? lat : undefined,
    lng: lngValid ? lng : undefined,
    ev: searchParams.get('ev') === 'true',
    entry: searchParams.get('entry') || '',
    exit: searchParams.get('exit') || '',
  };
}

export async function centerMapToCurrentLocation({
  map,
  setCenter,
  fallback = true,
  fallbackCoords = { lat: 37.5714, lng: 126.9768 }, // 기본 fallback: 서울
}: {
  map: kakao.maps.Map;
  setCenter: (coords: { lat: number; lng: number }) => void;
  fallback?: boolean;
  fallbackCoords?: { lat: number; lng: number };
}) {
  try {
    const { lat, lng } = await getCurrentCoordsUtil();
    console.log('현재위치');

    if (map) {
      const latLng = new kakao.maps.LatLng(lat, lng);
      map.setCenter(latLng);
      setCenter({ lat, lng });
    }
  } catch (e) {
    if (map && fallback) {
      const fallback = new kakao.maps.LatLng(
        fallbackCoords.lat,
        fallbackCoords.lng
      );
      map.setCenter(fallback);
      setCenter(fallbackCoords);
    }
    console.warn('현재 위치 가져오기 실패:', e);
  }
}

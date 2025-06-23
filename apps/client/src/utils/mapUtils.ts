import { SearchLocationResultType } from '@/types/filterInfoType';
import { MapInfo } from '@/types/mapDataTypes';

export const updateMapState = (
  map: kakao.maps.Map,
  setMapCenter: (lat: number, lng: number, locationName: string | null) => void,
  setMapBounds: (
    neLat: number,
    swLat: number,
    neLng: number,
    swLng: number
  ) => void
) => {
  const center = map.getCenter();
  const bounds = map.getBounds();
  const ne = bounds.getNorthEast();
  const sw = bounds.getSouthWest();

  setMapCenter(center.getLat(), center.getLng(), null);
  setMapBounds(ne.getLat(), sw.getLat(), ne.getLng(), sw.getLng());
};

export const searchLocationByKeywordUtil = (
  keyword: string
): Promise<SearchLocationResultType[]> => {
  return new Promise((resolve, reject) => {
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
        reject;
      }
    });
  });
};

export const coordtoAddressUtil = (position: {
  lat: number;
  lng: number;
}): Promise<string | null> => {
  return new Promise((resolve) => {
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
        resolve('현재 위치 정보를 확인할 수 없습니다.');
      }
    });
  });
};

export const getMapInfo = (
  map: kakao.maps.Map,
  info: Array<'center' | 'bounds' | 'level'>
): MapInfo => {
  const center = map.getCenter();
  const bounds = map.getBounds();
  const level = map.getLevel();

  const infoHandlers = {
    center: () => ({ center: { lat: center.getLat(), lng: center.getLng() } }),
    bounds: () => ({
      bounds: {
        swLat: bounds.getSouthWest().getLat(),
        swLng: bounds.getSouthWest().getLng(),
        neLat: bounds.getNorthEast().getLat(),
        neLng: bounds.getNorthEast().getLng(),
      },
    }),
    level: () => ({ level }),
  };

  return info.reduce<MapInfo>((result, key) => {
    return { ...result, ...infoHandlers[key]() };
  }, {});
};

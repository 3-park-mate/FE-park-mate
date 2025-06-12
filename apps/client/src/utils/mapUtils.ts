import { SearchLocationResultType } from '@/types/filterInfoType';
import { CoordsToRoadAddressType } from '@/types/mapDataTypes';

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
        let results = [];
        for (var i = 0; i < data.length; i++) {
          results.push({
            position: {
              lat: parseFloat(data[i]?.y || ''),
              lng: parseFloat(data[i]?.x || ''),
            },
            content: data[i]?.place_name || '',
            road_address_name: data[i]?.road_address_name || '',
          });
        }
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
}): Promise<CoordsToRoadAddressType | null> => {
  return new Promise((resolve, reject) => {
    const geocoder = new kakao.maps.services.Geocoder();
    console.log(geocoder);
    geocoder.coord2Address(position.lng, position.lat, (result, status) => {
      if (status === kakao.maps.services.Status.OK && result) {
        const address = result[0]?.road_address || null;
        resolve(address);
      } else {
        reject(new Error('주소 변환 실패'));
      }
    });
  });
};

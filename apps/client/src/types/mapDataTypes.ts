export interface MarkerDataType {
  parkingLotUuid: string;
  availableSpots: number;
  latitude: number;
  longitude: number;
}

export interface ParkingLotSimpleInfoType {
  name: string;
  address: string;
  distance: number;
  thumbnailUrl: string;
  baseFee: number;
  evchargeType: number[];
  averageRating: number;
  reviewCount: number;
  likeCount: number;
  dislikeCount: number;
}

export interface CoordsToRoadAddressType {
  address_name: string;
  region_1depth_name: string;
  region_2depth_name: string;
  region_3depth_name: string;
  road_name: string;
  underground_yn: 'Y' | 'N';
  main_building_no: string;
  sub_building_no: string;
  building_name: string;
  zone_no: string;
  x: string;
  y: string;
}

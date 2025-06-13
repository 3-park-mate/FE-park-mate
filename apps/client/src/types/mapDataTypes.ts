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

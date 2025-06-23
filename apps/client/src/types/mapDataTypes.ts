export interface MarkerDataType {
  parkingLotUuid: string;
  availableSpots: number;
  latitude: number;
  longitude: number;
}

export interface ParkingLotModalInfoType {
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

export interface ParkingLotListSimpleInfoType {
  name: string;
  address: string;
  distance: number;
  thumbnailUrls: string[];
  baseFee: number;
  evchargeType: number[];
  averageRating: number;
  reviewCount: number;
  likeCount: number;
  dislikeCount: number;
}

export interface MapInfo {
  center?: {
    lat: number;
    lng: number;
  };
  bounds?: {
    swLat: number;
    swLng: number;
    neLat: number;
    neLng: number;
  };
  level?: number;
}
export interface ParkingLotsInBoxResponseType {
  parkingLots: ParkingLotSimpleInfoType[];
}

export interface ParkingLotSimpleInfoType {
  parkingLotUuid: string;
  name: string;
  address?: string;
  thumbnailUrl: string | null;
  imageUrls: {
    imageUrl: string;
  }[];
  latitude: number;
  longitude: number;
  distance: number;
  availableSpotCount: number;
}

export interface ParkingLotInfoType {
  parkingLotUuid: string;
  hostUuid: string;
  thumbnailUrl: string;
  name: string;
  phoneNumber: string;
  address: string;
  latitude: number;
  longitude: number;
  capacity: number;
  parkingLotType: string;
  parkingSpotTypes: string[];
  evChargeTypes: string[];
  extraInfo: string;
  imageUrls: {
    imageUrl: string;
  }[];
  options: {
    name: string;
    label: string;
  }[];
  likeCount: 0;
  dislikeCount: 0;
}

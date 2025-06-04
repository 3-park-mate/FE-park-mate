export interface ParkingLocationDataType {
  parkingLotUuid: string;
  parkingLotName: string;
  parkingLotDistance: number;
  parkingSpotName: string;
  vehicleNumber: string;
}

export interface ParkingTimeDataType {
  entryTime: string;
  exitTime: string;
}

export interface ParkingQRDataType {
  parkingLotUuid: string;
  entryTime: string;
  exitTime: string;
  parkingSpotName: string;
  vehicleNumber: string;
}

export interface ParkingCarouselItemDataType {
  parkingLotUuid: string;
  name: string;
  distance: number;
  thumbnailUrl: string;
  baseFee: number;
  averageRating: number;
}

export interface ReviewSummaryType {
  averageRating: number;
  totalReviews: number;
}

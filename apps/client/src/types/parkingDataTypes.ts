export interface ParkingLocationDataType {
  parkingLotName: string;
  parkingLotDistance: number;
  parkingSpotName: string;
  vehicleNumber: string;
}

export interface ParkingTimeDataType {
  entryTime: string;
  exitTime: string;
}

export interface NearParkingDataType {
  averageRating: number;
}

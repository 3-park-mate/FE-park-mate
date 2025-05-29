import {
  ParkingLocationDataType,
  ParkingTimeDataType,
} from '@/types/parkingDataTypes';

export const parkingLocationDummy: ParkingLocationDataType = {
  parkingLotName: '센트럴 파크 주차장',
  parkingLotDistance: 100,
  parkingSpotName: 'A-101',
  vehicleNumber: '12가 3456',
};

export const parkingTimeDummy: ParkingTimeDataType = {
  entryTime: '2025-05-29T09:00:00',
  exitTime: '2025-05-29T18:00:00',
};

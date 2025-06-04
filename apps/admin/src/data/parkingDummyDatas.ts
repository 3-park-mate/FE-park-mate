import {
  ParkingCarouselItemDataType,
  ParkingLocationDataType,
  ParkingTimeDataType,
} from '@/types/parkingDataTypes';

export const parkingLocationDummy: ParkingLocationDataType = {
  parkingLotUuid: '1',
  parkingLotName: '센트럴 파크 주차장',
  parkingLotDistance: 100,
  parkingSpotName: 'A-101',
  vehicleNumber: '12가 3456',
};

export const parkingTimeDummy: ParkingTimeDataType = {
  entryTime: '2025-05-29T09:00:00',
  exitTime: '2025-05-29T18:00:00',
};

export const parkingCarouselItemsDummy: ParkingCarouselItemDataType[] = [
  {
    parkingLotUuid: '1',
    name: '한빛 주차장',
    thumbnailUrl: 'https://dummyimage.com/155x102',
    averageRating: 4.5,
    isOperating: true,
  },
  {
    parkingLotUuid: '2',
    name: '시청역 주차타워',
    thumbnailUrl: 'https://dummyimage.com/155x102',
    averageRating: 4.2,
    isOperating: false,
  },
  {
    parkingLotUuid: '1',
    name: '한빛 주차장',
    thumbnailUrl: 'https://dummyimage.com/155x102',
    averageRating: 4.5,
    isOperating: true,
  },
  {
    parkingLotUuid: '2',
    name: '시청역 주차타워',
    thumbnailUrl: 'https://dummyimage.com/155x102',
    averageRating: 4.2,
    isOperating: false,
  },
  {
    parkingLotUuid: '1',
    name: '한빛 주차장',
    thumbnailUrl: 'https://dummyimage.com/155x102',
    averageRating: 4.5,
    isOperating: true,
  },
  {
    parkingLotUuid: '2',
    name: '시청역 주차타워',
    thumbnailUrl: 'https://dummyimage.com/155x102',
    averageRating: 4.2,
    isOperating: false,
  },
];

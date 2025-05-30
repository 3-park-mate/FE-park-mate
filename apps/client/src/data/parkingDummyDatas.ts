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
    distance: 350,
    thumbnailUrl: 'https://dummyimage.com/155x102',
    baseFee: 1000,
    averageRating: 4.5,
  },
  {
    parkingLotUuid: '2',
    name: '시청역 주차타워',
    distance: 150,
    thumbnailUrl: 'https://dummyimage.com/155x102',
    baseFee: 1200,
    averageRating: 4.2,
  },
  {
    parkingLotUuid: '3',
    name: '강남 주차빌딩',
    distance: 500,
    thumbnailUrl: 'https://dummyimage.com/155x102',
    baseFee: 1500,
    averageRating: 4.7,
  },
  {
    parkingLotUuid: '4',
    name: '명동 주차장',
    distance: 420,
    thumbnailUrl: 'https://dummyimage.com/155x102',
    baseFee: 1100,
    averageRating: 4.3,
  },
  {
    parkingLotUuid: '5',
    name: '홍대 주차타워',
    distance: 300,
    thumbnailUrl: 'https://dummyimage.com/155x102',
    baseFee: 1300,
    averageRating: 4.6,
  },
  {
    parkingLotUuid: '6',
    name: '건대입구 주차빌딩',
    distance: 280,
    thumbnailUrl: 'https://dummyimage.com/155x102',
    baseFee: 1250,
    averageRating: 4.4,
  },
  {
    parkingLotUuid: '7',
    name: '여의도 주차장',
    distance: 600,
    thumbnailUrl: 'https://dummyimage.com/155x102',
    baseFee: 1600,
    averageRating: 4.8,
  },
  {
    parkingLotUuid: '8',
    name: '잠실 주차타워',
    distance: 530,
    thumbnailUrl: 'https://dummyimage.com/155x102',
    baseFee: 1400,
    averageRating: 4.5,
  },
];

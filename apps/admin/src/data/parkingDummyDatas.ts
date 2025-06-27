import {
  OperationDataType,
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

export const operationsDummy: OperationDataType[] = [
  {
    parkingOperationUuid: 'op-1',
    parkingLotUuid: 'lot-1',
    operationDate: '2025-06-23T00:00:00.000Z',
    validStartTime: '2025-06-23T08:00:00.000Z',
    validEndTime: '2025-06-23T20:00:00.000Z',
    baseIntervalMinutes: 30,
    baseFee: 1000,
    extraIntervalMinutes: 10,
    extraFee: 500,
    discountRate: 10,
  },
  {
    parkingOperationUuid: 'op-2',
    parkingLotUuid: 'lot-1',
    operationDate: '2025-06-24T00:00:00.000Z',
    validStartTime: '2025-06-24T09:00:00.000Z',
    validEndTime: '2025-06-24T18:00:00.000Z',
    baseIntervalMinutes: 60,
    baseFee: 2000,
    extraIntervalMinutes: 15,
    extraFee: 700,
    discountRate: 0,
  },
  {
    parkingOperationUuid: 'op-3',
    parkingLotUuid: 'lot-1',
    operationDate: '2025-06-26T00:00:00.000Z',
    validStartTime: '2025-06-26T07:30:00.000Z',
    validEndTime: '2025-06-26T22:00:00.000Z',
    baseIntervalMinutes: 15,
    baseFee: 500,
    extraIntervalMinutes: 5,
    extraFee: 300,
    discountRate: 20,
  },
];

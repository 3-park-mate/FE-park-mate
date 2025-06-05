import {
  ParkingCarouselItemDataType,
  ParkingDetailDataType,
  ParkingLocationDataType,
  ParkingTimeDataType,
  ReviewSummaryDataType,
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

export const parkingDetailDummy: ParkingDetailDataType = {
  hostUuid: '123e4567-e89b-12d3-a456-426614174000',
  parkingLotType: '지상',
  name: '강남 제1 주차장',
  parkingCapacity: 100,
  registeredParkingCount: 85,
  zoneCode: '06236',
  mainAddress: '서울특별시 강남구 테헤란로 123',
  detailAddress: '지상 1층',
  evChargingAvailable: true,
  phoneNumber: '02-1234-5678',
  extraInfo: '24시간 운영, 카드 결제 가능',
  imageUrls: [
    'https://dummyimage.com/310x204',
    'https://dummyimage.com/150x150',
  ],
  parkingSpotChargeTypeList: [
    {
      chargeTypeId: 1,
      chargeTypeName: 'AC단상',
    },
    {
      chargeTypeId: 2,
      chargeTypeName: 'AC3상',
    },
  ],
};

export const reviewSummaryDummy: ReviewSummaryDataType = {
  averageRating: 4.5,
  totalReviews: 128,
};

import {
  GetAvailableDayReponse,
  ReservationInfoItemDataType,
} from '@/types/reservationType';

export const reservationInfoDummy: ReservationInfoItemDataType[] = [
  {
    parkingLotUuid: 'uuid-001',
    parkingLotName: '한빛 주차장',
    parkingSpotName: 'A-12',
    entryTime: '2025-05-30T09:00:00',
    exitTime: '2025-05-30T18:00:00',
    vehicleNumber: '12가3456',
  },
  {
    parkingLotUuid: 'uuid-002',
    parkingLotName: '시청역 주차타워',
    parkingSpotName: 'B-05',
    entryTime: '2025-05-29T08:30:00',
    exitTime: '2025-05-29T17:30:00',
    vehicleNumber: '34나7890',
  },
  {
    parkingLotUuid: 'uuid-003',
    parkingLotName: '강남 주차빌딩',
    parkingSpotName: 'C-23',
    entryTime: '2025-05-28T07:45:00',
    exitTime: '2025-05-28T16:45:00',
    vehicleNumber: '56다1234',
  },
];

export const getAvailableDayDummy: GetAvailableDayReponse = {
  day: [
    // ✅ 6월
    '2025-06-27',
    '2025-06-28',
    '2025-06-29',
    '2025-06-30',

    // ✅ 7월
    '2025-07-02',
    '2025-07-05',
    '2025-07-10',
    '2025-07-15',

    // ✅ 8월
    '2025-08-01',
    '2025-08-03',
    '2025-08-20',
  ],
};

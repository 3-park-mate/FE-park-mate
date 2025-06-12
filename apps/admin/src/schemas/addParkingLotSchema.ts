import { z } from 'zod';

export const parkingLotFormSchema = z.object({
  name: z.string().min(1, '주차장명을 입력해 주세요.'),
  zoneCode: z.string(),
  mainAddress: z.string().min(1, '주차장 주소를 추가해 주세요.'),
  detailAddress: z.string().min(1, '상세 주소를 입력해 주세요.'),
  extraInfo: z.string().min(10, '기타 정보는 최소 10자 이상 입력해야 합니다.'),
});

export const parkingLotImageSchema = z.object({
  imageUrls: z.array(z.string().min(1, '이미지를 하나 이상 업로드해 주세요.')),
});

export const chargeableParkingSpotSchema = z.object({
  parkingSpotType: z.literal('EV'),
  evChargeTypes: z
    .array(z.enum(['AC_SINGLE', 'DC_COMBO', 'DC_CHADEMO', 'AC_THREE_PHASE']))
    .min(1, '최소 하나의 충전 방식을 선택해주세요.')
    .optional(),
});

export const nonChargeableParkingSpotSchema = z.object({
  parkingSpotType: z.union([
    z.literal('SMALL'),
    z.literal('COMPACT'),
    z.literal('STANDARD'),
    z.literal('LARGE'),
  ]),
  count: z.number().int(),
});

export const addParkingLotSchema = z.object({
  parkingLot: parkingLotFormSchema,
  parkingLotImage: parkingLotImageSchema,
  parkingSpot: z.object({
    chargeable: z.array(chargeableParkingSpotSchema).optional(),
    nonChargeable: z.array(nonChargeableParkingSpotSchema),
  }),
});

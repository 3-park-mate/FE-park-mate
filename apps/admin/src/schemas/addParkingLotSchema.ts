import { z } from 'zod';

export const parkingLotFormSchema = z.object({
  name: z.string().min(1, '주차장명을 입력해 주세요.'),
  zoneCode: z.string(),
  mainAddress: z.string().min(1, '주차장 주소를 추가해 주세요.'),
  detailAddress: z.string().min(1, '상세 주소를 입력해 주세요.'),
  extraInfo: z.string().min(10, '기타 정보는 최소 10자 이상 입력해야 합니다.'),
});

export const addParkingLotSchema = z.object({
  parkingLot: parkingLotFormSchema,
  // parkingLotImage: z.object({
  //   imageUrls: z.array(
  //     z.string().min(1, '이미지를 하나 이상 업로드해 주세요.')
  //   ),
  // }),
  //  chargeable: z.array(
  //   z.object({
  //     parkingSpotType: z.string(),
  //     evChargeTypes: z.array(z.string()).optional(),
  //   })
  // ).optional(),
  // nonChargeable: z
  //   .array(
  //     z.object({
  //       parkingSpotType: z.union([
  //         z.literal('SMALL'),
  //         z.literal('STANDARD'),
  //         z.literal('LARGE'),
  //       ]),
  //       count: z.number().int().min(0, '주차면을 1개 이상 설정해 주세요.'),
  //     })
  //   )
  //   .optional(),
});

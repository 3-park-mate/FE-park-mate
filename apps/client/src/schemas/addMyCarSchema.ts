import { z } from 'zod';

export const addMyCarSchema = z.object({
  vehicleNumber: z
    .string()
    .min(1, '차량 번호를 입력해 주세요.')
    .regex(
      /^[0-9]{2,3}[가-힣][0-9]{4}$/,
      '올바른 차량 번호 형식을 입력해 주세요.'
    ),
  nickname: z.string().min(1, '차량 별명을 입력해 주세요.'),
  defaultSelected: z.boolean(),
});

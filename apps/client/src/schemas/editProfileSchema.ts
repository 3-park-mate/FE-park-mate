import { z } from 'zod';

export const editProfileSchema = z.object({
  name: z.string().min(2, '이름은 2자 이상이어야 합니다.'),
  phoneNumber: z
    .string()
    .regex(/^010-\d{4}-\d{4}$/, '유효한 전화번호 형식이 아닙니다.'),
});

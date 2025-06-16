import { z } from 'zod';

export const signUpSchema = z
  .object({
    email: z.string().email('유효한 이메일을 입력하세요.'),
    verificationCode: z.string().min(6),
    password: z
      .string()
      .min(8, '비밀번호는 8자 이상이어야 합니다.')
      .regex(
        /^(?=.*[A-Za-z])(?=.*\d)/,
        '비밀번호는 영문과 숫자를 포함해야 합니다.'
      )
      .regex(/[!@#$%^&*]/, '비밀번호는 특수문자를 포함해야 합니다.'),
    confirmPassword: z.string().min(1, '비밀번호 확인을 입력하세요.'),
    name: z.string().min(2, '이름은 2자 이상이어야 합니다.'),
    phoneNumber: z
      .string()
      .regex(/^010-\d{4}-\d{4}$/, '유효한 전화번호 형식이 아닙니다.'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['confirmPassword'],
  });

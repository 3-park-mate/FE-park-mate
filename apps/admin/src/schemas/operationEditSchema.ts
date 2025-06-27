import { z } from 'zod';

export const operationEditSchema = z
  .object({
    validStartTime: z.string().min(1, '시작 시간을 입력해주세요.'),
    validEndTime: z.string().min(1, '종료 시간을 입력해주세요.'),
    baseIntervalMinutes: z.number({
      required_error: '기본 단위 시간을 입력해주세요.',
      invalid_type_error: '값은 숫자여야 합니다.',
    }),
    baseFee: z
      .number({
        required_error: '기본 요금을 입력해주세요.',
        invalid_type_error: '값은 숫자여야 합니다.',
      })
      .int('기본 요금은 정수여야 합니다.')
      .min(100, '기본 요금은 100원 이상이어야 합니다.'),
    extraIntervalMinutes: z.number({
      required_error: '추가 요금 단위 시간을 입력해주세요.',
      invalid_type_error: '값은 숫자여야 합니다.',
    }),
    extraFee: z
      .number({
        required_error: '추가 요금을 입력해주세요.',
        invalid_type_error: '값은 숫자여야 합니다.',
      })
      .int('추가 요금은 정수여야 합니다.')
      .min(100, '추가 요금은 100원 이상이어야 합니다.'),
    discountRate: z
      .number({
        required_error: '할인율을 입력해주세요.',
        invalid_type_error: '값은 숫자여야 합니다.',
      })
      .int('할인율은 정수여야 합니다.')
      .min(0, '할인율은 0 이상이어야 합니다.')
      .max(100, '할인율은 100 이하여야 합니다.'),
  })
  .refine(
    (data) => {
      if (!data.validStartTime || !data.validEndTime) {
        return false;
      }

      const startTimeParts = data.validStartTime.split(':');
      const endTimeParts = data.validEndTime.split(':');

      if (startTimeParts.length !== 2 || endTimeParts.length !== 2) {
        return false;
      }

      const startH = Number(startTimeParts[0]);
      const startM = Number(startTimeParts[1]);
      const endH = Number(endTimeParts[0]);
      const endM = Number(endTimeParts[1]);

      if (isNaN(startH) || isNaN(startM) || isNaN(endH) || isNaN(endM)) {
        return false;
      }

      const startTimeInMinutes = startH * 60 + startM;
      const endTimeInMinutes = endH * 60 + endM;

      return endTimeInMinutes > startTimeInMinutes;
    },
    {
      message: '종료 시간은 시작 시간보다 늦어야 합니다.',
      path: ['validEndTime'],
    }
  );

export type OperationFormSchema = z.infer<typeof operationEditSchema>;

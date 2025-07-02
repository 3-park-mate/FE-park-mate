import z from 'zod';

export const mapFilterScheduleSchema = z
  .object({
    entryDateTime: z.date().nullable(),
    exitDateTime: z.date().nullable(),
  })
  .refine(
    ({ entryDateTime, exitDateTime }) =>
      entryDateTime && exitDateTime && entryDateTime < exitDateTime,
    {
      message: '출차 시간은 입차 시간 이후여야 합니다.',
      path: ['exitDateTime'],
    }
  );

import z from 'zod';

export const mapFilterScheduleSchema = z
  .object({
    selectedDateTime: z.object({
      entryDateTime: z.date().nullable(),
      exitDateTime: z.date().nullable(),
    }),
  })
  .refine(
    (data) => {
      const { entryDateTime, exitDateTime } = data.selectedDateTime;
      if (!entryDateTime || !exitDateTime) return false;
      return entryDateTime < exitDateTime;
    },
    {
      message: '입차 시간 이후여야 합니다.',
      path: ['selectedDateTime'],
    }
  );

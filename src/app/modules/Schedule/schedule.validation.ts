import { z } from 'zod';

const createtrainingClassValidationSchema = z.object({
  body: z.object({
    classTitle: z.string().min(1, 'Class title is required'),
    date: z
      .string()
      .refine(
        (val: string) => /^\d{4}-\d{2}-\d{2}$/.test(val),
        'Date must be in YYYY-MM-DD format',
      ),
    startTime: z
      .string()
      .refine(
        (val: string) => /^\d{2}:\d{2}$/.test(val),
        'Start time must be in HH:MM format',
      ),
    trainer: z.string().min(1, 'Trainer ID is required'),
  }),
});
export const ScheduleValidations = {
  createtrainingClassValidationSchema,
};

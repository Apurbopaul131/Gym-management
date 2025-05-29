"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScheduleValidations = void 0;
const zod_1 = require("zod");
const createtrainingClassValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        classTitle: zod_1.z.string().min(1, 'Class title is required'),
        date: zod_1.z
            .string()
            .refine((val) => /^\d{4}-\d{2}-\d{2}$/.test(val), 'Date must be in YYYY-MM-DD format'),
        startTime: zod_1.z
            .string()
            .refine((val) => /^\d{2}:\d{2}$/.test(val), 'Start time must be in HH:MM format'),
        trainer: zod_1.z.string().min(1, 'Trainer ID is required'),
    }),
});
exports.ScheduleValidations = {
    createtrainingClassValidationSchema,
};

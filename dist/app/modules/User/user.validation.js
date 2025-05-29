"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidations = void 0;
const zod_1 = require("zod");
const user_constant_1 = require("./user.constant");
const createUserValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z
            .string({
            required_error: 'Name is required',
            invalid_type_error: 'Name must be string',
        })
            .max(20, { message: 'Must be 20 or fewer characters long' }),
        email: zod_1.z
            .string({
            required_error: 'Email is required',
            invalid_type_error: 'Email must be string',
        })
            .email({ message: 'Invalid email address' }),
        password: zod_1.z
            .string({
            required_error: 'Password is required',
            invalid_type_error: 'Password must be string',
        })
            .min(8, { message: 'Must be 8 or more characters long' }),
        role: zod_1.z.enum([...user_constant_1.role], {
            message: 'Role must be Admin | Trainer | Trainee',
        }),
        isBlocked: zod_1.z
            .boolean({
            invalid_type_error: 'isBlocked must be boolean',
        })
            .optional(),
    }),
});
exports.UserValidations = {
    createUserValidationSchema,
};

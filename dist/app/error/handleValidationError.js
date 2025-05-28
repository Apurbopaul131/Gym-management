"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleMongooseValidationError = (err) => {
    const statusCode = 500;
    const message = 'Mongoose validation error!!';
    const errorSources = Object.values(err.errors).map((val) => {
        return {
            path: val === null || val === void 0 ? void 0 : val.path,
            message: val === null || val === void 0 ? void 0 : val.message,
        };
    });
    return {
        statusCode,
        message,
        errorSources,
    };
};
exports.default = handleMongooseValidationError;

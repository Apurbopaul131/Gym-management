"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleMongooseCastError = (err) => {
    const statusCode = 400;
    const message = 'Invalid ID!';
    const errorSources = [
        {
            path: err === null || err === void 0 ? void 0 : err.path,
            message: err === null || err === void 0 ? void 0 : err.message,
        },
    ];
    return {
        statusCode,
        message,
        errorSources,
    };
};
exports.default = handleMongooseCastError;

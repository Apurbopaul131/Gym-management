"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sendResponse = (res, data) => {
    const responseObj = (data === null || data === void 0 ? void 0 : data.data)
        ? {
            success: data === null || data === void 0 ? void 0 : data.success,
            statusCode: data === null || data === void 0 ? void 0 : data.statusCode,
            message: data === null || data === void 0 ? void 0 : data.message,
            Data: data === null || data === void 0 ? void 0 : data.data,
        }
        : {
            success: data === null || data === void 0 ? void 0 : data.success,
            statusCode: data === null || data === void 0 ? void 0 : data.statusCode,
            message: data === null || data === void 0 ? void 0 : data.message,
        };
    return res.status(data === null || data === void 0 ? void 0 : data.statusCode).json(responseObj);
};
exports.default = sendResponse;

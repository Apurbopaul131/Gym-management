"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//This function used for avoid repeated try catch block
const catchAsync = (fn) => {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch((err) => next(err));
    };
};
exports.default = catchAsync;

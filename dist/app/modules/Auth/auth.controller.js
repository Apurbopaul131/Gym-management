"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthControllers = void 0;
const catchAsync_1 = __importDefault(require("../../uitls/catchAsync"));
const sendResponse_1 = __importDefault(require("../../uitls/sendResponse"));
const auth_service_1 = require("./auth.service");
const createTrainer = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id, name, email } = yield auth_service_1.AuthServices.createTrainerIntoDb(req === null || req === void 0 ? void 0 : req.user, req.body);
    //send response to client
    (0, sendResponse_1.default)(res, {
        success: true,
        message: 'Trainer created successfully',
        statusCode: 201,
        data: {
            _id,
            name,
            email,
        },
    });
}));
const createTrainee = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id, name, email } = yield auth_service_1.AuthServices.createTraineeIntoDB(req.body);
    //send response to client
    (0, sendResponse_1.default)(res, {
        success: true,
        message: 'Trinee registered successfully',
        statusCode: 201,
        data: {
            _id,
            name,
            email,
        },
    });
}));
const loginUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const accessToken = yield auth_service_1.AuthServices.loginUser(req.body);
    //send response to client
    (0, sendResponse_1.default)(res, {
        success: true,
        message: 'Login successful',
        statusCode: 200,
        data: accessToken,
    });
}));
exports.AuthControllers = {
    createTrainee,
    loginUser,
    createTrainer,
};

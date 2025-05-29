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
exports.SchedulControllers = void 0;
const catchAsync_1 = __importDefault(require("../../uitls/catchAsync"));
const sendResponse_1 = __importDefault(require("../../uitls/sendResponse"));
const schedule_service_1 = require("./schedule.service");
const createScheduleClass = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield schedule_service_1.ScheduleServices.createScheduleClass(req.body);
    //send response to client
    (0, sendResponse_1.default)(res, {
        success: true,
        message: 'Schedule class Assigned successfully',
        statusCode: 201,
        data: result,
    });
}));
const bookSchedule = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const result = yield schedule_service_1.ScheduleServices.bookScheduleIntoDB((_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.id, (_b = req === null || req === void 0 ? void 0 : req.user) === null || _b === void 0 ? void 0 : _b.userId);
    //send response to client
    (0, sendResponse_1.default)(res, {
        success: true,
        message: 'Schedule booked successfully',
        statusCode: 201,
        data: result,
    });
}));
const cancleSchedule = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const result = yield schedule_service_1.ScheduleServices.cancleSchedule((_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.id, (_b = req === null || req === void 0 ? void 0 : req.user) === null || _b === void 0 ? void 0 : _b.userId);
    //send response to client
    (0, sendResponse_1.default)(res, {
        success: true,
        message: 'Schedule cancle successfully',
        statusCode: 201,
        data: result,
    });
}));
const getTrainerSchedule = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const result = yield schedule_service_1.ScheduleServices.getTrainerScheduleFromDB((_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.userId);
    //send response to client
    (0, sendResponse_1.default)(res, {
        success: true,
        message: 'Trainer Schedule retrived successfully',
        statusCode: 201,
        data: result,
    });
}));
// Exporting the controllers
exports.SchedulControllers = {
    createScheduleClass,
    bookSchedule,
    cancleSchedule,
    getTrainerSchedule,
};

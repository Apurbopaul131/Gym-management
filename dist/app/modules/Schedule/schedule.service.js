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
exports.ScheduleServices = void 0;
const AppError_1 = __importDefault(require("../../error/AppError"));
const user_model_1 = require("../User/user.model");
const schedule_model_1 = require("./schedule.model");
const schedule_utils_1 = require("./schedule.utils");
const createScheduleClass = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // Check if the trainer exists
    const trainerExists = yield user_model_1.User.findOne({
        _id: payload.trainer,
        role: 'Trainer',
    });
    if (!trainerExists) {
        throw new AppError_1.default(404, 'Trainer not found');
    }
    const preparedData = Object.assign(Object.assign({}, payload), { availavality: 10, endTime: (0, schedule_utils_1.addHoursToTime)(payload === null || payload === void 0 ? void 0 : payload.startTime, 2), trainees: [] });
    const result = yield schedule_model_1.ClassSchedule.create(preparedData);
    const classSchedule = yield schedule_model_1.ClassSchedule.findById(result._id)
        .select('classTitle date startTime endTime trainer availavality')
        .populate('trainer', 'name email');
    return classSchedule;
});
const bookScheduleIntoDB = (scheduleId, traineeId) => __awaiter(void 0, void 0, void 0, function* () {
    const schedule = yield schedule_model_1.ClassSchedule.findById(scheduleId);
    // Check if the schedule exists
    if (!schedule) {
        throw new AppError_1.default(404, 'Schedule not found');
    }
    // Check if there is availability
    if (schedule.trainees.length >= 10) {
        throw new AppError_1.default(400, 'Class schedule is full. Maximum 10 trainees allowed per schedule');
    }
    // Check if the trainee is already booked for this schedule
    //convert scheduleId to string if it is an ObjectId
    const traineesIdScheduleString = schedule === null || schedule === void 0 ? void 0 : schedule.trainees.map((id) => id.toString());
    if (traineesIdScheduleString.includes(traineeId)) {
        throw new AppError_1.default(400, 'Trainee is already booked for this schedule');
    }
    //check if the trainee has a booking conflict in same time slot
    const hasConflict = yield schedule_model_1.ClassSchedule.hasBookingconflict(traineeId, schedule === null || schedule === void 0 ? void 0 : schedule.startTime, schedule === null || schedule === void 0 ? void 0 : schedule.endTime, schedule.date.toString());
    if (hasConflict) {
        throw new AppError_1.default(400, 'Trainee has a booking conflict in the same time slot');
    }
    const updatedSchedule = yield schedule_model_1.ClassSchedule.findByIdAndUpdate(scheduleId, {
        $push: { trainees: traineeId },
        availavality: schedule.availavality - 1,
    }, { new: true });
    return updatedSchedule;
});
const cancleSchedule = (scheduleId, traineeId) => __awaiter(void 0, void 0, void 0, function* () {
    const schedule = yield schedule_model_1.ClassSchedule.findById(scheduleId);
    // Check if the schedule exists
    if (!schedule) {
        throw new AppError_1.default(404, 'Schedule not found');
    }
    // Check if the trainee is booked for this schedule
    const traineesIdScheduleString = schedule === null || schedule === void 0 ? void 0 : schedule.trainees.map((id) => id.toString());
    if (!traineesIdScheduleString.includes(traineeId)) {
        throw new AppError_1.default(400, 'Trainee is not booked for this schedule');
    }
    // Remove the trainee from the schedule and update availability
    const updatedSchedule = yield schedule_model_1.ClassSchedule.findByIdAndUpdate(scheduleId, {
        $pull: { trainees: traineeId },
        availavality: schedule.availavality + 1,
    }, { new: true });
    return updatedSchedule;
});
const getTrainerScheduleFromDB = (trainerId) => __awaiter(void 0, void 0, void 0, function* () {
    const schedules = yield schedule_model_1.ClassSchedule.find({ trainer: trainerId })
        .populate('trainer', 'name email')
        .populate('trainees', 'name email')
        .select('date startTime endTime trainer trainees availavality');
    if (!schedules || schedules.length === 0) {
        throw new AppError_1.default(404, 'No schedules found for this trainer');
    }
    return schedules;
});
exports.ScheduleServices = {
    createScheduleClass,
    bookScheduleIntoDB,
    cancleSchedule,
    getTrainerScheduleFromDB,
};

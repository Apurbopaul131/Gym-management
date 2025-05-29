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
exports.ClassSchedule = void 0;
const mongoose_1 = require("mongoose");
const AppError_1 = __importDefault(require("../../error/AppError"));
const schedule_utils_1 = require("./schedule.utils");
const classScheduleSchema = new mongoose_1.Schema({
    classTitle: {
        type: String,
        required: [true, 'Class title is required'],
    },
    date: {
        type: Date,
        required: [true, 'Date is required'],
    },
    startTime: {
        type: String,
        required: [true, 'Start time is required'],
    },
    endTime: {
        type: String,
        required: [true, 'End time is required'],
    },
    trainer: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Trainer is required'],
    },
    trainees: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
    availavality: {
        type: Number,
        required: [true, 'Availability is required'],
    },
}, {
    timestamps: true,
});
// Ensure that maximum of 10 trainees can be added to a class schedule
classScheduleSchema.pre('save', function (next) {
    if (this.trainees.length > 10) {
        throw new AppError_1.default(400, 'Trainees cannot exceed 10 per class.');
    }
    next();
});
// Ensure that no more than 5 classes can be created per day
classScheduleSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const totalSchedule = yield exports.ClassSchedule.find({
            date: this.date,
        });
        if (totalSchedule.length > 5) {
            throw new AppError_1.default(400, 'You cannot create more than 5 classes per day.');
        }
        next();
    });
});
// Ensure that the class time does not conflict with existing classes
classScheduleSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const secheduleForDate = yield exports.ClassSchedule.find({
            date: this.date,
        });
        const newStart = (0, schedule_utils_1.timeToMinutes)(this.startTime);
        const newEnd = (0, schedule_utils_1.timeToMinutes)((0, schedule_utils_1.addHoursToTime)(this.startTime, 2));
        const hasConFlictingTime = secheduleForDate.some((schedule) => {
            const existingStart = (0, schedule_utils_1.timeToMinutes)(schedule === null || schedule === void 0 ? void 0 : schedule.startTime);
            const existingEnd = (0, schedule_utils_1.timeToMinutes)((0, schedule_utils_1.addHoursToTime)(schedule === null || schedule === void 0 ? void 0 : schedule.startTime, 2));
            return newStart < existingEnd && newEnd > existingStart;
        });
        if (hasConFlictingTime) {
            throw new AppError_1.default(400, 'Class time conflicts with an existing class.');
        }
        next();
    });
});
classScheduleSchema.statics.hasBookingconflict = function (traineeId, startTime, endTime, date) {
    return __awaiter(this, void 0, void 0, function* () {
        const newStart = (0, schedule_utils_1.timeToMinutes)(startTime);
        const newEnd = (0, schedule_utils_1.timeToMinutes)(endTime);
        // Find all bookings for the same date by the trainee
        const bookings = yield this.find({
            date,
            trainees: traineeId,
        });
        return bookings.some((schedule) => {
            const existingStart = (0, schedule_utils_1.timeToMinutes)(schedule === null || schedule === void 0 ? void 0 : schedule.startTime);
            const existingEnd = (0, schedule_utils_1.timeToMinutes)(schedule === null || schedule === void 0 ? void 0 : schedule.endTime);
            // Check for overlap
            return newStart < existingEnd && newEnd > existingStart;
        });
    });
};
exports.ClassSchedule = (0, mongoose_1.model)('ClassSchedule', classScheduleSchema);

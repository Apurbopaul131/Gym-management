import { model, Schema } from 'mongoose';
import AppError from '../../error/AppError';
import { IClassSchedule, ScheduleModel } from './schedule.interface';
import { addHoursToTime, timeToMinutes } from './schedule.utils';

const classScheduleSchema = new Schema<IClassSchedule, ScheduleModel>(
  {
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
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Trainer is required'],
    },
    trainees: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],

    availavality: {
      type: Number,
      required: [true, 'Availability is required'],
    },
  },
  {
    timestamps: true,
  },
);

// Ensure that maximum of 10 trainees can be added to a class schedule
classScheduleSchema.pre('save', function (next) {
  if (this.trainees.length > 10) {
    throw new AppError(400, 'Trainees cannot exceed 10 per class.');
  }
  next();
});
// Ensure that no more than 5 classes can be created per day
classScheduleSchema.pre('save', async function (next) {
  const totalSchedule = await ClassSchedule.find({
    date: this.date,
  });
  if (totalSchedule.length > 5) {
    throw new AppError(400, 'You cannot create more than 5 classes per day.');
  }
  next();
});

// Ensure that the class time does not conflict with existing classes
classScheduleSchema.pre('save', async function (next) {
  const secheduleForDate = await ClassSchedule.find({
    date: this.date,
  });
  const newStart = timeToMinutes(this.startTime);
  const newEnd = timeToMinutes(addHoursToTime(this.startTime, 2));
  const hasConFlictingTime = secheduleForDate.some((schedule) => {
    const existingStart = timeToMinutes(schedule?.startTime);
    const existingEnd = timeToMinutes(addHoursToTime(schedule?.startTime, 2));
    return newStart < existingEnd && newEnd > existingStart;
  });
  if (hasConFlictingTime) {
    throw new AppError(400, 'Class time conflicts with an existing class.');
  }
  next();
});

classScheduleSchema.statics.hasBookingconflict = async function (
  traineeId: string,
  startTime: string,
  endTime: string,
  date: string,
) {
  const newStart = timeToMinutes(startTime);
  const newEnd = timeToMinutes(endTime);

  // Find all bookings for the same date by the trainee
  const bookings = await this.find({
    date,
    trainees: traineeId,
  });
  return bookings.some((schedule) => {
    const existingStart = timeToMinutes(schedule?.startTime);
    const existingEnd = timeToMinutes(schedule?.endTime);

    // Check for overlap
    return newStart < existingEnd && newEnd > existingStart;
  });
};
export const ClassSchedule = model<IClassSchedule, ScheduleModel>(
  'ClassSchedule',
  classScheduleSchema,
);

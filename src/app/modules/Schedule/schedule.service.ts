import AppError from '../../error/AppError';
import { User } from '../User/user.model';
import { IClassSchedule } from './schedule.interface';
import { ClassSchedule } from './schedule.model';
import { addHoursToTime } from './schedule.utils';

const createScheduleClass = async (
  payload: Pick<
    IClassSchedule,
    'classTitle' | 'date' | 'startTime' | 'trainer'
  >,
) => {
  // Check if the trainer exists
  const trainerExists = await User.findOne({
    _id: payload.trainer,
    role: 'Trainer',
  });
  if (!trainerExists) {
    throw new AppError(404, 'Trainer not found');
  }

  const preparedData = {
    ...payload,
    availavality: 10,
    endTime: addHoursToTime(payload?.startTime, 2),
    trainees: [],
  };

  const result = await ClassSchedule.create(preparedData);
  return result;
};

const bookScheduleIntoDB = async (scheduleId: string, traineeId: string) => {
  const schedule = await ClassSchedule.findById(scheduleId);
  // Check if the schedule exists
  if (!schedule) {
    throw new AppError(404, 'Schedule not found');
  }
  // Check if there is availability
  if (schedule.trainees.length >= 10) {
    throw new AppError(
      400,
      'Class schedule is full. Maximum 10 trainees allowed per schedule',
    );
  }
  // Check if the trainee is already booked for this schedule
  //convert scheduleId to string if it is an ObjectId
  const traineesIdScheduleString = schedule?.trainees.map((id) =>
    id.toString(),
  );
  if (traineesIdScheduleString.includes(traineeId)) {
    throw new AppError(400, 'Trainee is already booked for this schedule');
  }
  //check if the trainee has a booking conflict in same time slot
  const hasConflict = await ClassSchedule.hasBookingconflict(
    traineeId,
    schedule?.startTime,
    schedule?.endTime,
    schedule.date.toString(),
  );
  if (hasConflict) {
    throw new AppError(
      400,
      'Trainee has a booking conflict in the same time slot',
    );
  }
  const updatedSchedule = await ClassSchedule.findByIdAndUpdate(
    scheduleId,
    {
      $push: { trainees: traineeId },
      availavality: schedule.availavality - 1,
    },
    { new: true },
  );
  return updatedSchedule;
};

const cancleSchedule = async (scheduleId: string, traineeId: string) => {
  const schedule = await ClassSchedule.findById(scheduleId);
  // Check if the schedule exists
  if (!schedule) {
    throw new AppError(404, 'Schedule not found');
  }
  // Check if the trainee is booked for this schedule
  const traineesIdScheduleString = schedule?.trainees.map((id) =>
    id.toString(),
  );
  if (!traineesIdScheduleString.includes(traineeId)) {
    throw new AppError(400, 'Trainee is not booked for this schedule');
  }
  // Remove the trainee from the schedule and update availability
  const updatedSchedule = await ClassSchedule.findByIdAndUpdate(
    scheduleId,
    {
      $pull: { trainees: traineeId },
      availavality: schedule.availavality + 1,
    },
    { new: true },
  );
  return updatedSchedule;
};

const getTrainerScheduleFromDB = async (trainerId: string) => {
  const schedules = await ClassSchedule.find({ trainer: trainerId })
    .populate('trainer', 'name email')
    .populate('trainees', 'name email')
    .select('date startTime endTime trainer trainees availavality');

  if (!schedules || schedules.length === 0) {
    throw new AppError(404, 'No schedules found for this trainer');
  }
  return schedules;
};
export const ScheduleServices = {
  createScheduleClass,
  bookScheduleIntoDB,
  cancleSchedule,
  getTrainerScheduleFromDB,
};

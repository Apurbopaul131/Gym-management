/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose';

export interface IClassSchedule {
  classTitle: string;
  date: Date;
  startTime: string;
  endTime: string;
  trainer: Types.ObjectId;
  trainees: Types.ObjectId[];
  availavality: number;
}
export interface ScheduleModel extends Model<IClassSchedule> {
  hasBookingconflict(
    traineeId: string,
    startTime: string,
    endTime: string,
    date: string,
  ): Promise<boolean>;
}

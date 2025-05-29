import { Request, Response } from 'express';
import catchAsync from '../../uitls/catchAsync';
import sendResponse from '../../uitls/sendResponse';
import { ScheduleServices } from './schedule.service';

const createScheduleClass = catchAsync(async (req: Request, res: Response) => {
  const result = await ScheduleServices.createScheduleClass(req.body);

  //send response to client
  sendResponse(res, {
    success: true,
    message: 'Schedule class Assigned successfully',
    statusCode: 201,
    data: result,
  });
});

const bookSchedule = catchAsync(async (req: Request, res: Response) => {
  const result = await ScheduleServices.bookScheduleIntoDB(
    req?.params?.id,
    req?.user?.userId,
  );

  //send response to client
  sendResponse(res, {
    success: true,
    message: 'Schedule booked successfully',
    statusCode: 201,
    data: result,
  });
});

const cancleSchedule = catchAsync(async (req: Request, res: Response) => {
  const result = await ScheduleServices.cancleSchedule(
    req?.params?.id,
    req?.user?.userId,
  );

  //send response to client
  sendResponse(res, {
    success: true,
    message: 'Schedule cancle successfully',
    statusCode: 201,
    data: result,
  });
});

const getTrainerSchedule = catchAsync(async (req: Request, res: Response) => {
  const result = await ScheduleServices.getTrainerScheduleFromDB(
    req?.user?.userId,
  );

  //send response to client
  sendResponse(res, {
    success: true,
    message: 'Trainer Schedule retrived successfully',
    statusCode: 201,
    data: result,
  });
});
// Exporting the controllers
export const SchedulControllers = {
  createScheduleClass,
  bookSchedule,
  cancleSchedule,
  getTrainerSchedule,
};

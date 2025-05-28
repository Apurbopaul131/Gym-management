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
export const SchedulControllers = {
  createScheduleClass,
  bookSchedule,
};

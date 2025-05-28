import { Request, Response } from 'express';
import catchAsync from '../../uitls/catchAsync';
import sendResponse from '../../uitls/sendResponse';
import { AuthServices } from './auth.service';

const createTrainer = catchAsync(async (req: Request, res: Response) => {
  const { _id, name, email } = await AuthServices.createTrainerIntoDb(
    req?.user,
    req.body,
  );

  //send response to client
  sendResponse(res, {
    success: true,
    message: 'Trainer created successfully',
    statusCode: 201,
    data: {
      _id,
      name,
      email,
    },
  });
});
const createTrainee = catchAsync(async (req: Request, res: Response) => {
  const { _id, name, email } = await AuthServices.createTraineeIntoDB(req.body);

  //send response to client
  sendResponse(res, {
    success: true,
    message: 'Trinee registered successfully',
    statusCode: 201,
    data: {
      _id,
      name,
      email,
    },
  });
});

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const accessToken = await AuthServices.loginUser(req.body);
  //send response to client
  sendResponse(res, {
    success: true,
    message: 'Login successful',
    statusCode: 200,
    data: accessToken,
  });
});

export const AuthControllers = {
  createTrainee,
  loginUser,
  createTrainer,
};

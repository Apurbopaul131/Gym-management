import { Response } from 'express';

type TRecive<T> = {
  statusCode: number;
  success: boolean;
  message: string;
  data?: T;
};
type TReturn<T> = {
  success: boolean;
  message: string;
  data?: T;
};

const sendResponse = <T>(
  res: Response,
  data: TRecive<T>,
): Response<TReturn<T>> => {
  const responseObj = data?.data
    ? {
        success: data?.success,
        statusCode: data?.statusCode,
        message: data?.message,
        Data: data?.data,
      }
    : {
        success: data?.success,
        statusCode: data?.statusCode,
        message: data?.message,
      };
  return res.status(data?.statusCode).json(responseObj);
};
export default sendResponse;

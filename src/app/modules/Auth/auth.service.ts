import { JwtPayload } from 'jsonwebtoken';
import config from '../../config';
import AppError from '../../error/AppError';
import { TRole, TUser } from '../User/user.interface';
import { User } from '../User/user.model';
import { TLoginUser } from './auth.interface';
import { createToken } from './auth.uitls';

const createTrainerIntoDb = async (adminInfo: JwtPayload, payload: TUser) => {
  const isUserExist = await User.findOne({
    email: adminInfo?.email,
    role: adminInfo?.role,
  });
  //check if user is exist
  if (!isUserExist) {
    throw new AppError(404, 'Admin not found!');
  }
  //check if user is blocked
  if (isUserExist?.isBlocked) {
    throw new AppError(403, 'Admin is blocked!');
  }
  if (payload?.role !== 'Trainer') {
    throw new AppError(403, `Admin does not create ${payload?.role}`);
  }
  const result = await User.create(payload);
  return result;
};
const createTraineeIntoDB = async (payload: TUser) => {
  if (payload?.role !== 'Trainee') {
    throw new AppError(403, 'Role must be trinee');
  }
  const result = await User.create(payload);
  return result;
};
const loginUser = async (payload: TLoginUser) => {
  //call static method for chek user is exist or not
  const isUserExist = await User.findOne({ email: payload?.email });
  //check if user is exist
  if (!isUserExist) {
    throw new AppError(404, 'User not found!');
  }
  //check if user is blocked
  if (isUserExist?.isBlocked) {
    throw new AppError(403, 'User is blocked!');
  }
  //check if password match
  const passwordMatch = await User.checkLoginPasswordMatch(
    payload?.password,
    isUserExist?.password,
  );
  if (!passwordMatch) {
    throw new AppError(403, 'Password does not matched!');
  }

  //create token and send to the  client
  const jwtPayload = {
    userId: isUserExist?._id,
    email: isUserExist?.email,
    role: isUserExist?.role as TRole,
  };
  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_token_expires_in as string,
  );

  return {
    token: accessToken,
  };
};

export const AuthServices = {
  createTraineeIntoDB,
  loginUser,
  createTrainerIntoDb,
};

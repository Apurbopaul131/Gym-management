import { Types } from 'mongoose';
import { TRole } from '../User/user.interface';

export type TLoginUser = {
  email: string;
  password: string;
};
export type TJwtPayload = {
  userId: Types.ObjectId;
  email: string;
  role: TRole;
};

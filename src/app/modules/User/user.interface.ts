/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';
import { USER_ROLE } from './user.constant';

export type TRole = 'Admin' | 'Trainer' | 'Trainee';
export interface TUser {
  name: string;
  email: string;
  password: string;
  role: TRole;
  isBlocked?: boolean;
}
export type TUserRole = keyof typeof USER_ROLE;
export interface UserModel extends Model<TUser> {
  checkUserExistById(id: string): Promise<TUser>;
  checkLoginPasswordMatch(
    plainTextPassword: string,
    hashPassword: string,
  ): Promise<boolean>;
}

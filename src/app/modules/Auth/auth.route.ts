import express from 'express';
import auth from '../../middlewires/auth';
import validateRequest from '../../middlewires/validateRequest';
import { USER_ROLE } from '../User/user.constant';
import { UserValidations } from '../User/user.validation';
import { AuthControllers } from './auth.controller';
import { AuthValidations } from './auth.validation';

const router = express.Router();

router.post(
  '/auth/create-trainer',
  auth(USER_ROLE?.Admin),
  validateRequest(UserValidations.createUserValidationSchema),
  AuthControllers.createTrainer,
);
router.post(
  '/auth/create-trainee',
  validateRequest(UserValidations.createUserValidationSchema),
  AuthControllers.createTrainee,
);
router.post(
  '/auth/login',
  validateRequest(AuthValidations.loginUserValidationSchema),
  AuthControllers.loginUser,
);

export const AuthRoutes = router;

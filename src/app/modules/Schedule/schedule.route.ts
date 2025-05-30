import express from 'express';
import auth from '../../middlewires/auth';
import { USER_ROLE } from '../User/user.constant';
import { SchedulControllers } from './schedule.controller';

import validateRequest from '../../middlewires/validateRequest';
import { ScheduleValidations } from './schedule.validation';

const router = express.Router();
//create schedule class
router.post(
  '/v1/create-schedule',
  auth(USER_ROLE?.Admin),
  validateRequest(ScheduleValidations.createtrainingClassValidationSchema),
  SchedulControllers.createScheduleClass,
);
// book an schedule class
router.patch(
  '/v1/book-schedule/:id',
  auth(USER_ROLE?.Trainee),
  SchedulControllers.bookSchedule,
);

// cancle an schedule class
router.delete(
  '/v1/cancel-schedule/:id',
  auth(USER_ROLE?.Trainee),
  SchedulControllers.cancleSchedule,
);

// Show Trainer schedule class
router.get(
  '/v1/trainer-schedule',
  auth(USER_ROLE?.Trainer),
  SchedulControllers.getTrainerSchedule,
);
// Exporting the router
export const ScheduleRoutes = router;

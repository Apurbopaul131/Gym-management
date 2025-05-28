import express from 'express';
import auth from '../../middlewires/auth';
import { USER_ROLE } from '../User/user.constant';
import { SchedulControllers } from './schedule.controller';

const router = express.Router();
//create schedule class
router.post(
  '/auth/create-schedule',
  auth(USER_ROLE?.Admin),
  SchedulControllers.createScheduleClass,
);
// book an schedule class
router.patch(
  '/auth/book-schedule/:id',
  auth(USER_ROLE?.Trainee),
  SchedulControllers.bookSchedule,
);
export const ScheduleRoutes = router;

import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import globalErrorHandler from './app/middlewires/globalError';
import notFound from './app/middlewires/notFound';
import { AuthRoutes } from './app/modules/Auth/auth.route';
import { ScheduleRoutes } from './app/modules/Schedule/schedule.route';

const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());
app.use(cookieParser());

//Auth Route
app.use('/api', AuthRoutes);
//Schedule Route
app.use('/api', ScheduleRoutes);
//checking route
app.get('/', (req: Request, res: Response) => {
  res.send('Gym management server connected successfully.');
});
//global error handler
app.use(globalErrorHandler);

//Not Found
app.use(notFound);
export default app;

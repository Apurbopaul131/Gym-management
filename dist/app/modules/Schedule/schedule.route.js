"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScheduleRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewires/auth"));
const user_constant_1 = require("../User/user.constant");
const schedule_controller_1 = require("./schedule.controller");
const validateRequest_1 = __importDefault(require("../../middlewires/validateRequest"));
const schedule_validation_1 = require("./schedule.validation");
const router = express_1.default.Router();
//create schedule class
router.post('/v1/create-schedule', (0, auth_1.default)(user_constant_1.USER_ROLE === null || user_constant_1.USER_ROLE === void 0 ? void 0 : user_constant_1.USER_ROLE.Admin), (0, validateRequest_1.default)(schedule_validation_1.ScheduleValidations.createtrainingClassValidationSchema), schedule_controller_1.SchedulControllers.createScheduleClass);
// book an schedule class
router.patch('/v1/book-schedule/:id', (0, auth_1.default)(user_constant_1.USER_ROLE === null || user_constant_1.USER_ROLE === void 0 ? void 0 : user_constant_1.USER_ROLE.Trainee), schedule_controller_1.SchedulControllers.bookSchedule);
// cancle an schedule class
router.delete('/v1/cancel-schedule/:id', (0, auth_1.default)(user_constant_1.USER_ROLE === null || user_constant_1.USER_ROLE === void 0 ? void 0 : user_constant_1.USER_ROLE.Trainee), schedule_controller_1.SchedulControllers.cancleSchedule);
// Show Trainer schedule class
router.get('/v1/trainer-schedule', (0, auth_1.default)(user_constant_1.USER_ROLE === null || user_constant_1.USER_ROLE === void 0 ? void 0 : user_constant_1.USER_ROLE.Trainer), schedule_controller_1.SchedulControllers.getTrainerSchedule);
// Exporting the router
exports.ScheduleRoutes = router;

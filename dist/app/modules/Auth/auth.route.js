"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewires/auth"));
const validateRequest_1 = __importDefault(require("../../middlewires/validateRequest"));
const user_constant_1 = require("../User/user.constant");
const user_validation_1 = require("../User/user.validation");
const auth_controller_1 = require("./auth.controller");
const auth_validation_1 = require("./auth.validation");
const router = express_1.default.Router();
router.post('/v1/auth/create-trainer', (0, auth_1.default)(user_constant_1.USER_ROLE === null || user_constant_1.USER_ROLE === void 0 ? void 0 : user_constant_1.USER_ROLE.Admin), (0, validateRequest_1.default)(user_validation_1.UserValidations.createUserValidationSchema), auth_controller_1.AuthControllers.createTrainer);
router.post('/v1/auth/create-trainee', (0, validateRequest_1.default)(user_validation_1.UserValidations.createUserValidationSchema), auth_controller_1.AuthControllers.createTrainee);
router.post('/v1/auth/login', (0, validateRequest_1.default)(auth_validation_1.AuthValidations.loginUserValidationSchema), auth_controller_1.AuthControllers.loginUser);
exports.AuthRoutes = router;

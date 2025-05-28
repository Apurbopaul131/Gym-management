"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewires/validateRequest"));
const user_validation_1 = require("../User/user.validation");
const auth_controller_1 = require("./auth.controller");
const auth_validation_1 = require("./auth.validation");
const router = express_1.default.Router();
router.post('/auth/register', (0, validateRequest_1.default)(user_validation_1.UserValidations.createUserValidationSchema), auth_controller_1.AuthControllers.registerUser);
router.post('/auth/login', (0, validateRequest_1.default)(auth_validation_1.AuthValidations.loginUserValidationSchema), auth_controller_1.AuthControllers.loginUser);
exports.AuthRoutes = router;

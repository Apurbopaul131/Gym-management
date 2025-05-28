"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthServices = void 0;
const config_1 = __importDefault(require("../../config"));
const AppError_1 = __importDefault(require("../../error/AppError"));
const user_model_1 = require("../User/user.model");
const auth_uitls_1 = require("./auth.uitls");
const registerUserIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.create(payload);
    return result;
});
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    //call static method for chek user is exist or not
    const isUserExist = yield user_model_1.User.findOne({ email: payload === null || payload === void 0 ? void 0 : payload.email });
    //check if user is exist
    if (!isUserExist) {
        throw new AppError_1.default(404, 'User not found!');
    }
    //check if user is blocked
    if (isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.isBlocked) {
        throw new AppError_1.default(403, 'User is blocked!');
    }
    //check if password match
    const passwordMatch = yield user_model_1.User.checkLoginPasswordMatch(payload === null || payload === void 0 ? void 0 : payload.password, isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.password);
    if (!passwordMatch) {
        throw new AppError_1.default(403, 'Password does not matched!');
    }
    //create token and send to the  client
    const jwtPayload = {
        userId: isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist._id,
        email: isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.email,
        role: isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.role,
    };
    const accessToken = (0, auth_uitls_1.createToken)(jwtPayload, config_1.default.jwt_access_secret, config_1.default.jwt_access_token_expires_in);
    return {
        token: accessToken,
    };
});
exports.AuthServices = {
    registerUserIntoDB,
    loginUser,
};

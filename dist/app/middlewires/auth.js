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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const AppError_1 = __importDefault(require("../error/AppError"));
const user_model_1 = require("../modules/User/user.model");
const auth = (...requiredRoles) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const token = req.headers.authorization.replace(/^Bearer\s/, '');
            //check if token send from client
            if (!token) {
                throw new AppError_1.default(401, 'Invalid credentials');
            }
            //verify the token
            const decoded = jsonwebtoken_1.default.verify(token, config_1.default.jwt_access_secret);
            //destructure the decoded property
            const { userId, role } = decoded;
            const isUserExist = yield user_model_1.User.checkUserExistById(userId);
            //check if user is exist
            if (!isUserExist) {
                throw new AppError_1.default(404, 'User not found!');
            }
            //check if user is blocked
            if (isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.isBlocked) {
                throw new AppError_1.default(403, 'User is blocked!');
            }
            //check Authorization who are authorize to access the data
            if (requiredRoles && !requiredRoles.includes(role)) {
                throw new AppError_1.default(401, 'Invalid credentials');
            }
            req.user = decoded;
            next();
        }
        catch (err) {
            next(err);
        }
    });
};
exports.default = auth;

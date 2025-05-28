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
exports.AdminServices = void 0;
const AppError_1 = __importDefault(require("../../error/AppError"));
const blog_model_1 = require("../Blog/blog.model");
const user_model_1 = require("../User/user.model");
const blockedUserByAdminIntoDB = (authenticateUserInfo, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const isAdminExist = yield user_model_1.User.checkUserExistById(authenticateUserInfo === null || authenticateUserInfo === void 0 ? void 0 : authenticateUserInfo.userId);
    //check if authenticate admin exist
    if (!isAdminExist) {
        throw new AppError_1.default(404, 'Admin not found!');
    }
    //check if admin is blocked
    if (isAdminExist === null || isAdminExist === void 0 ? void 0 : isAdminExist.isBlocked) {
        throw new AppError_1.default(403, 'Admin is blocked!');
    }
    const isUserExist = yield user_model_1.User.checkUserExistById(userId);
    //check if user is exist
    if (!isUserExist) {
        throw new AppError_1.default(404, 'User not found!');
    }
    if (isUserExist && isUserExist.role !== 'user') {
        throw new AppError_1.default(403, 'You may provided admin id!');
    }
    //check if user is already blocked
    if (isUserExist.isBlocked) {
        throw new AppError_1.default(403, 'User is already blocked!');
    }
    const result = yield user_model_1.User.findByIdAndUpdate(userId, { isBlocked: true }, {
        new: true,
    });
    return result;
});
const deletedBlogByAdminIntoDB = (authenticateUserInfo, blogId) => __awaiter(void 0, void 0, void 0, function* () {
    const isAdminExist = yield user_model_1.User.checkUserExistById(authenticateUserInfo === null || authenticateUserInfo === void 0 ? void 0 : authenticateUserInfo.userId);
    //check if authenticate admin exist
    if (!isAdminExist) {
        throw new AppError_1.default(404, 'Admin not found!');
    }
    //check if admin is blocked
    if (isAdminExist === null || isAdminExist === void 0 ? void 0 : isAdminExist.isBlocked) {
        throw new AppError_1.default(403, 'Admin is blocked!');
    }
    const isBlogExist = yield blog_model_1.Blog.isBlogExistById(blogId);
    //check if user is exist
    if (!isBlogExist) {
        throw new AppError_1.default(404, 'Blog not found!');
    }
    const result = yield blog_model_1.Blog.findByIdAndDelete(blogId);
    return result;
});
exports.AdminServices = {
    blockedUserByAdminIntoDB,
    deletedBlogByAdminIntoDB,
};

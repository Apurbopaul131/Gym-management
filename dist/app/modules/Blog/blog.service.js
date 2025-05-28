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
exports.BlogServies = void 0;
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const AppError_1 = __importDefault(require("../../error/AppError"));
const user_model_1 = require("../User/user.model");
const blog_constant_1 = require("./blog.constant");
const blog_model_1 = require("./blog.model");
const createBlogIntoDB = (authenticateInfo, payload) => __awaiter(void 0, void 0, void 0, function* () {
    //check if user is exist
    const isUserExist = yield user_model_1.User.checkUserExistById(authenticateInfo === null || authenticateInfo === void 0 ? void 0 : authenticateInfo.userId);
    if (!isUserExist) {
        throw new AppError_1.default(404, 'User not found!');
    }
    //check if user is blocked
    if (isUserExist.isBlocked) {
        throw new AppError_1.default(403, 'User is blocked!');
    }
    //create blog
    const createdBlog = yield blog_model_1.Blog.create(Object.assign(Object.assign({}, payload), { author: authenticateInfo === null || authenticateInfo === void 0 ? void 0 : authenticateInfo.userId }));
    //Find blog by id for take some fields and populate author
    const result = yield blog_model_1.Blog.findById(createdBlog._id)
        .select('title content author')
        .populate({
        path: 'author',
        select: 'name email role isBlocked',
    });
    return result;
});
const updateBlogIntoDB = (authenticateInfo, id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isBlogExsit = yield blog_model_1.Blog.isBlogExistById(id);
    //check if blog exist or not
    if (!isBlogExsit) {
        throw new AppError_1.default(404, 'Blog not found!');
    }
    const isUserExist = yield user_model_1.User.checkUserExistById(authenticateInfo === null || authenticateInfo === void 0 ? void 0 : authenticateInfo.userId);
    //check if user is exist or not
    if (!isUserExist) {
        throw new AppError_1.default(404, 'User not found!');
    }
    //check if user blocked
    if (isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.isBlocked) {
        throw new AppError_1.default(403, 'User is blocked!');
    }
    //check if token is valid or not
    if ((isBlogExsit === null || isBlogExsit === void 0 ? void 0 : isBlogExsit.author.toString()) !== (authenticateInfo === null || authenticateInfo === void 0 ? void 0 : authenticateInfo.userId)) {
        throw new AppError_1.default(401, 'Invalid credentials');
    }
    //delete the blog
    const result = yield blog_model_1.Blog.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    })
        .select('title content author')
        .populate({
        path: 'author',
        select: 'name email role isBlocked',
    });
    return result;
});
const deleteBlogIntoDB = (authenticateInfo, id) => __awaiter(void 0, void 0, void 0, function* () {
    const isBlogExsit = yield blog_model_1.Blog.isBlogExistById(id);
    //check if blog exist or not
    if (!isBlogExsit) {
        throw new AppError_1.default(404, 'Blog not found!');
    }
    const isUserExist = yield user_model_1.User.checkUserExistById(authenticateInfo === null || authenticateInfo === void 0 ? void 0 : authenticateInfo.userId);
    //check if user is exist or not
    if (!isUserExist) {
        throw new AppError_1.default(404, 'User not found!');
    }
    //check if user blocked
    if (isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.isBlocked) {
        throw new AppError_1.default(403, 'User is blocked!');
    }
    //check if token is valid or not
    if ((isBlogExsit === null || isBlogExsit === void 0 ? void 0 : isBlogExsit.author.toString()) !== (authenticateInfo === null || authenticateInfo === void 0 ? void 0 : authenticateInfo.userId)) {
        throw new AppError_1.default(401, 'Invalid credentials');
    }
    //delete the blog
    const result = yield blog_model_1.Blog.findByIdAndDelete(id);
    return result;
});
const getAllBlogFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const blogQuery = new QueryBuilder_1.default(blog_model_1.Blog.find({}).select('title content author').populate({
        path: 'author',
        select: 'name email role isBlocked',
    }), query)
        .search(blog_constant_1.searchableFields)
        .filter()
        .sort();
    const result = yield blogQuery.queryModel;
    return result;
});
exports.BlogServies = {
    createBlogIntoDB,
    deleteBlogIntoDB,
    updateBlogIntoDB,
    getAllBlogFromDB,
};

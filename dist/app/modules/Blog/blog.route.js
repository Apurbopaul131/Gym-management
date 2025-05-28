"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewires/auth"));
const validateRequest_1 = __importDefault(require("../../middlewires/validateRequest"));
const user_constant_1 = require("../User/user.constant");
const blog_controller_1 = require("./blog.controller");
const blog_validation_1 = require("./blog.validation");
const router = express_1.default.Router();
//create blog route
router.post('/blogs', (0, auth_1.default)(user_constant_1.USER_ROLE.user), (0, validateRequest_1.default)(blog_validation_1.BlogValidations.createBlogValidationSchema), blog_controller_1.BlogControllers.createBlog);
//update blog route
router.patch('/blogs/:id', (0, auth_1.default)(user_constant_1.USER_ROLE.user), (0, validateRequest_1.default)(blog_validation_1.BlogValidations.updateBlogValidationSchema), blog_controller_1.BlogControllers.updateBlog);
//dlelete blog route
router.delete('/blogs/:id', (0, auth_1.default)(user_constant_1.USER_ROLE.user), blog_controller_1.BlogControllers.deleteBlog);
//Show all blogs route
router.get('/blogs', blog_controller_1.BlogControllers.getAllBlog);
exports.BlogRoutes = router;

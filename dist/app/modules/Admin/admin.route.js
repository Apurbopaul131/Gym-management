"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewires/auth"));
const user_constant_1 = require("../User/user.constant");
const admin_controller_1 = require("./admin.controller");
const router = express_1.default.Router();
//user blocked by update route
router.patch('/admin/users/:userId/block', (0, auth_1.default)(user_constant_1.USER_ROLE.admin), admin_controller_1.AdminControllers.blockedUserByAdmin);
//user delete by delete route
router.delete('/admin/blogs/:id', (0, auth_1.default)(user_constant_1.USER_ROLE.admin), admin_controller_1.AdminControllers.deletedBlogByAdmin);
exports.AdminRoutes = router;

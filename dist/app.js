"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const globalError_1 = __importDefault(require("./app/middlewires/globalError"));
const notFound_1 = __importDefault(require("./app/middlewires/notFound"));
const admin_route_1 = require("./app/modules/Admin/admin.route");
const auth_route_1 = require("./app/modules/Auth/auth.route");
const blog_route_1 = require("./app/modules/Blog/blog.route");
const app = (0, express_1.default)();
//parsers
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use((0, cookie_parser_1.default)());
//Auth Route
app.use('/api', auth_route_1.AuthRoutes);
//Blog Route
app.use('/api', blog_route_1.BlogRoutes);
//Admin Route
app.use('/api', admin_route_1.AdminRoutes);
//checking route
app.get('/', (req, res) => {
    res.send('Connected successfully.');
});
//global error handler
app.use(globalError_1.default);
//Not Found
app.use(notFound_1.default);
exports.default = app;

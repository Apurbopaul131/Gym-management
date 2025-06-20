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
exports.User = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const mongoose_1 = require("mongoose");
const config_1 = __importDefault(require("../../config"));
const AppError_1 = __importDefault(require("../../error/AppError"));
const user_constant_1 = require("./user.constant");
const userSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, 'Name is required.'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Password is required.'],
    },
    role: {
        type: String,
        enum: {
            values: user_constant_1.role,
            message: '{VALUE} is not supported must be Admin | Trainer | Trainee',
        },
    },
    isBlocked: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});
//This pre-middlewire hook used for convert user password before entry database
userSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        this.password = yield bcrypt_1.default.hash(this.password, Number(config_1.default.bcrypt_salt_rounds));
        next();
    });
});
//This pre-middewire hook is used for prevent to entry duplicate email
userSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const isUserAlreadyExistByEmailId = yield exports.User.findOne({ email: this.email });
        if (isUserAlreadyExistByEmailId) {
            throw new AppError_1.default(409, `${this.email} is Already exist.`);
        }
        next();
    });
});
//execute post document middlewire to prevent send password to client
userSchema.post('save', function (doc, next) {
    doc.password = '';
    next();
});
//Create a statics function that find user by default id
userSchema.statics.checkUserExistById = function (id) {
    return __awaiter(this, void 0, void 0, function* () {
        const isUserExist = yield this.findById(id);
        return isUserExist;
    });
};
//Create a statics function that check the equality of passwords
userSchema.statics.checkLoginPasswordMatch = function (plainTextPassword, hashPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        const match = yield bcrypt_1.default.compare(plainTextPassword, hashPassword);
        return match;
    });
};
exports.User = (0, mongoose_1.model)('User', userSchema);

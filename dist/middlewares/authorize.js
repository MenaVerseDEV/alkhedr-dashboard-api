"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const appError_1 = __importDefault(require("../utils/appError"));
exports.default = (...roles) => {
    return (req, res, next) => {
        const role = req.user.role;
        if (!roles.includes(role)) {
            return next(new appError_1.default('Unauthorized', 401));
        }
        next();
    };
};

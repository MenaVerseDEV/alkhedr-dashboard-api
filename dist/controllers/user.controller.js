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
exports.deleteUser = exports.getAllEmployees = exports.login = exports.register = void 0;
const asyncWrapper_1 = __importDefault(require("../middlewares/asyncWrapper"));
const user_service_1 = require("../services/user.service");
exports.register = (0, asyncWrapper_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield (0, user_service_1.Register)(req.body);
    res.status(201).json({
        success: true,
        message: "User created successfully",
        data: { user }
    });
}));
exports.login = (0, asyncWrapper_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const { user, token } = yield (0, user_service_1.Login)(email, password);
    res.status(200).json({
        success: true,
        message: "User logged in successfully",
        data: { user, token }
    });
}));
exports.getAllEmployees = (0, asyncWrapper_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const employees = yield (0, user_service_1.GetAllEmployees)();
    res.status(200).json({
        success: true,
        data: employees
    });
}));
exports.deleteUser = (0, asyncWrapper_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield (0, user_service_1.DeleteEmployee)(req.params.id);
    res.status(200).json({
        success: true,
        message: "User deleted successfully",
        data: user
    });
}));

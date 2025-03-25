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
exports.DeleteEmployee = exports.GetAllEmployees = exports.Login = exports.Register = void 0;
const request_interface_1 = require("../interfaces/request.interface");
const request_model_1 = __importDefault(require("../models/request.model"));
const User_model_1 = __importDefault(require("../models/User.model"));
const appError_1 = __importDefault(require("../utils/appError"));
const generateToken_1 = __importDefault(require("../utils/generateToken"));
const Register = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_model_1.default.create(Object.assign({}, data));
    if (!user) {
        throw new appError_1.default("User not created", 400);
    }
    return {
        _id: user._id,
        __v: user.__v,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
    };
});
exports.Register = Register;
const Login = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_model_1.default.findOne({ email }).select("+password");
    if (!user) {
        throw new appError_1.default("User not found", 404);
    }
    const isMatch = yield user.matchPassword(password);
    if (!isMatch) {
        throw new appError_1.default("Invalid credentials", 400);
    }
    const token = yield (0, generateToken_1.default)({ id: user._id, role: user.role, name: user.firstName });
    return {
        user: {
            _id: user._id,
            __v: user.__v,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phone: user.phone,
            role: user.role,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        }, token
    };
});
exports.Login = Login;
const GetAllEmployees = () => __awaiter(void 0, void 0, void 0, function* () {
    let employees = yield User_model_1.default.find({ role: { $in: ['employee', 'marketer'] } });
    const requests = yield request_model_1.default.find().populate("user");
    if (!employees) {
        throw new appError_1.default("No employees found", 404);
    }
    let result = employees.map((employee) => {
        let userReq = requests.filter((request) => request.user && request.user._id == employee.id);
        employee.requestsNumber = userReq.length || 0;
        let finished = userReq.filter((req) => req.requestStatus == request_interface_1.RequestStatus.FINISHED);
        let unWatched = userReq.filter((req) => req.requestStatus == request_interface_1.RequestStatus.UN_WATCHED);
        let watched = userReq.filter((req) => req.requestStatus == request_interface_1.RequestStatus.WATCHED_UN_FINISHED);
        return {
            employee,
            requestsNumber: userReq.length || 0,
            finished: finished.length || 0,
            unWatched: unWatched.length || 0,
            watched: watched.length || 0
        };
    });
    return result;
});
exports.GetAllEmployees = GetAllEmployees;
const DeleteEmployee = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_model_1.default.findByIdAndDelete(id);
    if (!user) {
        throw new appError_1.default("User not found", 404);
    }
    return user;
});
exports.DeleteEmployee = DeleteEmployee;

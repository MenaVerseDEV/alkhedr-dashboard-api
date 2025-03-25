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
exports.AddEmployeeNote = exports.GetRequest = exports.GetAllEmployeeRequests = exports.GetAllRequests = exports.UpdateRequest = exports.CreateRequest = void 0;
const mongoose_1 = require("mongoose");
const request_model_1 = __importDefault(require("../models/request.model"));
const request_interface_1 = require("../interfaces/request.interface");
const appError_1 = __importDefault(require("../utils/appError"));
const CreateRequest = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const request = yield request_model_1.default.create(Object.assign({}, data));
    if (!request) {
        throw new appError_1.default("Request not created", 400);
    }
    return request;
});
exports.CreateRequest = CreateRequest;
const UpdateRequest = (id, data, user) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const request = yield request_model_1.default.findByIdAndUpdate(id, data, { new: true, runValidators: true }).populate("user").populate("seenHistory.seenBy actionHistory.actionBy employeeNotes.noteBy");
    if (!request) {
        throw new appError_1.default("Request not found", 404);
    }
    if (data.responseStatus && data.responseStatus != request_interface_1.ResponseStatus.NOT_STARTED) {
        request.requestStatus = request_interface_1.RequestStatus.FINISHED;
        (_a = request.actionHistory) === null || _a === void 0 ? void 0 : _a.push({ actionDate: new Date(), actionBy: user.id, action: data.responseStatus });
    }
    yield request.save();
    return yield request.populate("seenHistory.seenBy actionHistory.actionBy employeeNotes.noteBy");
});
exports.UpdateRequest = UpdateRequest;
const GetAllRequests = (user) => __awaiter(void 0, void 0, void 0, function* () {
    let requests = yield request_model_1.default.find().populate("user").populate("seenHistory.seenBy actionHistory.actionBy employeeNotes.noteBy");
    if (!requests) {
        throw new appError_1.default("No requests found", 404);
    }
    return requests;
});
exports.GetAllRequests = GetAllRequests;
const GetAllEmployeeRequests = (employeeId) => __awaiter(void 0, void 0, void 0, function* () {
    const requests = yield request_model_1.default.find({ user: employeeId }).populate("user");
    if (!requests) {
        throw new appError_1.default("No requests found", 404);
    }
    return requests;
});
exports.GetAllEmployeeRequests = GetAllEmployeeRequests;
const GetRequest = (id, user) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const request = yield request_model_1.default.findById(id).populate("user").populate("seenHistory.seenBy actionHistory.actionBy employeeNotes.noteBy");
    let oldRequests = yield request_model_1.default.find({ phone: request === null || request === void 0 ? void 0 : request.phone }).populate("user").populate("seenHistory.seenBy actionHistory.actionBy employeeNotes.noteBy");
    const uniqueRequests = new Set([...oldRequests, request]);
    if (!request) {
        throw new appError_1.default("Request not found", 404);
    }
    if (user.role == 'employee' && !(request === null || request === void 0 ? void 0 : request.user)) {
        request.user = user.id;
        request.requestStatus = request_interface_1.RequestStatus.WATCHED_UN_FINISHED;
    }
    let existUser = (_a = request.seenHistory) === null || _a === void 0 ? void 0 : _a.find((seen) => seen.seenBy._id == user.id);
    if (!existUser) {
        (_b = request.seenHistory) === null || _b === void 0 ? void 0 : _b.push({ seenDate: new Date(), seenBy: new mongoose_1.Types.ObjectId(user.id) });
    }
    (yield request.save()).populate("seenHistory.seenBy actionHistory.actionBy employeeNotes.noteBy");
    return {
        oldRequests: Array.from(uniqueRequests),
        request
    };
});
exports.GetRequest = GetRequest;
const AddEmployeeNote = (id, note, user) => __awaiter(void 0, void 0, void 0, function* () {
    const request = yield request_model_1.default.findById(id);
    if (!request) {
        throw new appError_1.default("Request not found", 404);
    }
    request.employeeNotes.push({ note, noteBy: user.id, noteDate: new Date() });
    yield request.save();
    return request;
});
exports.AddEmployeeNote = AddEmployeeNote;

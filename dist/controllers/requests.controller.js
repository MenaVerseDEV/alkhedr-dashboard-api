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
exports.addEmployeeNote = exports.updateRequest = exports.getRequest = exports.getAllEmployeeRequests = exports.getAllRequests = exports.createRequest = void 0;
const asyncWrapper_1 = __importDefault(require("../middlewares/asyncWrapper"));
const requests_service_1 = require("./../services/requests.service");
exports.createRequest = (0, asyncWrapper_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const request = yield (0, requests_service_1.CreateRequest)(req.body);
    res.status(201).json({
        success: true,
        data: request
    });
}));
exports.getAllRequests = (0, asyncWrapper_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const requests = yield (0, requests_service_1.GetAllRequests)(req.user);
    res.status(200).json({
        success: true,
        data: requests
    });
}));
exports.getAllEmployeeRequests = (0, asyncWrapper_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const requests = yield (0, requests_service_1.GetAllEmployeeRequests)(((_a = req.user) === null || _a === void 0 ? void 0 : _a.id) || '');
    res.status(200).json({
        success: true,
        data: requests
    });
}));
exports.getRequest = (0, asyncWrapper_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const request = yield (0, requests_service_1.GetRequest)(req.params.reqId, req.user || '');
    res.status(200).json({
        success: true,
        data: request
    });
}));
exports.updateRequest = (0, asyncWrapper_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const request = yield (0, requests_service_1.UpdateRequest)(req.params.reqId, req.body, req.user || '');
    res.status(200).json({
        success: true,
        data: request
    });
}));
exports.addEmployeeNote = (0, asyncWrapper_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const request = yield (0, requests_service_1.AddEmployeeNote)(req.params.reqId, req.body.note, req.user || '');
    res.status(200).json({
        success: true,
        data: request
    });
}));

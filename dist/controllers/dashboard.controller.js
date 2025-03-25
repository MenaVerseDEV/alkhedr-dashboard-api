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
exports.createBank = exports.createCar = exports.getAllBanks = exports.getAllCars = exports.updateImage = exports.deleteImage = exports.getImage = exports.getAllImages = exports.addImage = void 0;
const dashboard_service_1 = require("../services/dashboard.service");
const asyncWrapper_1 = __importDefault(require("../middlewares/asyncWrapper"));
exports.addImage = (0, asyncWrapper_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const image = yield (0, dashboard_service_1.AddImage)(req.body, req.files);
    res.status(201).json({
        success: true,
        data: image
    });
}));
exports.getAllImages = (0, asyncWrapper_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const images = yield (0, dashboard_service_1.GetAllImages)();
    res.status(200).json({
        success: true,
        data: images
    });
}));
exports.getImage = (0, asyncWrapper_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const image = yield (0, dashboard_service_1.GetImage)(req.params.id);
    res.status(200).json({
        success: true,
        data: image
    });
}));
exports.deleteImage = (0, asyncWrapper_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const image = yield (0, dashboard_service_1.DeleteImage)(req.params.id);
    res.status(200).json({
        success: true,
        data: image
    });
}));
exports.updateImage = (0, asyncWrapper_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const image = yield (0, dashboard_service_1.UpdateImage)(req.params.id, req.body, req.files);
    res.status(200).json({
        success: true,
        data: image
    });
}));
exports.getAllCars = (0, asyncWrapper_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const cars = yield (0, dashboard_service_1.GetAllCars)();
    res.status(200).json({
        success: true,
        data: cars
    });
}));
exports.getAllBanks = (0, asyncWrapper_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const banks = yield (0, dashboard_service_1.GetAllBanks)();
    res.status(200).json({
        success: true,
        data: banks
    });
}));
exports.createCar = (0, asyncWrapper_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const car = yield (0, dashboard_service_1.CreateCar)(req.body);
    res.status(201).json({
        success: true,
        data: car
    });
}));
exports.createBank = (0, asyncWrapper_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const bank = yield (0, dashboard_service_1.CreateBank)(req.body);
    res.status(201).json({
        success: true,
        data: bank
    });
}));

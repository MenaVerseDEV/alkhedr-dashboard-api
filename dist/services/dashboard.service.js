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
exports.CreateBank = exports.CreateCar = exports.GetAllBanks = exports.GetAllCars = exports.UpdateImage = exports.DeleteImage = exports.GetImage = exports.GetAllImages = exports.AddImage = void 0;
const upload_1 = require("../utils/upload");
const gallery_model_1 = __importDefault(require("../models/gallery.model"));
const car_model_1 = __importDefault(require("../models/car.model"));
const bank_model_1 = __importDefault(require("../models/bank.model"));
const appError_1 = __importDefault(require("../utils/appError"));
const AddImage = (data, file) => __awaiter(void 0, void 0, void 0, function* () {
    const imageUrl = yield (0, upload_1.handleFileUpload)(file);
    console.log(imageUrl[0].value);
    const gallery = yield gallery_model_1.default.create(Object.assign(Object.assign({}, data), { imageUrl: imageUrl[0].value }));
    if (!gallery) {
        throw new appError_1.default("Gallery not created", 400);
    }
    return gallery;
});
exports.AddImage = AddImage;
const GetAllImages = () => __awaiter(void 0, void 0, void 0, function* () {
    const gallery = yield gallery_model_1.default.find();
    if (!gallery) {
        throw new appError_1.default("No gallery found", 404);
    }
    return gallery;
});
exports.GetAllImages = GetAllImages;
const GetImage = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const gallery = yield gallery_model_1.default.findById(id);
    if (!gallery) {
        throw new appError_1.default("Gallery not found", 404);
    }
    return gallery;
});
exports.GetImage = GetImage;
const DeleteImage = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const gallery = yield gallery_model_1.default.findByIdAndDelete(id);
    if (!gallery) {
        throw new appError_1.default("Gallery not found", 404);
    }
    return gallery;
});
exports.DeleteImage = DeleteImage;
const UpdateImage = (id, data, files) => __awaiter(void 0, void 0, void 0, function* () {
    const imageUrl = yield (0, upload_1.handleFileUpload)(files);
    data.imageUrl = imageUrl[0].value;
    const gallery = yield gallery_model_1.default.findByIdAndUpdate(id, data, { new: true, runValidators: true });
    if (!gallery) {
        throw new appError_1.default("Gallery not found", 404);
    }
    return gallery;
});
exports.UpdateImage = UpdateImage;
const GetAllCars = () => __awaiter(void 0, void 0, void 0, function* () {
    const cars = yield car_model_1.default.find();
    if (!cars) {
        throw new appError_1.default("No cars found", 404);
    }
    return cars;
});
exports.GetAllCars = GetAllCars;
const GetAllBanks = () => __awaiter(void 0, void 0, void 0, function* () {
    const banks = yield bank_model_1.default.find();
    if (!banks) {
        throw new appError_1.default("No banks found", 404);
    }
    return banks;
});
exports.GetAllBanks = GetAllBanks;
const CreateCar = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const cars = yield car_model_1.default.find();
    if (cars.find(car => car.name === data.name)) {
        throw new appError_1.default("Car already exists", 400);
    }
    const car = yield car_model_1.default.create(data);
    if (!car) {
        throw new appError_1.default("Car not created", 400);
    }
    return car;
});
exports.CreateCar = CreateCar;
const CreateBank = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const banks = yield bank_model_1.default.find();
    if (banks.find(bank => bank.name === data.name)) {
        throw new appError_1.default("Bank already exists", 400);
    }
    const bank = yield bank_model_1.default.create(data);
    if (!bank) {
        throw new appError_1.default("Bank not created", 400);
    }
    return bank;
});
exports.CreateBank = CreateBank;

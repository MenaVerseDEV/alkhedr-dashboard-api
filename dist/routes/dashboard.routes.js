"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const multerPasre = (0, multer_1.default)({
    storage: multer_1.default.memoryStorage()
});
const express_1 = require("express");
const router = (0, express_1.Router)();
const dashboard_controller_1 = require("../controllers/dashboard.controller");
const authorize_1 = __importDefault(require("../middlewares/authorize"));
const verifyToken_1 = __importDefault(require("../middlewares/verifyToken"));
router.post("/image", multerPasre.fields([{ name: 'image' }]), verifyToken_1.default, (0, authorize_1.default)('admin', 'super-admin', 'markter'), dashboard_controller_1.addImage);
router.put("/image/:id", multerPasre.fields([{ name: 'image' }]), verifyToken_1.default, (0, authorize_1.default)('admin', 'super-admin', 'markter'), dashboard_controller_1.updateImage);
router.get("/images", dashboard_controller_1.getAllImages);
router.get("/image/:id", dashboard_controller_1.getImage);
router.delete("/image/:id", verifyToken_1.default, (0, authorize_1.default)('admin', 'super-admin', 'markter'), dashboard_controller_1.deleteImage);
router.get("/cars", dashboard_controller_1.getAllCars);
router.get("/banks", dashboard_controller_1.getAllBanks);
router.post("/car", verifyToken_1.default, (0, authorize_1.default)('employee', 'admin', 'super-admin'), dashboard_controller_1.createCar);
router.post("/bank", verifyToken_1.default, (0, authorize_1.default)('employee', 'admin', 'super-admin'), dashboard_controller_1.createCar);
exports.default = router;

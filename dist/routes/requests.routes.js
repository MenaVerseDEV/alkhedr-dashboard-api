"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const requests_controller_1 = require("../controllers/requests.controller");
const verifyToken_1 = __importDefault(require("../middlewares/verifyToken"));
const authorize_1 = __importDefault(require("../middlewares/authorize"));
const router = (0, express_1.Router)();
router.post("/", requests_controller_1.createRequest);
router.get("/", verifyToken_1.default, (0, authorize_1.default)('admin', 'super-admin', 'employee'), requests_controller_1.getAllRequests);
router.get("/employee", verifyToken_1.default, (0, authorize_1.default)('admin', 'super-admin'), requests_controller_1.getAllEmployeeRequests);
router.get("/:reqId", verifyToken_1.default, (0, authorize_1.default)('admin', 'employee', 'super-admin'), requests_controller_1.getRequest);
router.put("/:reqId", verifyToken_1.default, (0, authorize_1.default)('employee', 'admin', 'super-admin'), requests_controller_1.updateRequest);
router.patch("/:reqId", verifyToken_1.default, (0, authorize_1.default)('employee', 'admin', 'super-admin'), requests_controller_1.addEmployeeNote);
exports.default = router;

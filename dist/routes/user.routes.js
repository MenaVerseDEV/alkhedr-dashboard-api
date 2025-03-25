"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const authorize_1 = __importDefault(require("../middlewares/authorize"));
const verifyToken_1 = __importDefault(require("../middlewares/verifyToken"));
const router = (0, express_1.Router)();
router.post('/register', verifyToken_1.default, /* authorize('super-admin'), */ user_controller_1.register);
router.get('/employees', verifyToken_1.default, (0, authorize_1.default)('super-admin', 'admin'), user_controller_1.getAllEmployees);
router.post('/login', user_controller_1.login);
router.delete('/:id', verifyToken_1.default, (0, authorize_1.default)('super-admin'), user_controller_1.deleteUser);
exports.default = router;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateToken = (payload) => {
    var _a;
    console.log(payload);
    return jsonwebtoken_1.default.sign(payload, ((_a = process === null || process === void 0 ? void 0 : process.env) === null || _a === void 0 ? void 0 : _a.JWT_SECRET) || 'Gamgom', {
        expiresIn: process.env.JWT_EXPIRE,
    });
};
exports.default = generateToken;

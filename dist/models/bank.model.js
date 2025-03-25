"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bankSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
}, { timestamps: true });
const Bank = (0, mongoose_1.model)('Bank', bankSchema);
exports.default = Bank;

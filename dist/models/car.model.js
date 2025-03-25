"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const carSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
}, { timestamps: true });
const Car = (0, mongoose_1.model)('Car', carSchema);
exports.default = Car;

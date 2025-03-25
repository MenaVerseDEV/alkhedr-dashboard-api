"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gallerySchema = void 0;
const mongoose_1 = require("mongoose");
exports.gallerySchema = new mongoose_1.Schema({
    title: { type: String, },
    description: { type: String, },
    imageUrl: { type: String, required: true },
}, { timestamps: true });
const Gallery = (0, mongoose_1.model)('Gallery', exports.gallerySchema);
exports.default = Gallery;

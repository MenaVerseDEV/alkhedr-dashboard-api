"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = errorHandler;
const mongoose_1 = __importDefault(require("mongoose"));
function errorHandler(err, req, res, next) {
    // Handle Mongoose validation errors
    if (err instanceof mongoose_1.default.Error.ValidationError) {
        res.status(400).json({
            status: false,
            message: err.message || "Validation Error",
            errors: Object.values(err.errors).map((error) => error.message),
        });
        return;
    }
    // Handle Mongoose CastErrors (e.g., invalid ObjectId)
    if (err instanceof mongoose_1.default.Error.CastError) {
        res.status(400).json({
            status: false,
            message: "Invalid ID Format",
        });
        return;
    }
    // Handle MongoDB duplicate key errors
    if (isMongoDBDuplicateKeyError(err)) {
        res.status(409).json({
            status: false,
            message: "Duplicate Key Error",
            details: err.keyValue,
        });
        return;
    }
    // Handle operational errors
    if (isOperationalError(err)) {
        res.status(err.statusCode || 400).json({
            status: false,
            message: err.message,
        });
        return;
    }
    // Handle all other errors
    console.error("Unhandled error:", err);
    res.status(500).json({
        status: false,
        message: "Internal Server Error",
    });
}
// Type guard for operational errors
function isOperationalError(error) {
    return (typeof error === "object" &&
        error !== null &&
        "isOperational" in error &&
        error.isOperational === true);
}
// Type guard for MongoDB duplicate key errors
function isMongoDBDuplicateKeyError(error) {
    return (typeof error === "object" &&
        error !== null &&
        "code" in error &&
        error.code === 11000 &&
        "keyValue" in error);
}

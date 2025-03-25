import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";

// Define a custom error interface for operational errors
interface OperationalError extends Error {
  isOperational: boolean;
  statusCode?: number;
}

// Define a custom error interface for MongoDB duplicate key errors
interface MongoDBDuplicateKeyError extends Error {
  code: number;
  keyValue: Record<string, any>;
}

export default function errorHandler(
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  // Handle Mongoose validation errors
  if (err instanceof mongoose.Error.ValidationError) {
    res.status(400).json({
      status: false,
      message: err.message || "Validation Error",
      errors: Object.values(err.errors).map((error) => error.message),
    });
    return;
  }

  // Handle Mongoose CastErrors (e.g., invalid ObjectId)
  if (err instanceof mongoose.Error.CastError) {
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
function isOperationalError(error: unknown): error is OperationalError {
  return (
    typeof error === "object" &&
    error !== null &&
    "isOperational" in error &&
    (error as OperationalError).isOperational === true
  );
}

// Type guard for MongoDB duplicate key errors
function isMongoDBDuplicateKeyError(error: unknown): error is MongoDBDuplicateKeyError {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    (error as MongoDBDuplicateKeyError).code === 11000 &&
    "keyValue" in error
  );
}


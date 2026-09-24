import { errorResponse } from "../utils/apiResponse.js";

export const notFoundHandler = (req, res) => {
  return errorResponse(res, `API route not found: ${req.method} ${req.originalUrl}`, 404);
};

export const errorHandler = (err, req, res, next) => {
  console.error(`[Error] ${err.name || "AppError"}: ${err.message}`);

  // Mongoose Bad ObjectId (CastError)
  if (err.name === "CastError") {
    return errorResponse(res, `Invalid ID format for resource: ${err.value}`, 400);
  }

  // Mongoose Validation Error
  if (err.name === "ValidationError") {
    const messages = Object.values(err.errors).map((e) => ({
      field: e.path,
      message: e.message
    }));
    return errorResponse(res, "Validation error occurred.", 422, messages);
  }

  // Mongoose Duplicate Key Error (Code 11000)
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue || {})[0] || "field";
    return errorResponse(
      res,
      `A record with this ${field} already exists.`,
      409,
      [{ field, message: `${field} must be unique.` }]
    );
  }

  // Multer File Upload Errors
  if (err.name === "MulterError") {
    if (err.code === "LIMIT_FILE_SIZE") {
      return errorResponse(res, "File size exceeds the 5 MB limit.", 400);
    }
    return errorResponse(res, `File upload error: ${err.message}`, 400);
  }

  // File type validation error from multer fileFilter
  if (err.message && err.message.includes("Invalid file type")) {
    return errorResponse(res, err.message, 400);
  }

  // JWT Errors
  if (err.name === "JsonWebTokenError") {
    return errorResponse(res, "Invalid token signature.", 401);
  }
  if (err.name === "TokenExpiredError") {
    return errorResponse(res, "Token has expired.", 401);
  }

  // Default Internal Server Error
  const statusCode = err.statusCode || 500;
  const isProduction = process.env.NODE_ENV === "production";
  const message = isProduction && statusCode === 500 ? "Internal server error occurred." : err.message;

  return errorResponse(res, message, statusCode);
};

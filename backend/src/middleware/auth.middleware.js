import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { errorResponse } from "../utils/apiResponse.js";

export const protect = async (req, res, next) => {
  try {
    let token = null;

    // Check Authorization header (Bearer token)
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
      token = req.headers.authorization.split(" ")[1];
    }
    // Fallback to cookie
    else if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    }

    if (!token) {
      return errorResponse(res, "Access denied. No authentication token provided.", 401);
    }

    const secret = process.env.JWT_SECRET || "talenthunt_jwt_secret_fallback_key";
    const decoded = jwt.verify(token, secret);

    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return errorResponse(res, "User associated with this token no longer exists.", 401);
    }

    if (!user.isActive) {
      return errorResponse(res, "User account is deactivated.", 403);
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return errorResponse(res, "Session has expired. Please log in again.", 401);
    }
    return errorResponse(res, "Invalid or corrupted authentication token.", 401);
  }
};

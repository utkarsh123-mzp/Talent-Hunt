import express from "express";
import { body } from "express-validator";
import { register, login, getMe, logout } from "../controllers/auth.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { authLimiter } from "../middleware/rateLimit.middleware.js";
import { validateRequest } from "../utils/validation.js";

const router = express.Router();

const registerValidation = [
  body("email").isEmail().withMessage("Valid email is required").normalizeEmail(),
  body("password").isLength({ min: 8 }).withMessage("Password must be at least 8 characters long"),
  body("role").isIn(["student", "school", "recruiter", "organization", "teacher", "admin"]).withMessage("Invalid role selected"),
  validateRequest
];

const loginValidation = [
  body("email").isEmail().withMessage("Valid email is required").normalizeEmail(),
  body("password").notEmpty().withMessage("Password is required"),
  validateRequest
];

router.post("/register", authLimiter, registerValidation, register);
router.post("/login", authLimiter, loginValidation, login);
router.get("/me", protect, getMe);
router.post("/logout", logout);

export default router;

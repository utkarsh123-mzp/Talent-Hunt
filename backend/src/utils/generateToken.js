import jwt from "jsonwebtoken";

export const generateToken = (userId, role) => {
  const secret = process.env.JWT_SECRET || "talenthunt_jwt_secret_fallback_key";
  const expiresIn = process.env.JWT_EXPIRES_IN || "7d";

  return jwt.sign(
    { userId, role },
    secret,
    { expiresIn }
  );
};

export const setAuthCookie = (res, token) => {
  const isProduction = process.env.NODE_ENV === "production";
  const maxAge = 7 * 24 * 60 * 60 * 1000; // 7 days

  res.cookie("token", token, {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "strict" : "lax",
    maxAge
  });
};

export const clearAuthCookie = (res) => {
  const isProduction = process.env.NODE_ENV === "production";
  res.clearCookie("token", {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "strict" : "lax"
  });
};

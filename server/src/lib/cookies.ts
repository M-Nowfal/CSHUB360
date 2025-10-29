import { SERVER_CONFIG } from "../utils/constants";

export const cookieOptions = {
  httpOnly: true,
  secure: SERVER_CONFIG.NODE_ENV === "production", // HTTPS in production
  sameSite: "strict" as const, // CSRF protection
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  path: "/",
};

export const refreshTokenCookieOptions = {
  ...cookieOptions,
  maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
};

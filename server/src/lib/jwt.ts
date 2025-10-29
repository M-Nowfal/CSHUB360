import jwt from "jsonwebtoken";
import { UserRole } from "../types/user.types";
import { JWT_CONFIG } from "../utils/constants";

const { ACCESS_TOKEN, REFRESH_TOKEN } = JWT_CONFIG;

export interface TokenPayload {
  userId: string;
  email: string;
  role: UserRole;
}

export const generateTokens = (payload: TokenPayload) => {
  const accessToken = jwt.sign(payload, ACCESS_TOKEN.SECRET, {
    expiresIn: ACCESS_TOKEN.EXPIRES_IN,
  });

  const refreshToken = jwt.sign(
    { userId: payload.userId }, 
    REFRESH_TOKEN.SECRET, 
    { expiresIn: REFRESH_TOKEN.EXPIRES_IN }
  );

  return { accessToken, refreshToken };
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, ACCESS_TOKEN.SECRET) as TokenPayload;
};

export const verifyRefreshToken = (token: string) => {
  return jwt.verify(token, REFRESH_TOKEN.SECRET) as { userId: string };
};

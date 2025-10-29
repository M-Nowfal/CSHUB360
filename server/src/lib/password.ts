import bcrypt from "bcryptjs";
import { BCRYPT_CONFIG } from "../utils/constants";

const hash = async (password: string): Promise<string> => {
  try {
    const saltRounds = await bcrypt.genSalt(BCRYPT_CONFIG.SALT_ROUNDS);
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error: unknown) {
    const err = error instanceof Error ? error.message : String(error);
    throw new Error(err);
  }
};

const compare = async (password: string, hashedPassword: string): Promise<boolean> => {
  try {
    return await bcrypt.compare(password, hashedPassword);
  } catch (error: unknown) {
    const err = error instanceof Error ? error.message : String(error);
    throw new Error(err);
  }
};

export { hash, compare };

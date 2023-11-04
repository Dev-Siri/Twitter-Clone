import bcryptjs from "bcryptjs";

export async function hashPassword(password: string) {
  const salt = await bcryptjs.genSalt(12);
  const hashedPassword = await bcryptjs.hash(password, salt);

  return hashedPassword;
}

export async function comparePassword(password: string, hash: string) {
  const isPasswordValid = await bcryptjs.compare(password, hash);

  return isPasswordValid;
}

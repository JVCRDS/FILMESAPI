import jwt from "jsonwebtoken";

const JWT_SECRET =
  process.env.JWT_SECRET || "sua_chave_secreta_jwt_super_segura_2024";
const JWT_EXPIRATION = process.env.JWT_EXPIRATION || "24h";

export const generateToken = (userId) => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: JWT_EXPIRATION });
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
};

export const decodeToken = (token) => {
  return jwt.decode(token);
};

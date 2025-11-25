import { verifyToken } from "../services/authService.js";

const authMiddleware = (req, res, next) => {
  const authHeader = req.get("Authorization");

  if (!authHeader) {
    return res.status(401).json({ mensagem: "Token não fornecido" });
  }

  const token = authHeader.startsWith("Bearer ")
    ? authHeader.slice(7)
    : authHeader;

  const decoded = verifyToken(token);

  if (!decoded) {
    return res.status(401).json({ mensagem: "Token inválido ou expirado" });
  }

  req.userId = decoded.userId;
  next();
};

export default authMiddleware;

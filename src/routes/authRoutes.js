import express from "express";
import { generateToken } from "../services/authService.js";

const router = express.Router();

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      mensagem: "Usuário e senha são obrigatórios",
    });
  }

  // TODO: Validar credenciais no banco de dados
  // Simples validação para demonstração
  if (username === "admin" && password === "admin123") {
    const token = generateToken(1);
    return res.json({
      mensagem: "Login realizado com sucesso",
      token,
      expiresIn: "24h",
    });
  }

  res.status(401).json({
    mensagem: "Credenciais inválidas",
  });
});

export default router;

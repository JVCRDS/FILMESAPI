import express from "express";
import { generateToken } from "../services/authService.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Autenticação
 *   description: Endpoint para obter o token de autenticação JWT.
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Realiza o login para obter um token JWT
 *     tags: [Autenticação]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 description: Nome de usuário para login.
 *                 example: "admin"
 *               password:
 *                 type: string
 *                 description: Senha para login.
 *                 example: "admin123"
 *     responses:
 *       200:
 *         description: Login bem-sucedido, retorna o token.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       401:
 *         description: Credenciais inválidas.
 */
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

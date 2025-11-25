import express from "express";
import generoController from "../controllers/generoController.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Gêneros
 *   description: API para gerenciamento de gêneros de filmes.
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Genero:
 *       type: object
 *       required:
 *         - nome
 *       properties:
 *         id:
 *           type: integer
 *           description: O ID gerado automaticamente do gênero.
 *         nome:
 *           type: string
 *           description: O nome do gênero.
 *       example:
 *         id: 1
 *         nome: "Ficção Científica"
 */

/**
 * @swagger
 * /generos:
 *   get:
 *     summary: Lista todos os gêneros
 *     tags: [Gêneros]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A lista de gêneros.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Genero'
 *       401:
 *         description: Não autorizado.
 */
router.get("/", generoController.listarGeneros);

/**
 * @swagger
 * /generos/{id}:
 *   get:
 *     summary: Busca um gênero pelo ID
 *     tags: [Gêneros]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: O ID do gênero.
 *     responses:
 *       200:
 *         description: Detalhes do gênero.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Genero'
 *       401:
 *         description: Não autorizado.
 *       404:
 *         description: Gênero não encontrado.
 */
router.get("/:id", generoController.buscarPorId);

/**
 * @swagger
 * /generos:
 *   post:
 *     summary: Cria um novo gênero
 *     tags: [Gêneros]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Genero'
 *     responses:
 *       201:
 *         description: Gênero criado com sucesso.
 *       401:
 *         description: Não autorizado.
 */
router.post("/", generoController.criarGenero);

/**
 * @swagger
 * /generos/{id}:
 *   put:
 *     summary: Atualiza um gênero existente
 *     tags: [Gêneros]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: O ID do gênero.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Genero'
 *     responses:
 *       200:
 *         description: Gênero atualizado com sucesso.
 *       401:
 *         description: Não autorizado.
 *       404:
 *         description: Gênero não encontrado.
 */
router.put("/:id", generoController.atualizarGenero);

/**
 * @swagger
 * /generos/{id}:
 *   delete:
 *     summary: Deleta um gênero
 *     tags: [Gêneros]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: O ID do gênero.
 *     responses:
 *       200:
 *         description: Gênero deletado com sucesso.
 *       401:
 *         description: Não autorizado.
 *       404:
 *         description: Gênero não encontrado.
 */
router.delete("/:id", generoController.deletarGenero);

export default router;

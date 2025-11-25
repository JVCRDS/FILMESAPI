import express from "express";
import directorController from "../controllers/directorController.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Diretores
 *   description: API para gerenciamento de diretores.
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Diretor:
 *       type: object
 *       required:
 *         - nome
 *       properties:
 *         id:
 *           type: integer
 *           description: O ID gerado automaticamente do diretor.
 *         nome:
 *           type: string
 *           description: O nome do diretor.
 *         nacionalidade:
 *           type: string
 *           description: A nacionalidade do diretor.
 *         dataNascimento:
 *           type: string
 *           format: date
 *           description: A data de nascimento do diretor.
 *       example:
 *         id: 1
 *         nome: "Christopher Nolan"
 *         nacionalidade: "Britânico"
 *         dataNascimento: "1970-07-30"
 */

/**
 * @swagger
 * /diretores:
 *   get:
 *     summary: Lista todos os diretores
 *     tags: [Diretores]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A lista de diretores.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Diretor'
 *       401:
 *         description: Não autorizado.
 */
router.get("/", directorController.listarDiretores);

/**
 * @swagger
 * /diretores/{id}:
 *   get:
 *     summary: Busca um diretor pelo ID
 *     tags: [Diretores]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: O ID do diretor.
 *     responses:
 *       200:
 *         description: Detalhes do diretor.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Diretor'
 *       401:
 *         description: Não autorizado.
 *       404:
 *         description: Diretor não encontrado.
 */
router.get("/:id", directorController.buscarPorId);

/**
 * @swagger
 * /diretores:
 *   post:
 *     summary: Cria um novo diretor
 *     tags: [Diretores]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Diretor'
 *     responses:
 *       201:
 *         description: Diretor criado com sucesso.
 *       401:
 *         description: Não autorizado.
 */
router.post("/", directorController.criarDiretor);

/**
 * @swagger
 * /diretores/{id}:
 *   put:
 *     summary: Atualiza um diretor existente
 *     tags: [Diretores]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: O ID do diretor.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Diretor'
 *     responses:
 *       200:
 *         description: Diretor atualizado com sucesso.
 *       401:
 *         description: Não autorizado.
 *       404:
 *         description: Diretor não encontrado.
 */
router.put("/:id", directorController.atualizarDiretor);

/**
 * @swagger
 * /diretores/{id}:
 *   delete:
 *     summary: Deleta um diretor
 *     tags: [Diretores]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: O ID do diretor.
 *     responses:
 *       200:
 *         description: Diretor deletado com sucesso.
 *       401:
 *         description: Não autorizado.
 *       404:
 *         description: Diretor não encontrado.
 */
router.delete("/:id", directorController.deletarDiretor);

export default router;

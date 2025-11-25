import express from "express";
import filmesController from "../controllers/filmesController.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Filmes
 *   description: API para gerenciamento de filmes.
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Filme:
 *       type: object
 *       required:
 *         - titulo
 *         - diretor
 *         - duracao
 *         - anoLancamento
 *         - genero
 *         - sinopse
 *       properties:
 *         id:
 *           type: integer
 *           description: O ID gerado automaticamente do filme.
 *         titulo:
 *           type: string
 *           description: O título do filme.
 *         diretor:
 *           type: string
 *           description: O nome do diretor.
 *         duracao:
 *           type: string
 *           description: "A duração do filme (ex: '120 min')."
 *         anoLancamento:
 *           type: integer
 *           description: O ano de lançamento do filme.
 *         genero:
 *           type: string
 *           description: O gênero do filme.
 *         sinopse:
 *           type: string
 *           description: Uma breve sinopse do filme.
 *       example:
 *         id: 1
 *         titulo: "A Origem"
 *         diretor: "Christopher Nolan"
 *         duracao: "148 min"
 *         anoLancamento: 2010
 *         genero: "Ficção Científica"
 *         sinopse: "Um ladrão que rouba segredos corporativos através do uso de tecnologia de compartilhamento de sonhos."
 */

/**
 * @swagger
 * /filmes:
 *   get:
 *     summary: Lista todos os filmes com paginação
 *     tags: [Filmes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: pagina
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Número da página para a listagem.
 *       - in: query
 *         name: limite
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Número de itens por página.
 *     responses:
 *       200:
 *         description: A lista de filmes.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 dados:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Filme'
 *       401:
 *         description: Não autorizado.
 */
router.get("/", filmesController.listarFilmes);

/**
 * @swagger
 * /filmes/{id}:
 *   get:
 *     summary: Busca um filme pelo ID
 *     tags: [Filmes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: O ID do filme.
 *     responses:
 *       200:
 *         description: Detalhes do filme.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Filme'
 *       401:
 *         description: Não autorizado.
 *       404:
 *         description: Filme não encontrado.
 */
router.get("/:id", filmesController.buscarPorId);

/**
 * @swagger
 * /filmes/titulo/{titulo}:
 *   get:
 *     summary: Busca um filme pelo título (busca parcial)
 *     tags: [Filmes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: titulo
 *         schema:
 *           type: string
 *         required: true
 *         description: Parte do título do filme a ser buscado.
 *     responses:
 *       200:
 *         description: Detalhes do filme encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Filme'
 *       401:
 *         description: Não autorizado.
 *       404:
 *         description: Filme não encontrado.
 */
router.get("/titulo/:titulo", filmesController.buscarPorTitulo);

/**
 * @swagger
 * /filmes/genero/{genero}:
 *   get:
 *     summary: Busca filmes por gênero (busca parcial)
 *     tags: [Filmes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: genero
 *         schema:
 *           type: string
 *         required: true
 *         description: Gênero a ser buscado.
 *     responses:
 *       200:
 *         description: Lista de filmes do gênero especificado.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Filme'
 *       401:
 *         description: Não autorizado.
 *       404:
 *         description: Nenhum filme encontrado para este gênero.
 */
router.get("/genero/:genero", filmesController.buscarPorGenero);

/**
 * @swagger
 * /filmes:
 *   post:
 *     summary: Cria um novo filme
 *     tags: [Filmes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Filme'
 *           example:
 *             titulo: "Pulp Fiction"
 *             diretor: "Quentin Tarantino"
 *             duracao: "154 min"
 *             anoLancamento: 1994
 *             genero: "Crime"
 *             sinopse: "As vidas de dois assassinos da máfia, um boxeador, a esposa de um gângster e um par de bandidos se entrelaçam em quatro contos de violência e redenção."
 *     responses:
 *       201:
 *         description: Filme criado com sucesso.
 *       400:
 *         description: Dados inválidos.
 *       401:
 *         description: Não autorizado.
 */
router.post("/", filmesController.criarFilme);

/**
 * @swagger
 * /filmes/{id}:
 *   put:
 *     summary: Atualiza um filme existente
 *     tags: [Filmes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: O ID do filme.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Filme'
 *     responses:
 *       200:
 *         description: Filme atualizado com sucesso.
 *       401:
 *         description: Não autorizado.
 *       404:
 *         description: Filme não encontrado.
 */
router.put("/:id", filmesController.atualizarFilme);

/**
 * @swagger
 * /filmes/{id}:
 *   delete:
 *     summary: Deleta um filme
 *     tags: [Filmes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: O ID do filme.
 *     responses:
 *       200:
 *         description: Filme deletado com sucesso.
 *       401:
 *         description: Não autorizado.
 *       404:
 *         description: Filme não encontrado.
 */
router.delete("/:id", filmesController.deletarFilme);

export default router;
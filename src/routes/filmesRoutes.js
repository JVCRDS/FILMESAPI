import express from 'express';
import filmesController from '../controllers/filmesController.js';
import apiKeyMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(apiKeyMiddleware);

router.get('/', filmesController.listarFilmes);
router.get('/:id', filmesController.buscarPorId);
router.get('/titulo/:titulo', filmesController.buscarPorTitulo);
router.get('/genero/:genero', filmesController.buscarPorGenero);
router.post('/', filmesController.criarFilme);
router.put('/:id', filmesController.atualizarFilme);
router.delete('/:id', filmesController.deletarFilme);

export default router;
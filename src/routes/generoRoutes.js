import express from 'express';
import generoController from '../controllers/generoController.js';
import apiKeyMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(apiKeyMiddleware);

router.get('/', generoController.listarGeneros);
router.get('/:id', generoController.buscarPorId);
router.post('/', generoController.criarGenero);
router.put('/:id', generoController.atualizarGenero);
router.delete('/:id', generoController.deletarGenero);

export default router;
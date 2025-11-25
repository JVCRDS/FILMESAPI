import express from 'express';
import directorController from '../controllers/directorController.js';
import apiKeyMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(apiKeyMiddleware);

router.get('/', directorController.listarDiretores);
router.get('/:id', directorController.buscarPorId);
router.post('/', directorController.criarDiretor);
router.put('/:id', directorController.atualizarDiretor);
router.delete('/:id', directorController.deletarDiretor);

export default router;
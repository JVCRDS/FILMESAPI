
const express = require('express');
const router = express.Router();
const filmesController = require('../controllers/filmesController');
const apiKeyMiddleware = require('../middleware/authMiddleware');

router.use(apiKeyMiddleware);

router.get('/', filmesController.listarFilmes);
router.get('/:id', filmesController.buscarPorId);
router.get('/titulo/:titulo', filmesController.buscarPorTitulo);
router.get('/genero/:genero', filmesController.buscarPorGenero);
router.post('/', filmesController.criarFilme);
router.put('/:id', filmesController.atualizarFilme);
router.delete('/:id', filmesController.deletarFilme);

module.exports = router;
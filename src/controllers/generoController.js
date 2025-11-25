import Genero from '../models/Genero.js';

const generoController = {
  listarGeneros: async (req, res) => {
    try {
      const generos = await Genero.findAll();
      res.json(generos);
    } catch (error) {
      res.status(500).json({ mensagem: "Erro ao listar gêneros" });
    }
  },

  buscarPorId: async (req, res) => {
    try {
      const genero = await Genero.findByPk(req.params.id);
      if (!genero) return res.status(404).json({ mensagem: "Gênero não encontrado." });
      res.json(genero);
    } catch (error) {
      res.status(500).json({ mensagem: "Erro ao buscar gênero" });
    }
  },

  criarGenero: async (req, res) => {
    try {
      const { nome } = req.body;
      
      if (!nome) {
        return res.status(400).json({ mensagem: "O campo nome é obrigatório" });
      }

      const novoGenero = await Genero.create({ nome });
      res.status(201).json(novoGenero);
    } catch (error) {
      res.status(500).json({ mensagem: "Erro ao criar gênero" });
    }
  },

  atualizarGenero: async (req, res) => {
    try {
      const genero = await Genero.findByPk(req.params.id);
      if (!genero) {
        return res.status(404).json({ mensagem: "Gênero não encontrado." });
      }

      const { nome } = req.body;
      await genero.update({ nome: nome || genero.nome });
      res.json(genero);
    } catch (error) {
      res.status(500).json({ mensagem: "Erro ao atualizar gênero" });
    }
  },

  deletarGenero: async (req, res) => {
    try {
      const genero = await Genero.findByPk(req.params.id);
      if (!genero) {
        return res.status(404).json({ mensagem: "Gênero não encontrado." });
      }

      await genero.destroy();
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ mensagem: "Erro ao deletar gênero" });
    }
  }
};

export default generoController;
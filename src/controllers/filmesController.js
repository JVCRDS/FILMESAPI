import Filmes from '../models/Filmes.js';

const filmesController = {
  listarFilmes: async (req, res) => {
    try {
      const pagina = parseInt(req.query.pagina) || 1;
      const limite = Math.min(parseInt(req.query.limite) || 10, 100);
      const inicio = (pagina - 1) * limite;

      const filmes = await Filmes.findAll({
        limit: limite,
        offset: inicio
      });

      const total = await Filmes.count();
      
      res.json({
        total: total,
        pagina: pagina,
        totalPaginas: Math.ceil(total / limite),
        filmes: filmes
      });
    } catch (error) {
      res.status(500).json({ mensagem: "Erro ao listar filmes" });
    }
  },

  buscarPorId: async (req, res) => {
    try {
      const filme = await Filmes.findByPk(req.params.id);
      if (!filme) return res.status(404).json({ mensagem: "Filme não encontrado." });
      res.json(filme);
    } catch (error) {
      res.status(500).json({ mensagem: "Erro ao buscar filme" });
    }
  },

  buscarPorTitulo: async (req, res) => {
    try {
      const titulo = decodeURIComponent(req.params.titulo);
      const filme = await Filmes.findOne({
        where: { titulo: titulo }
      });
      if (!filme) return res.status(404).json({ mensagem: "Filme não encontrado." });
      res.json(filme);
    } catch (error) {
      res.status(500).json({ mensagem: "Erro ao buscar filme" });
    }
  },

  buscarPorGenero: async (req, res) => {
    try {
      const genero = decodeURIComponent(req.params.genero);
      const filmesGenero = await Filmes.findAll({
        where: { genero: genero }
      });
      if (filmesGenero.length === 0) {
        return res.status(404).json({ mensagem: "Não há filmes cadastrados para esse gênero." });
      }
      res.json(filmesGenero);
    } catch (error) {
      res.status(500).json({ mensagem: "Erro ao buscar filmes por gênero" });
    }
  },

  criarFilme: async (req, res) => {
    try {
      const { titulo, diretor, duracao, anoLancamento, genero, sinopse } = req.body;
      
      if (!titulo || !diretor || !duracao || !anoLancamento || !genero || !sinopse) {
        return res.status(400).json({ mensagem: "Todos os campos são obrigatórios" });
      }

      const novoFilme = await Filmes.create({
        titulo,
        diretor,
        duracao,
        anoLancamento: parseInt(anoLancamento),
        genero,
        sinopse
      });

      res.status(201).json(novoFilme);
    } catch (error) {
      res.status(500).json({ mensagem: "Erro ao criar filme" });
    }
  },

  atualizarFilme: async (req, res) => {
    try {
      const filme = await Filmes.findByPk(req.params.id);
      if (!filme) {
        return res.status(404).json({ mensagem: "Filme não encontrado." });
      }

      const camposPermitidos = ['titulo', 'diretor', 'duracao', 'anoLancamento', 'genero', 'sinopse'];
      const atualizacoes = {};
      
      camposPermitidos.forEach(campo => {
        if (req.body[campo] !== undefined) {
          atualizacoes[campo] = req.body[campo];
        }
      });

      await filme.update(atualizacoes);
      res.json(filme);
    } catch (error) {
      res.status(500).json({ mensagem: "Erro ao atualizar filme" });
    }
  },

  deletarFilme: async (req, res) => {
    try {
      const filme = await Filmes.findByPk(req.params.id);
      if (!filme) {
        return res.status(404).json({ mensagem: "Filme não encontrado." });
      }

      await filme.destroy();
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ mensagem: "Erro ao deletar filme" });
    }
  }
};

export default filmesController;
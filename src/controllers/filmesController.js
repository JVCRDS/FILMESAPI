import Filmes from "../models/filmes.js";
import { Op } from "sequelize";

const filmesController = {
  listarFilmes: async (req, res) => {
    try {
      const pagina = parseInt(req.query.pagina) || 1;
      const limite = Math.min(parseInt(req.query.limite) || 10, 100);
      const offset = (pagina - 1) * limite;

      const { count, rows } = await Filmes.findAndCountAll({
        limit: limite,
        offset: offset,
        order: [["criadoEm", "DESC"]],
      });

      res.json({
        mensagem: "Filmes listados com sucesso",
        total: count,
        pagina: pagina,
        limite: limite,
        dados: rows,
      });
    } catch (error) {
      console.error("Erro em listarFilmes:", error); // Adicionado para depuração
      res.status(500).json({
        mensagem: "Erro ao listar filmes",
        erro: error.message,
      });
    }
  },

  buscarPorId: async (req, res) => {
    try {
      const filme = await Filmes.findByPk(req.params.id);
      if (!filme) {
        return res.status(404).json({ mensagem: "Filme não encontrado." });
      }
      res.json(filme);
    } catch (error) {
      console.error("Erro em buscarPorId:", error); // Adicionado para depuração
      res.status(500).json({
        mensagem: "Erro ao buscar filme",
        erro: error.message,
      });
    }
  },

  buscarPorTitulo: async (req, res) => {
    try {
      const titulo = decodeURIComponent(req.params.titulo);
      const filme = await Filmes.findOne({
        where: {
          titulo: {
            [Op.iLike]: `%${titulo}%`,
          },
        },
      });

      if (!filme) {
        return res.status(404).json({ mensagem: "Filme não encontrado." });
      }
      res.json(filme);
    } catch (error) {
      console.error("Erro em buscarPorTitulo:", error); // Adicionado para depuração
      res.status(500).json({
        mensagem: "Erro ao buscar filme",
        erro: error.message,
      });
    }
  },

  buscarPorGenero: async (req, res) => {
    try {
      const genero = decodeURIComponent(req.params.genero);
      const filmesGenero = await Filmes.findAll({
        where: {
          genero: {
            [Op.iLike]: `%${genero}%`,
          },
        },
      });

      if (filmesGenero.length === 0) {
        return res
          .status(404)
          .json({ mensagem: "Não há filmes cadastrados para esse gênero." });
      }
      res.json(filmesGenero);
    } catch (error) {
      console.error("Erro em buscarPorGenero:", error); // Adicionado para depuração
      res.status(500).json({
        mensagem: "Erro ao buscar filmes",
        erro: error.message,
      });
    }
  },

  criarFilme: async (req, res) => {
    try {
      const { titulo, diretor, duracao, anoLancamento, genero, sinopse } =
        req.body;

      if (
        !titulo ||
        !diretor ||
        !duracao ||
        !anoLancamento ||
        !genero ||
        !sinopse
      ) {
        return res
          .status(400)
          .json({ mensagem: "Todos os campos são obrigatórios" });
      }

      const novoFilme = await Filmes.create({
        titulo,
        diretor,
        duracao: parseInt(duracao),
        anoLancamento: parseInt(anoLancamento),
        genero,
        sinopse,
      });

      res.status(201).json({
        mensagem: "Filme criado com sucesso",
        filme: novoFilme,
      });
    } catch (error) {
      console.error("Erro em criarFilme:", error); // Adicionado para depuração
      res.status(500).json({
        mensagem: "Erro ao criar filme",
        erro: error.message,
      });
    }
  },

  atualizarFilme: async (req, res) => {
    try {
      const filme = await Filmes.findByPk(req.params.id);

      if (!filme) {
        return res.status(404).json({ mensagem: "Filme não encontrado." });
      }

      const camposPermitidos = [
        "titulo",
        "diretor",
        "duracao",
        "anoLancamento",
        "genero",
        "sinopse",
      ];
      const atualizacoes = {};

      camposPermitidos.forEach((campo) => {
        if (req.body[campo] !== undefined) {
          atualizacoes[campo] = req.body[campo];
        }
      });

      const filmeAtualizado = await filme.update(atualizacoes);

      res.json({
        mensagem: "Filme atualizado com sucesso",
        filme: filmeAtualizado,
      });
    } catch (error) {
      console.error("Erro em atualizarFilme:", error); // Adicionado para depuração
      res.status(500).json({
        mensagem: "Erro ao atualizar filme",
        erro: error.message,
      });
    }
  },

  deletarFilme: async (req, res) => {
    try {
      const filme = await Filmes.findByPk(req.params.id);

      if (!filme) {
        return res.status(404).json({ mensagem: "Filme não encontrado." });
      }

      await filme.destroy();

      res.status(200).json({
        mensagem: "Filme deletado com sucesso",
        filmeId: req.params.id,
      });
    } catch (error) {
      console.error("Erro em deletarFilme:", error); // Adicionado para depuração
      res.status(500).json({
        mensagem: "Erro ao deletar filme",
        erro: error.message,
      });
    }
  },
};

export default filmesController;

import Director from '../models/Director.js';

const directorController = {
  listarDiretores: async (req, res) => {
    try {
      const diretores = await Director.findAll();
      res.json(diretores);
    } catch (error) {
      res.status(500).json({ mensagem: "Erro ao listar diretores" });
    }
  },

  buscarPorId: async (req, res) => {
    try {
      const diretor = await Director.findByPk(req.params.id);
      if (!diretor) return res.status(404).json({ mensagem: "Diretor não encontrado." });
      res.json(diretor);
    } catch (error) {
      res.status(500).json({ mensagem: "Erro ao buscar diretor" });
    }
  },

  criarDiretor: async (req, res) => {
    try {
      const { nome, nacionalidade, dataNascimento } = req.body;
      
      if (!nome) {
        return res.status(400).json({ mensagem: "O campo nome é obrigatório" });
      }

      // TRATATIVA STRING - TO NUMBER
      if (typeof dataNascimento === 'number') {
        const ano = Math.floor(dataNascimento / 10000);
        const mes = Math.floor((dataNascimento % 10000) / 100);
        const dia = dataNascimento % 100;
        dataNascimento = `${ano}-${mes.toString().padStart(2, '0')}-${dia.toString().padStart(2, '0')}`;
      }

      const novoDiretor = await Director.create({
        nome,
        nacionalidade,
        dataNascimento
      });

      res.status(201).json(novoDiretor);
    } catch (error) {
      res.status(500).json({ mensagem: "Erro ao criar diretor" });
    }
  },

  atualizarDiretor: async (req, res) => {
    try {
      const diretor = await Director.findByPk(req.params.id);
      if (!diretor) {
        return res.status(404).json({ mensagem: "Diretor não encontrado." });
      }

      const { nome, nacionalidade, dataNascimento } = req.body;
      
      await diretor.update({
        nome: nome || diretor.nome,
        nacionalidade: nacionalidade || diretor.nacionalidade,
        dataNascimento: dataNascimento || diretor.dataNascimento
      });

      res.json(diretor);
    } catch (error) {
      res.status(500).json({ mensagem: "Erro ao atualizar diretor" });
    }
  },

  deletarDiretor: async (req, res) => {
    try {
      const diretor = await Director.findByPk(req.params.id);
      if (!diretor) {
        return res.status(404).json({ mensagem: "Diretor não encontrado." });
      }

      await diretor.destroy();
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ mensagem: "Erro ao deletar diretor" });
    }
  }
};

export default directorController;
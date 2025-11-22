import filmes from '../data/database.js';

const filmesController = {
    listarFilmes: (req, res) => {
        const pagina = parseInt(req.query.pagina) || 1;
        const limite = Math.min(parseInt(req.query.limite) || 10, 100);
        const inicio = (pagina - 1) * limite;
        const fim = inicio + limite;

        const resultado = filmes.slice(inicio, fim);
        res.json(resultado);
    },
    
    buscarPorId: (req, res) => {
        const filme = filmes.find(f => f.id === req.params.id);
        if (!filme) return res.status(404).json({ mensagem: "Filme não encontrado." });
        res.json(filme);
    },
    
    buscarPorTitulo: (req, res) => {
        const titulo = decodeURIComponent(req.params.titulo);
        const filme = filmes.find(f => 
            f.titulo.toLowerCase() === titulo.toLowerCase()
        );
        if (!filme) return res.status(404).json({ mensagem: "Filme não encontrado." });
        res.json(filme);
    },

    buscarPorGenero: (req, res) => {
        const genero = decodeURIComponent(req.params.genero);
        const filmesGenero = filmes.filter(f => 
            f.genero.toLowerCase() === genero.toLowerCase()
        );
        if (filmesGenero.length === 0) {
            return res.status(404).json({ mensagem: "Não há filmes cadastrados para esse gênero." });
        }
        res.json(filmesGenero);
    },

    criarFilme: (req, res) => {
        const { titulo, diretor, duracao, anoLancamento, genero, sinopse } = req.body;
        
        if (!titulo || !diretor || !duracao || !anoLancamento || !genero || !sinopse) {
            return res.status(400).json({ mensagem: "Todos os campos são obrigatórios" });
        }

        const novoFilme = {
            id: `filme${Math.random().toString(36).substr(2, 4)}`,
            titulo,
            diretor,
            duracao: parseInt(duracao),
            anoLancamento: parseInt(anoLancamento),
            genero,
            sinopse,
            criadoEm: new Date().toISOString(),
            atualizadoEm: new Date().toISOString()
        };

        filmes.push(novoFilme);
        res.status(201).json(novoFilme);
    },

    atualizarFilme: (req, res) => {
        const filmeIndex = filmes.findIndex(f => f.id === req.params.id);
        if (filmeIndex === -1) {
            return res.status(404).json({ mensagem: "Filme não encontrado." });
        }

        const camposPermitidos = ['titulo', 'diretor', 'duracao', 'anoLancamento', 'genero', 'sinopse'];
        const atualizacoes = {};
        
        camposPermitidos.forEach(campo => {
            if (req.body[campo] !== undefined) {
                atualizacoes[campo] = req.body[campo];
            }
        });

        filmes[filmeIndex] = {
            ...filmes[filmeIndex],
            ...atualizacoes,
            atualizadoEm: new Date().toISOString()
        };

        res.json(filmes[filmeIndex]);
    },

    deletarFilme: (req, res) => {
        const filmeIndex = filmes.findIndex(f => f.id === req.params.id);
        if (filmeIndex === -1) {
            return res.status(404).json({ mensagem: "Filme não encontrado." });
        }

        filmes.splice(filmeIndex, 1);
        res.status(204).send();
    }
};

export default filmesController;
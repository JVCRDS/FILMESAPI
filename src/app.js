
const express = require('express');
const filmesRoutes = require('./routes/filmesRoutes');

const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());

app.use('/filmes', filmesRoutes);

app.get('/', (req, res) => {
    res.json({ 
        mensagem: 'API de Catálogo de Filmes',
        versao: '1.0.0',
        endpoints: {
            listarFilmes: 'GET /filmes',
            buscarPorId: 'GET /filmes/:id',
            buscarPorTitulo: 'GET /filmes/titulo/:titulo',
            buscarPorGenero: 'GET /filmes/genero/:genero',
            criarFilme: 'POST /filmes',
            atualizarFilme: 'PUT /filmes/:id',
            deletarFilme: 'DELETE /filmes/:id'
        }
    });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
    console.log(`Acesse: http://localhost:${PORT}`);
});
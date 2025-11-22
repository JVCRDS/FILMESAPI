import express from 'express';
import filmesRoutes from './routes/filmesRoutes.js';
import FILMESAPI from './data/database.js';
import Filmes from './models/filmes.js';
import { Sequelize } from 'sequelize';


const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());

async function testeconexion() {
    try {
        await FILMESAPI.authenticate(),
        console.log('Conexão Estabelecida')
    } catch (error) {
        console.error('Não deu certo', error)
    }
}

await testeconexion();

try {
    await FILMESAPI.sync();
    console.log('Models sincronizados com o banco!');
} catch (err) {
    console.error('Erro ao sincronizar os models:', err);
}

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
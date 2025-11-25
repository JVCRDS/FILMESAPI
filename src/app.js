import express from "express";
import filmesRoutes from "./routes/filmesRoutes.js";
import directorRoutes from "./routes/directorRoutes.js"; // NOVA IMPORT
import generoRoutes from "./routes/generoRoutes.js"; // NOVA IMPORT
import FILMESAPI from "./data/database.js";
import Filmes from "./models/Filmes.js";
import Director from "./models/Director.js"; // NOVA IMPORT
import Genero from "./models/Genero.js"; // NOVA IMPORT
import { Sequelize } from "sequelize";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

async function testeconexion() {
  try {
    await FILMESAPI.authenticate();
    console.log("Conexão Estabelecida");
  } catch (error) {
    console.error("Não deu certo", error);
  }
}

await testeconexion();

try {
  await FILMESAPI.sync();
  console.log("✓ Models sincronizados com o banco!");
} catch (err) {
  console.error("✗ Erro ao sincronizar os models:", err);
}

// Rotas
app.use("/filmes", filmesRoutes);
app.use("/diretores", directorRoutes);
app.use("/generos", generoRoutes);

app.get("/", (req, res) => {
  res.json({
    mensagem: "API de Catálogo de Filmes",
    versao: "1.0.0",
    endpoints: {
      filmes: {
        listarFilmes: "GET /filmes",
        buscarPorId: "GET /filmes/:id",
        buscarPorTitulo: "GET /filmes/titulo/:titulo",
        buscarPorGenero: "GET /filmes/genero/:genero",
        criarFilme: "POST /filmes",
        atualizarFilme: "PUT /filmes/:id",
        deletarFilme: "DELETE /filmes/:id",
      },
      diretores: {
        listarDiretores: "GET /diretores",
        buscarPorId: "GET /diretores/:id",
        criarDiretor: "POST /diretores",
        atualizarDiretor: "PUT /diretores/:id",
        deletarDiretor: "DELETE /diretores/:id",
      },
      generos: {
        listarGeneros: "GET /generos",
        buscarPorId: "GET /generos/:id",
        criarGenero: "POST /generos",
        atualizarGenero: "PUT /generos/:id",
        deletarGenero: "DELETE /generos/:id",
      },
    },
  });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log(`Acesse: http://localhost:${PORT}`);
});

import "dotenv/config";
import express from "express";
import filmesRoutes from "./routes/filmesRoutes.js";
import directorRoutes from "./routes/directorRoutes.js";
import generoRoutes from "./routes/generoRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import FILMESAPI from "./data/database.js";
import Filmes from "./models/filmes.js";
import authMiddleware from "./middleware/authMiddleware.js";
import Director from "./models/Director.js";
import Genero from "./models/Genero.js";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swaggerConfig.js"; // Esta linha está correta agora
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
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec)); // Rota da documentação
app.use("/auth", authRoutes); // Rota de autenticação (pública)
app.use("/filmes", authMiddleware, filmesRoutes); // Protege todas as rotas de filmes
app.use("/diretores", authMiddleware, directorRoutes); // Protege todas as rotas de diretores
app.use("/generos", authMiddleware, generoRoutes); // Protege todas as rotas de gêneros

app.get("/", (req, res) => {
  res.json({
    mensagem: "API de Catálogo de Filmes",
    versao: "1.0.0",
    endpoints: {
      autenticacao: {
        login: "POST /auth/login",
      },
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

export default app;

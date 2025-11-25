import express from "express";
import filmesRoutes from "./routes/filmesRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import authMiddleware from "./middleware/authMiddleware.js";
import FILMESAPI from "./data/database.js";
import Filmes from "./models/filmes.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

async function testeconexion() {
  try {
    await FILMESAPI.authenticate(), console.log("✓ Conexão Estabelecida");
  } catch (error) {
    console.error("✗ Erro ao conectar", error);
  }
}

await testeconexion();

try {
  await FILMESAPI.sync();
  console.log("✓ Models sincronizados com o banco!");
} catch (err) {
  console.error("✗ Erro ao sincronizar os models:", err);
}

// Rotas públicas
app.use("/api/auth", authRoutes);

// Rotas protegidas por JWT
app.use("/api/filmes", authMiddleware, filmesRoutes);

app.get("/", (req, res) => {
  res.json({
    mensagem: "API de Catálogo de Filmes",
    versao: "1.0.0",
    endpoints: {
      login: "POST /api/auth/login",
      listarFilmes: "GET /api/filmes",
      buscarPorId: "GET /api/filmes/:id",
      buscarPorTitulo: "GET /api/filmes/titulo/:titulo",
      buscarPorGenero: "GET /api/filmes/genero/:genero",
      criarFilme: "POST /api/filmes",
      atualizarFilme: "PUT /api/filmes/:id",
      deletarFilme: "DELETE /api/filmes/:id",
    },
  });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log(`Acesse: http://localhost:${PORT}`);
});

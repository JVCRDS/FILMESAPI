import request from "supertest";
import app from "../src/app.js"; // Importa a instância do app

// O supertest vai usar a instância do app para rodar os testes
const api = request(app);

describe("Testes de Integração para Endpoints de Filmes", () => {
  let token;
  let filmeCriadoId;

  // Antes de todos os testes, faz login para obter um token
  beforeAll(async () => {
    const response = await api.post("/auth/login").send({
      username: "admin",
      password: "admin123",
    });
    token = response.body.token;
    expect(token).toBeDefined();
  });

  test("GET /filmes - Deve retornar 401 sem token", async () => {
    await api.get("/filmes").expect(401);
  });

  test("GET /filmes - Deve listar filmes com sucesso quando autenticado", async () => {
    const response = await api
      .get("/filmes")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty(
      "mensagem",
      "Filmes listados com sucesso"
    );
    expect(response.body).toHaveProperty("dados");
    expect(Array.isArray(response.body.dados)).toBe(true);
  });

  // Teste do ciclo de vida CRUD
  test("POST /filmes - Deve criar um novo filme", async () => {
    const novoFilme = {
      titulo: "Filme de Teste",
      diretor: "Diretor de Teste",
      duracao: "100 min",
      anoLancamento: 2024,
      genero: "Teste",
      sinopse: "Sinopse de teste.",
    };

    const response = await api
      .post("/filmes")
      .set("Authorization", `Bearer ${token}`)
      .send(novoFilme);

    expect(response.status).toBe(201);
    expect(response.body.filme.titulo).toBe(novoFilme.titulo);
    filmeCriadoId = response.body.filme.id; // Salva o ID para os próximos testes
  });

  test("GET /filmes/:id - Deve buscar o filme recém-criado", async () => {
    const response = await api
      .get(`/filmes/${filmeCriadoId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.id).toBe(filmeCriadoId);
  });

  test("PUT /filmes/:id - Deve atualizar o filme recém-criado", async () => {
    const dadosAtualizados = {
      titulo: "Filme de Teste Atualizado",
      anoLancamento: 2025,
    };

    const response = await api
      .put(`/filmes/${filmeCriadoId}`)
      .set("Authorization", `Bearer ${token}`)
      .send(dadosAtualizados);

    expect(response.status).toBe(200);
    expect(response.body.filme.titulo).toBe("Filme de Teste Atualizado");
    expect(response.body.filme.anoLancamento).toBe(2025);
  });

  test("DELETE /filmes/:id - Deve deletar o filme recém-criado", async () => {
    const response = await api
      .delete(`/filmes/${filmeCriadoId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.mensagem).toBe("Filme deletado com sucesso");
  });

  // Testes de Erro
  test("GET /filmes/:id - Deve retornar 404 para um filme deletado", async () => {
    await api
      .get(`/filmes/${filmeCriadoId}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(404);
  });

  test("POST /filmes - Deve retornar 400 ao tentar criar um filme sem dados obrigatórios", async () => {
    const filmeIncompleto = {
      titulo: "Filme Incompleto",
    };

    const response = await api
      .post("/filmes")
      .set("Authorization", `Bearer ${token}`)
      .send(filmeIncompleto);

    expect(response.status).toBe(400);
    expect(response.body.mensagem).toBe("Todos os campos são obrigatórios");
  });
});

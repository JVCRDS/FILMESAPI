import request from "supertest";
import app from "../src/app.js";


const api = request(app);

describe("Testes de Integração para Endpoints de Diretores", () => {
  let token;
  let diretorCriadoId;

  beforeAll(async () => {
    const response = await api.post("/auth/login").send({
      username: "admin",
      password: "admin123",
    });
    token = response.body.token;
  });

  test("GET /diretores - Deve listar diretores com sucesso", async () => {
    const response = await api
      .get("/diretores")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test("POST /diretores - Deve criar um novo diretor", async () => {
    const novoDiretor = {
      nome: "Diretor Teste",
      nacionalidade: "Brasileiro",
      dataNascimento: "1980-01-01",
    };

    const response = await api
      .post("/diretores")
      .set("Authorization", `Bearer ${token}`)
      .send(novoDiretor);

    expect(response.status).toBe(201);
    expect(response.body.nome).toBe(novoDiretor.nome);
    diretorCriadoId = response.body.id;
  });

  test("GET /diretores/:id - Deve buscar o diretor recém-criado", async () => {
    const response = await api
      .get(`/diretores/${diretorCriadoId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.id).toBe(diretorCriadoId);
  });

  test("PUT /diretores/:id - Deve atualizar o diretor", async () => {
    const response = await api
      .put(`/diretores/${diretorCriadoId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ nome: "Diretor Teste Atualizado" });

    expect(response.status).toBe(200);
    expect(response.body.nome).toBe("Diretor Teste Atualizado");
  });

  test("DELETE /diretores/:id - Deve deletar o diretor", async () => {
    const response = await api
      .delete(`/diretores/${diretorCriadoId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(204);
  });
});

import request from "supertest";
import app from "../src/app.js";

const api = request(app);

describe("Testes de Integração para Endpoints de Gêneros", () => {
  let token;
  let generoCriadoId;

  beforeAll(async () => {
    const response = await api.post("/auth/login").send({
      username: "admin",
      password: "admin123",
    });
    token = response.body.token;
  });

  test("GET /generos - Deve listar gêneros com sucesso", async () => {
    const response = await api
      .get("/generos")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test("POST /generos - Deve criar um novo gênero", async () => {
    const novoGenero = { nome: "Gênero Teste" };

    const response = await api
      .post("/generos")
      .set("Authorization", `Bearer ${token}`)
      .send(novoGenero);

    expect(response.status).toBe(201);
    expect(response.body.nome).toBe(novoGenero.nome);
    generoCriadoId = response.body.id;
  });

  test("PUT /generos/:id - Deve atualizar o gênero", async () => {
    const response = await api
      .put(`/generos/${generoCriadoId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ nome: "Gênero Teste Atualizado" });

    expect(response.status).toBe(200);
    expect(response.body.nome).toBe("Gênero Teste Atualizado");
  });

  test("DELETE /generos/:id - Deve deletar o gênero", async () => {
    const response = await api
      .delete(`/generos/${generoCriadoId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(204);
  });
});

import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API de Catálogo de Filmes",
      version: "1.0.0",
      description:
        "API REST para gerenciamento de um catálogo de filmes, com autenticação JWT. Este projeto foi desenvolvido como parte da disciplina de Programação Web.",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Servidor de Desenvolvimento",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ["./src/routes/*.js"], // Caminho para os arquivos que contêm as anotações
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;

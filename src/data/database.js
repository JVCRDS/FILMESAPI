import { Sequelize } from "sequelize";


const FILMESAPI = new Sequelize("FILMESAPI", "teste", "123", {
  host: "localhost",
  dialect: "postgres",
  port: 5432
});

(async () => {
  try {
    await FILMESAPI.authenticate();
    console.log("Conectado ao PostgreSQL com sucesso!");
  } catch (err) {
    console.error("Erro ao conectar:", err);
  }
})();

export default FILMESAPI;
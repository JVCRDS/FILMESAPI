import { DataTypes } from "sequelize";
import database from "../data/database.js";

const Filmes = database.define(
  "filmes",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    titulo: DataTypes.STRING,
    diretor: DataTypes.STRING,
    duracao: DataTypes.STRING,
    anoLancamento: DataTypes.INTEGER,
    genero: DataTypes.STRING,
    sinopse: DataTypes.STRING,
  },
  {
    timestamps: true,       
    createdAt: "criadoEm",   
    updatedAt: "atualizadoEm",
  }
);

export default Filmes;

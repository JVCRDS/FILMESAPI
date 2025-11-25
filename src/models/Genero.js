import { DataTypes } from "sequelize";
import database from "../data/database.js";

const Genero = database.define(
  "genero",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    createdAt: "criadoEm",
    updatedAt: "atualizadoEm",
  }
);

export default Genero;
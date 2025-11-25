import { DataTypes } from "sequelize";
import database from "../data/database.js";

const Director = database.define(
  "director",
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
    nacionalidade: DataTypes.STRING,
    dataNascimento: DataTypes.DATEONLY,
  },
  {
    timestamps: true,
    createdAt: "criadoEm",
    updatedAt: "atualizadoEm",
  }
);

export default Director;
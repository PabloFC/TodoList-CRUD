import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Tarea = sequelize.define(
  "Tarea",
  {
    texto: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    completada: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    tableName: "tareas",
    timestamps: true,
  }
);

export default Tarea;

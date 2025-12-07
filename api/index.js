import express from "express";
import cors from "cors";
import { Sequelize, DataTypes } from "sequelize";

const app = express();

app.use(cors());
app.use(express.json());

// Configurar Sequelize
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  logging: false,
});

// Definir el modelo Tarea directamente aquí
const Tarea = sequelize.define(
  "Tarea",
  {
    texto: {
      type: DataTypes.STRING,
      allowNull: false,
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

// Inicializar DB
let dbInitialized = false;

const initDB = async () => {
  if (!dbInitialized) {
    try {
      await sequelize.authenticate();
      await sequelize.sync({ alter: true });
      dbInitialized = true;
      console.log("✅ DB conectada");
    } catch (error) {
      console.error("❌ Error DB:", error);
      throw error;
    }
  }
};

// Rutas de la API
app.get("/api", (req, res) => {
  res.json({ mensaje: "API funcionando" });
});

// GET - Obtener todas las tareas
app.get("/api/tareas", async (req, res) => {
  try {
    await initDB();
    const tareas = await Tarea.findAll({
      order: [["createdAt", "DESC"]],
    });
    res.json(tareas);
  } catch (error) {
    console.error("Error al obtener tareas:", error);
    res.status(500).json({ error: "Error al obtener tareas" });
  }
});

// POST - Crear una tarea
app.post("/api/tareas", async (req, res) => {
  try {
    await initDB();
    const { texto } = req.body;

    if (!texto || texto.trim() === "") {
      return res.status(400).json({ error: "El texto es requerido" });
    }

    const nuevaTarea = await Tarea.create({ texto });
    res.status(201).json(nuevaTarea);
  } catch (error) {
    console.error("Error al crear tarea:", error);
    res.status(500).json({
      error: "Error al crear tarea",
      details: error.message,
    });
  }
});

// PUT - Actualizar una tarea
app.put("/api/tareas/:id", async (req, res) => {
  try {
    await initDB();
    const { id } = req.params;
    const { completada, texto } = req.body;

    const tarea = await Tarea.findByPk(id);

    if (!tarea) {
      return res.status(404).json({ error: "Tarea no encontrada" });
    }

    if (completada !== undefined) {
      tarea.completada = completada;
    }
    if (texto !== undefined) {
      tarea.texto = texto;
    }

    await tarea.save();
    res.json(tarea);
  } catch (error) {
    console.error("Error al actualizar tarea:", error);
    res.status(500).json({ error: "Error al actualizar tarea" });
  }
});

// DELETE - Eliminar una tarea
app.delete("/api/tareas/:id", async (req, res) => {
  try {
    await initDB();
    const { id } = req.params;

    const tarea = await Tarea.findByPk(id);

    if (!tarea) {
      return res.status(404).json({ error: "Tarea no encontrada" });
    }

    await tarea.destroy();
    res.json({ mensaje: "Tarea eliminada correctamente" });
  } catch (error) {
    console.error("Error al eliminar tarea:", error);
    res.status(500).json({ error: "Error al eliminar tarea" });
  }
});

export default app;

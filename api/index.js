import express from "express";
import cors from "cors";
import { Sequelize, DataTypes } from "sequelize";

const app = express();

// Middlewares
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());

// Log para debugging
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Configurar Sequelize con manejo de errores
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  logging: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

// Modelo Tarea
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

// Inicializar DB una sola vez
let dbInitialized = false;
const initDB = async () => {
  if (!dbInitialized) {
    try {
      await sequelize.authenticate();
      console.log("✅ Conexión a DB establecida");
      await sequelize.sync({ alter: false });
      console.log("✅ Modelos sincronizados");
      dbInitialized = true;
    } catch (error) {
      console.error("❌ Error DB:", error);
      throw error;
    }
  }
};

// Ruta raíz de la API
app.get("/api", (req, res) => {
  res.json({
    mensaje: "API funcionando correctamente",
    endpoints: [
      "GET /api/tareas",
      "POST /api/tareas",
      "PUT /api/tareas/:id",
      "DELETE /api/tareas/:id",
    ],
  });
});

// GET todas las tareas
app.get("/api/tareas", async (req, res) => {
  try {
    await initDB();
    const tareas = await Tarea.findAll({
      order: [["createdAt", "DESC"]],
    });
    res.json(tareas);
  } catch (error) {
    console.error("Error GET /api/tareas:", error);
    res.status(500).json({
      error: "Error al obtener tareas",
      details: error.message,
    });
  }
});

// POST crear tarea
app.post("/api/tareas", async (req, res) => {
  try {
    await initDB();
    const { texto } = req.body;

    if (!texto || texto.trim() === "") {
      return res.status(400).json({ error: "El texto es requerido" });
    }

    const nuevaTarea = await Tarea.create({ texto: texto.trim() });
    console.log("✅ Tarea creada:", nuevaTarea.id);
    res.status(201).json(nuevaTarea);
  } catch (error) {
    console.error("Error POST /api/tareas:", error);
    res.status(500).json({
      error: "Error al crear tarea",
      details: error.message,
    });
  }
});

// PUT actualizar tarea
app.put("/api/tareas/:id", async (req, res) => {
  try {
    await initDB();
    const { id } = req.params;
    const { completada, texto } = req.body;

    const tarea = await Tarea.findByPk(id);

    if (!tarea) {
      return res.status(404).json({ error: "Tarea no encontrada" });
    }

    if (completada !== undefined) tarea.completada = completada;
    if (texto !== undefined) tarea.texto = texto.trim();

    await tarea.save();
    console.log("✅ Tarea actualizada:", id);
    res.json(tarea);
  } catch (error) {
    console.error("Error PUT /api/tareas:", error);
    res.status(500).json({
      error: "Error al actualizar tarea",
      details: error.message,
    });
  }
});

// DELETE eliminar tarea
app.delete("/api/tareas/:id", async (req, res) => {
  try {
    await initDB();
    const { id } = req.params;

    const tarea = await Tarea.findByPk(id);

    if (!tarea) {
      return res.status(404).json({ error: "Tarea no encontrada" });
    }

    await tarea.destroy();
    console.log("✅ Tarea eliminada:", id);
    res.json({ mensaje: "Tarea eliminada correctamente" });
  } catch (error) {
    console.error("Error DELETE /api/tareas:", error);
    res.status(500).json({
      error: "Error al eliminar tarea",
      details: error.message,
    });
  }
});

// Manejo de rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});

export default app;

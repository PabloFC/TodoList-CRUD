import express from "express";
import cors from "cors";
import { Sequelize } from "sequelize";
import tareaRoutes from "../server/routes/tareaRoutes.js";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Conexión a la base de datos
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

// Inicializar DB (solo en la primera llamada)
let dbInitialized = false;

const initDB = async () => {
  if (!dbInitialized) {
    try {
      await sequelize.authenticate();
      await sequelize.sync({ alter: true });
      dbInitialized = true;
      console.log("✅ DB inicializada");
    } catch (error) {
      console.error("❌ Error DB:", error);
    }
  }
};

// Middleware para inicializar DB antes de cada request
app.use(async (req, res, next) => {
  await initDB();
  next();
});

// Ruta de prueba
app.get("/api", (req, res) => {
  res.json({ mensaje: "API funcionando correctamente" });
});

// Rutas de tareas
app.use("/api/tareas", tareaRoutes);

export default app;

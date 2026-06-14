import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import sequelize from "./config/db.js";
import Tarea from "./models/Tarea.js";
import tareaRoutes from "./routes/tareaRoutes.js";
import errorHandler from "./middleware/errorHandler.js";

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Ruta de prueba
app.get("/", (req, res) => {
  res.json({ mensaje: "Servidor To-Do List funcionando correctamente" });
});

// Health check para Render
app.get("/healthz", (req, res) => {
  res.status(200).json({ status: "ok" });
});

// Health check que verifica la conexión a la base de datos
app.get("/health", async (req, res) => {
  try {
    await sequelize.authenticate();
    res.json({
      status: "ok",
      database: "connected",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      database: "disconnected",
      message: error.message,
    });
  }
});

// Rutas de la API
app.use("/api/tareas", tareaRoutes);

// Middleware de manejo de errores (debe ir después de las rutas)
app.use(errorHandler);

// Sincronización con la base de datos
const iniciarServidor = async () => {
  let dbConnected = false;

  try {
    await sequelize.authenticate();
    console.log("Conexión a la base de datos establecida correctamente.");
    // Solo sincronizar esquemas en entornos de desarrollo para evitar cambios automáticos en producción
    if (process.env.NODE_ENV !== "production") {
      await sequelize.sync({ alter: true });
      console.log("Modelos sincronizados con la base de datos.");
    } else {
      console.log(
        "Modo producción: no se sincronizan modelos automáticamente.",
      );
    }
    dbConnected = true;
  } catch (error) {
    console.warn(
      "Advertencia: No se pudo conectar a la base de datos:",
      error.message,
    );
    console.warn("El servidor continuará funcionando en modo sin BD.");
  }

  // Iniciar el servidor sin importar el estado de BD
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
    console.log(`Estado de BD: ${dbConnected ? "Conectada" : "Desconectada"}`);
  });
};

iniciarServidor();

// Exportar la app para Vercel (ya no se usa pero lo dejamos)
export default app;

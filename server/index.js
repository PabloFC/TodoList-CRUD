import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import sequelize from "./config/db.js";
import Tarea from "./models/Tarea.js";
import tareaRoutes from "./routes/tareaRoutes.js";

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

// Rutas de la API
app.use("/api/tareas", tareaRoutes);

// Sincronización con la base de datos
const iniciarServidor = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Conexión a la base de datos establecida correctamente.");

    await sequelize.sync({ alter: true });
    console.log("✅ Modelos sincronizados con la base de datos.");

    // Iniciar el servidor en todos los ambientes
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`✅ Servidor corriendo en el puerto ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Error al conectar con la base de datos:", error);
    process.exit(1);
  }
};

iniciarServidor();

// Exportar la app para Vercel (ya no se usa pero lo dejamos)
export default app;

import express from "express";
import {
  obtenerTareas,
  crearTarea,
  actualizarTarea,
  eliminarTarea,
} from "../controllers/tareaController.js";

const router = express.Router();

// GET /api/tareas - Obtener todas las tareas
router.get("/", obtenerTareas);

// POST /api/tareas - Crear una nueva tarea
router.post("/", crearTarea);

// PUT /api/tareas/:id - Actualizar una tarea
router.put("/:id", actualizarTarea);

// DELETE /api/tareas/:id - Eliminar una tarea
router.delete("/:id", eliminarTarea);

export default router;

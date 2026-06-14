import express from "express";
import { body, param } from "express-validator";
import {
  obtenerTareas,
  crearTarea,
  actualizarTarea,
  eliminarTarea,
} from "../controllers/tareaController.js";
import validateRequest from "../middleware/validateRequest.js";

const router = express.Router();

// GET /api/tareas - Obtener todas las tareas
router.get("/", obtenerTareas);

// POST /api/tareas - Crear una nueva tarea
router.post(
  "/",
  [
    body("texto")
      .trim()
      .notEmpty()
      .withMessage("El texto de la tarea es requerido")
      .isLength({ max: 255 })
      .withMessage("El texto no puede tener más de 255 caracteres"),
    validateRequest,
  ],
  crearTarea,
);

// PUT /api/tareas/:id - Actualizar una tarea
router.put(
  "/:id",
  [
    param("id").isInt().withMessage("ID inválido"),
    body("completada")
      .exists()
      .withMessage("El campo completada es requerido")
      .isBoolean()
      .withMessage("El campo completada debe ser booleano"),
    validateRequest,
  ],
  actualizarTarea,
);

// DELETE /api/tareas/:id - Eliminar una tarea
router.delete(
  "/:id",
  [param("id").isInt().withMessage("ID inválido"), validateRequest],
  eliminarTarea,
);

export default router;

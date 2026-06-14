import Tarea from "../models/Tarea.js";

// GET - Obtener todas las tareas
export const obtenerTareas = async (req, res) => {
  try {
    // Obtener todas las tareas ordenadas por fecha de creación (más recientes primero)
    const tareas = await Tarea.findAll({
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json(tareas);
  } catch (error) {
    // Dejar que el middleware central gestione la respuesta
    console.error("Error al obtener tareas:", error);
    // forward error
    throw error;
  }
};

// POST - Crear una nueva tarea
export const crearTarea = async (req, res) => {
  try {
    const { texto } = req.body;

    // Validar que el texto no esté vacío
    if (!texto || texto.trim() === "") {
      return res
        .status(400)
        .json({ error: "El texto de la tarea es requerido" });
    }

    // Crear la tarea en la base de datos
    const nuevaTarea = await Tarea.create({ texto });

    // Devolver la tarea creada
    res.status(201).json(nuevaTarea);
  } catch (error) {
    console.error("Error al crear tarea:", error);
    throw error;
  }
};

// PUT - Actualizar una tarea (marcar como completada)
export const actualizarTarea = async (req, res) => {
  try {
    const { id } = req.params;
    const { completada } = req.body;

    // Buscar la tarea por ID
    const tarea = await Tarea.findByPk(id);

    if (!tarea) {
      const err = new Error("Tarea no encontrada");
      err.status = 404;
      throw err;
    }

    // Actualizar el estado de la tarea
    await tarea.update({ completada });

    res.status(200).json(tarea);
  } catch (error) {
    console.error("Error al actualizar tarea:", error);
    throw error;
  }
};

// DELETE - Eliminar una tarea
export const eliminarTarea = async (req, res) => {
  try {
    const { id } = req.params;

    // Buscar la tarea por ID
    const tarea = await Tarea.findByPk(id);

    if (!tarea) {
      const err = new Error("Tarea no encontrada");
      err.status = 404;
      throw err;
    }

    // Eliminar la tarea
    await tarea.destroy();

    res.status(200).json({ mensaje: "Tarea eliminada correctamente" });
  } catch (error) {
    console.error("Error al eliminar tarea:", error);
    throw error;
  }
};

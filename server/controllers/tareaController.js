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
    console.error("Error al obtener tareas:", error);
    res.status(500).json({ error: "Error al obtener las tareas" });
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
    res.status(500).json({ error: "Error al crear la tarea" });
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
      return res.status(404).json({ error: "Tarea no encontrada" });
    }

    // Actualizar el estado de la tarea
    await tarea.update({ completada });

    res.status(200).json(tarea);
  } catch (error) {
    console.error("Error al actualizar tarea:", error);
    res.status(500).json({ error: "Error al actualizar la tarea" });
  }
};

// DELETE - Eliminar una tarea
export const eliminarTarea = async (req, res) => {
  try {
    const { id } = req.params;

    // Buscar la tarea por ID
    const tarea = await Tarea.findByPk(id);

    if (!tarea) {
      return res.status(404).json({ error: "Tarea no encontrada" });
    }

    // Eliminar la tarea
    await tarea.destroy();

    res.status(200).json({ mensaje: "Tarea eliminada correctamente" });
  } catch (error) {
    console.error("Error al eliminar tarea:", error);
    res.status(500).json({ error: "Error al eliminar la tarea" });
  }
};

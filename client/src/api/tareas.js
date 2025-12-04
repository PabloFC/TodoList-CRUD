import axios from 'axios';

const API_URL = 'http://localhost:3000/api/tareas';

// GET - Obtener todas las tareas
export const obtenerTareas = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// POST - Crear una nueva tarea
export const crearTarea = async (texto) => {
  const response = await axios.post(API_URL, { texto });
  return response.data;
};

// PUT - Actualizar una tarea
export const actualizarTarea = async (id, completada) => {
  const response = await axios.put(`${API_URL}/${id}`, { completada });
  return response.data;
};

// DELETE - Eliminar una tarea
export const eliminarTarea = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};

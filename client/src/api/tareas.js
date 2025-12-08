import axios from "axios";

// Reemplaza esta URL con la URL real que te dio Render
const API_URL = import.meta.env.VITE_API_URL
  ? `${import.meta.env.VITE_API_URL}/api/tareas`
  : "https://todolist-crud.onrender.com/api/tareas";

export const obtenerTareas = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const crearTarea = async (texto) => {
  const response = await axios.post(API_URL, { texto });
  return response.data;
};

export const actualizarTarea = async (id, datos) => {
  console.log("Actualizando tarea:", id, datos); // Debug
  try {
    const response = await axios.put(`${API_URL}/${id}`, datos);
    console.log("Respuesta:", response.data); // Debug
    return response.data;
  } catch (error) {
    console.error(
      "Error al actualizar:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const eliminarTarea = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};

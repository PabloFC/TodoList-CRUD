import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL 
  ? `${import.meta.env.VITE_API_URL}/api/tareas`
  : '/api/tareas';

export const obtenerTareas = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const crearTarea = async (texto) => {
  const response = await axios.post(API_URL, { texto });
  return response.data;
};

export const actualizarTarea = async (id, datos) => {
  const response = await axios.put(`${API_URL}/${id}`, datos);
  return response.data;
};

export const eliminarTarea = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};

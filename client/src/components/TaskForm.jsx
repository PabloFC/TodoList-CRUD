import { useState } from "react";
import { crearTarea } from "../api/tareas";

function TaskForm({ recargarTareas }) {
  const [texto, setTexto] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (texto.trim() === "") {
      alert("Por favor escribe una tarea");
      return;
    }

    try {
      await crearTarea(texto);
      setTexto(""); // Limpiar el input
      recargarTareas(); // Recargar la lista de tareas
    } catch (error) {
      console.error("Error al crear tarea:", error);
      alert("Error al crear la tarea");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          placeholder="¿Qué necesitas hacer?"
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <button
          type="submit"
          className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
        >
          Agregar
        </button>
      </form>
    </div>
  );
}

export default TaskForm;

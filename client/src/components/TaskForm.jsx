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
    <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border-2 border-purple-100">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          placeholder="¿Qué necesitas hacer hoy?"
          className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
        />
        <button
          type="submit"
          className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all font-semibold shadow-md hover:shadow-lg transform hover:scale-105 flex items-center gap-2"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
          Agregar
        </button>
      </form>
    </div>
  );
}

export default TaskForm;

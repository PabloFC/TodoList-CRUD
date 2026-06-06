import { memo } from "react";
import { useTareas } from "../context/TareasContext";
import { TrashIcon } from "./icons";

function TaskItem({ tarea }) {
  const { alternarCompletada, borrarTarea } = useTareas();

  const handleToggleCompletada = async () => {
    try {
      await alternarCompletada(tarea.id, !tarea.completada);
    } catch (error) {
      console.error("Error al actualizar tarea:", error);
      alert("Error al actualizar la tarea");
    }
  };

  const handleEliminar = async () => {
    if (window.confirm("¿Estás seguro de que quieres eliminar esta tarea?")) {
      try {
        await borrarTarea(tarea.id);
      } catch (error) {
        console.error("Error al eliminar tarea:", error);
        alert("Error al eliminar la tarea");
      }
    }
  };

  return (
    <div className="flex items-center gap-3 p-4 bg-white rounded-lg hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 transition-all duration-200 border border-gray-200 hover:border-indigo-300 shadow-sm hover:shadow-md group">
      <input
        type="checkbox"
        checked={tarea.completada}
        onChange={handleToggleCompletada}
        className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500 focus:ring-offset-2 cursor-pointer transition-transform hover:scale-110"
      />
      <span
        className={`flex-1 text-lg ${
          tarea.completada
            ? "line-through text-gray-400"
            : "text-gray-700 font-medium"
        } transition-all`}
      >
        {tarea.texto}
      </span>
      <button
        onClick={handleEliminar}
        className="px-4 py-2 text-rose-600 hover:text-white hover:bg-rose-500 rounded-lg font-medium transition-all duration-200 border border-rose-200 hover:border-rose-500 transform hover:scale-105 active:scale-95 opacity-0 group-hover:opacity-100 flex items-center gap-2"
      >
        <TrashIcon />
        Eliminar
      </button>
    </div>
  );
}

export default memo(TaskItem);

import { actualizarTarea, eliminarTarea } from "../api/tareas";

function TaskItem({ tarea, recargarTareas }) {
  const handleToggleCompletada = async () => {
    console.log('🔄 Intentando actualizar tarea:', tarea.id, 'completada:', !tarea.completada);
    try {
      await actualizarTarea(tarea.id, { completada: !tarea.completada });
      console.log('✅ Tarea actualizada, recargando lista...');
      recargarTareas();
    } catch (error) {
      console.error("❌ Error al actualizar tarea:", error);
      alert("Error al actualizar la tarea");
    }
  };

  const handleEliminar = async () => {
    if (window.confirm("¿Estás seguro de que quieres eliminar esta tarea?")) {
      try {
        await eliminarTarea(tarea.id);
        recargarTareas();
      } catch (error) {
        console.error("Error al eliminar tarea:", error);
        alert("Error al eliminar la tarea");
      }
    }
  };

  return (
    <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg hover:from-purple-50 hover:to-blue-50 transition-all duration-200 border border-gray-200 hover:border-purple-300 shadow-sm hover:shadow-md">
      <input
        type="checkbox"
        checked={tarea.completada}
        onChange={handleToggleCompletada}
        className="w-5 h-5 text-purple-600 rounded focus:ring-purple-500 cursor-pointer transition-transform hover:scale-110"
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
        className="px-4 py-2 text-red-500 hover:text-white hover:bg-red-500 rounded-lg font-medium transition-all duration-200 border border-red-300 hover:border-red-500 transform hover:scale-105 flex items-center gap-2"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
        Eliminar
      </button>
    </div>
  );
}

export default TaskItem;

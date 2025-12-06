import { actualizarTarea, eliminarTarea } from "../api/tareas";

function TaskItem({ tarea, recargarTareas }) {
  const handleToggleCompletada = async () => {
    try {
      await actualizarTarea(tarea.id, !tarea.completada);
      recargarTareas();
    } catch (error) {
      console.error("Error al actualizar tarea:", error);
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
    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
      <input
        type="checkbox"
        checked={tarea.completada}
        onChange={handleToggleCompletada}
        className="w-5 h-5 text-purple-600 rounded focus:ring-purple-500 cursor-pointer"
      />
      <span
        className={`flex-1 ${
          tarea.completada ? "line-through text-gray-400" : "text-gray-700"
        }`}
      >
        {tarea.texto}
      </span>
      <button
        onClick={handleEliminar}
        className="text-red-500 hover:text-red-700 font-medium transition-colors"
      >
        Eliminar
      </button>
    </div>
  );
}

export default TaskItem;

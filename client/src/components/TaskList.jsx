import TaskItem from "./TaskItem";

function TaskList({ tareas, recargarTareas }) {
  const tareasCompletadas = tareas.filter((t) => t.completada).length;
  const totalTareas = tareas.length;

  if (tareas.length === 0) {
    return (
      <div className="text-center py-16 animate-fade-in">
        <svg
          className="w-24 h-24 mx-auto text-gray-300 mb-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
        <p className="text-gray-400 text-xl font-medium">No hay tareas pendientes</p>
        <p className="text-gray-300 text-sm mt-2">¡Agrega tu primera tarea arriba! 🎯</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-purple-100">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <svg
            className="w-6 h-6 text-purple-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
            />
          </svg>
          Mis Tareas
        </h2>
        <div className="bg-gradient-to-r from-purple-100 to-blue-100 px-4 py-2 rounded-lg">
          <span className="text-sm font-semibold text-purple-700">
            {tareasCompletadas} / {totalTareas} completadas
          </span>
        </div>
      </div>
      <div className="space-y-3">
        {tareas.map((tarea, index) => (
          <div
            key={tarea.id}
            className="animate-slide-in"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <TaskItem tarea={tarea} recargarTareas={recargarTareas} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default TaskList;

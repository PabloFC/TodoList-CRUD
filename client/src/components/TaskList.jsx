import TaskItem from "./TaskItem";

function TaskList({ tareas, recargarTareas }) {
  if (tareas.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500 bg-white rounded-lg shadow-md">
        No hay tareas pendientes. ¡Agrega una!
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Mis Tareas</h2>
      <div className="space-y-2">
        {tareas.map((tarea) => (
          <TaskItem
            key={tarea.id}
            tarea={tarea}
            recargarTareas={recargarTareas}
          />
        ))}
      </div>
    </div>
  );
}

export default TaskList;

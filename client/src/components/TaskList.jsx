import TaskItem from "./TaskItem";

function TaskList() {
  // Datos de ejemplo (temporal)
  const tareasDePrueba = [
    { id: 1, texto: "Aprender React", completada: false },
    { id: 2, texto: "Construir una To-Do App", completada: true },
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Mis Tareas</h2>
      <div className="space-y-2">
        {tareasDePrueba.map((tarea) => (
          <TaskItem key={tarea.id} tarea={tarea} />
        ))}
      </div>
    </div>
  );
}

export default TaskList;

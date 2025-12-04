function TaskItem({ tarea }) {
  return (
    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
      <input
        type="checkbox"
        checked={tarea.completada}
        className="w-5 h-5 text-purple-600 rounded focus:ring-purple-500"
      />
      <span
        className={`flex-1 ${
          tarea.completada ? "line-through text-gray-400" : "text-gray-700"
        }`}
      >
        {tarea.texto}
      </span>
      <button className="text-red-500 hover:text-red-700 font-medium">
        Eliminar
      </button>
    </div>
  );
}

export default TaskItem;

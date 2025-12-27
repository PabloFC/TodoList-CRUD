function TaskStats({ tareas }) {
  const total = tareas.length;
  const completadas = tareas.filter(t => t.completada).length;
  const pendientes = total - completadas;
  const porcentaje = total > 0 ? Math.round((completadas / total) * 100) : 0;

  return (
    <div className="grid grid-cols-3 gap-4 mb-6">
      <div className="bg-white rounded-lg p-4 shadow-md border border-gray-100 text-center">
        <div className="text-3xl font-bold text-indigo-600">{total}</div>
        <div className="text-sm text-gray-500 mt-1">Total</div>
      </div>
      <div className="bg-white rounded-lg p-4 shadow-md border border-gray-100 text-center">
        <div className="text-3xl font-bold text-green-600">{completadas}</div>
        <div className="text-sm text-gray-500 mt-1">Completadas</div>
      </div>
      <div className="bg-white rounded-lg p-4 shadow-md border border-gray-100 text-center">
        <div className="text-3xl font-bold text-orange-600">{pendientes}</div>
        <div className="text-sm text-gray-500 mt-1">Pendientes</div>
      </div>
      {total > 0 && (
        <div className="col-span-3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg p-4 shadow-md text-white text-center">
          <div className="text-2xl font-bold">{porcentaje}%</div>
          <div className="text-sm mt-1">Progreso completado</div>
          <div className="w-full bg-white/30 rounded-full h-2 mt-3">
            <div 
              className="bg-white h-2 rounded-full transition-all duration-500"
              style={{ width: `${porcentaje}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default TaskStats;

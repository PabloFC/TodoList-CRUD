function TaskFilter({ filtro, setFiltro }) {
  const filtros = [
    { 
      id: 'todas', 
      label: 'Todas',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      )
    },
    { 
      id: 'pendientes', 
      label: 'Pendientes',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    { 
      id: 'completadas', 
      label: 'Completadas',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    }
  ];

  return (
    <div className="flex gap-2 mb-6 justify-center">
      {filtros.map(f => (
        <button
          key={f.id}
          onClick={() => setFiltro(f.id)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
            filtro === f.id
              ? 'bg-indigo-600 text-white shadow-md scale-105'
              : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
          }`}
        >
          {f.icon}
          {f.label}
        </button>
      ))}
    </div>
  );
}

export default TaskFilter;

import { AllIcon, DoneIcon, PendingIcon } from "./icons";

function TaskFilter({ filtro, setFiltro }) {
  const filtros = [
    {
      id: "todas",
      label: "Todas",
      icon: <AllIcon />,
    },
    {
      id: "pendientes",
      label: "Pendientes",
      icon: <PendingIcon />,
    },
    {
      id: "completadas",
      label: "Completadas",
      icon: <DoneIcon />,
    },
  ];

  return (
    <div className="flex gap-2 mb-6 justify-center">
      {filtros.map((f) => (
        <button
          key={f.id}
          onClick={() => setFiltro(f.id)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
            filtro === f.id
              ? "bg-indigo-600 text-white shadow-md scale-105"
              : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
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

import { useMemo, useState } from "react";
import Header from "./components/Header";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import TaskStats from "./components/TaskStats";
import TaskFilter from "./components/TaskFilter";
import { TareasProvider, useTareas } from "./context/TareasContext";

function App() {
  const [filtro, setFiltro] = useState("todas");
  const { tareas, cargando, error } = useTareas();

  const tareasFiltradas = useMemo(() => {
    return tareas.filter((tarea) => {
      if (filtro === "completadas") return tarea.completada;
      if (filtro === "pendientes") return !tarea.completada;
      return true;
    });
  }, [tareas, filtro]);

  const estadisticas = useMemo(() => {
    const total = tareas.length;
    const completadas = tareas.filter((tarea) => tarea.completada).length;
    const pendientes = total - completadas;
    const porcentaje = total > 0 ? Math.round((completadas / total) * 100) : 0;

    return { total, completadas, pendientes, porcentaje };
  }, [tareas]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <Header />
        <TaskStats estadisticas={estadisticas} />
        <TaskForm />
        <TaskFilter filtro={filtro} setFiltro={setFiltro} />
        {error ? (
          <div className="mb-6 rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-rose-700">
            {error}
          </div>
        ) : null}
        {cargando ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
            <p className="text-gray-500 mt-4">Cargando tareas...</p>
          </div>
        ) : (
          <TaskList tareas={tareasFiltradas} />
        )}
      </div>
    </div>
  );
}

export default function AppWithProvider() {
  return (
    <TareasProvider>
      <App />
    </TareasProvider>
  );
}

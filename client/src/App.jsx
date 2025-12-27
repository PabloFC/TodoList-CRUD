import { useState, useEffect } from "react";
import Header from "./components/Header";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import TaskStats from "./components/TaskStats";
import TaskFilter from "./components/TaskFilter";
import { obtenerTareas } from "./api/tareas";

function App() {
  const [tareas, setTareas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [filtro, setFiltro] = useState('todas');

  useEffect(() => {
    const cargarTareas = async () => {
      try {
        setCargando(true);
        const datos = await obtenerTareas();
        setTareas(datos);
      } catch (error) {
        console.error("Error al cargar tareas:", error);
      } finally {
        setCargando(false);
      }
    };

    cargarTareas();
  }, []);

  const recargarTareas = async () => {
    try {
      const datos = await obtenerTareas();
      setTareas(datos);
    } catch (error) {
      console.error("Error al recargar tareas:", error);
    }
  };

  const tareasFiltradas = tareas.filter(tarea => {
    if (filtro === 'completadas') return tarea.completada;
    if (filtro === 'pendientes') return !tarea.completada;
    return true;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <Header />
        <TaskStats tareas={tareas} />
        <TaskForm recargarTareas={recargarTareas} />
        <TaskFilter filtro={filtro} setFiltro={setFiltro} />
        {cargando ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
            <p className="text-gray-500 mt-4">Cargando tareas...</p>
          </div>
        ) : (
          <TaskList tareas={tareasFiltradas} recargarTareas={recargarTareas} />
        )}
      </div>
    </div>
  );
}

export default App;

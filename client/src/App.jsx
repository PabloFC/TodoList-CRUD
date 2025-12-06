import { useState, useEffect } from "react";
import Header from "./components/Header";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import { obtenerTareas } from "./api/tareas";

function App() {
  const [tareas, setTareas] = useState([]);
  const [cargando, setCargando] = useState(true);

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-50 to-pink-100">
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <Header />
        <TaskForm recargarTareas={recargarTareas} />
        {cargando ? (
          <div className="text-center py-8 text-gray-500">Cargando...</div>
        ) : (
          <TaskList tareas={tareas} recargarTareas={recargarTareas} />
        )}
      </div>
    </div>
  );
}

export default App;

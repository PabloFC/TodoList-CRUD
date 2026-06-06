import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  crearTarea,
  eliminarTarea,
  obtenerTareas,
  actualizarTarea,
} from "../api/tareas";

const TareasContext = createContext(null);

function mergeTaskList(previousTareas, tareaActualizada) {
  return previousTareas.map((tarea) =>
    tarea.id === tareaActualizada.id ? tareaActualizada : tarea,
  );
}

export function TareasProvider({ children }) {
  const [tareas, setTareas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  const cargarTareas = useCallback(async () => {
    try {
      setCargando(true);
      setError(null);
      const datos = await obtenerTareas();
      setTareas(datos);
    } catch (error) {
      console.error("Error al cargar tareas:", error);
      setError("No se pudieron cargar las tareas");
    } finally {
      setCargando(false);
    }
  }, []);

  useEffect(() => {
    cargarTareas();
  }, [cargarTareas]);

  const crearNuevaTarea = useCallback(async (texto) => {
    const textoNormalizado = texto.trim();

    if (!textoNormalizado) {
      throw new Error("El texto de la tarea es requerido");
    }

    const nuevaTarea = await crearTarea(textoNormalizado);
    setTareas((prevTareas) => [nuevaTarea, ...prevTareas]);
    return nuevaTarea;
  }, []);

  const alternarCompletada = useCallback(async (id, completada) => {
    const tareaActualizada = await actualizarTarea(id, { completada });
    setTareas((prevTareas) => mergeTaskList(prevTareas, tareaActualizada));
    return tareaActualizada;
  }, []);

  const borrarTarea = useCallback(async (id) => {
    await eliminarTarea(id);
    setTareas((prevTareas) => prevTareas.filter((tarea) => tarea.id !== id));
  }, []);

  const value = useMemo(
    () => ({
      tareas,
      cargando,
      error,
      cargarTareas,
      crearNuevaTarea,
      alternarCompletada,
      borrarTarea,
    }),
    [
      tareas,
      cargando,
      error,
      cargarTareas,
      crearNuevaTarea,
      alternarCompletada,
      borrarTarea,
    ],
  );

  return (
    <TareasContext.Provider value={value}>{children}</TareasContext.Provider>
  );
}

export function useTareas() {
  const context = useContext(TareasContext);

  if (!context) {
    throw new Error("useTareas debe usarse dentro de TareasProvider");
  }

  return context;
}

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const tareaMock = vi.hoisted(() => ({
  findAll: vi.fn(),
  create: vi.fn(),
  findByPk: vi.fn(),
}));

vi.mock("../models/Tarea.js", () => ({
  default: tareaMock,
}));

const controller = await import("../controllers/tareaController.js");

function createRes() {
  return {
    status: vi.fn().mockReturnThis(),
    json: vi.fn(),
  };
}

describe("Controladores de tareas", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("obtenerTareas consulta las tareas ordenadas por fecha descendente", async () => {
    const req = {};
    const res = createRes();
    const tareas = [
      { id: 2, texto: "Segunda" },
      { id: 1, texto: "Primera" },
    ];
    tareaMock.findAll.mockResolvedValue(tareas);

    await controller.obtenerTareas(req, res);

    expect(tareaMock.findAll).toHaveBeenCalledWith({
      order: [["createdAt", "DESC"]],
    });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(tareas);
  });

  it("crearTarea normaliza el texto antes de persistirlo", async () => {
    const req = { body: { texto: "  Comprar pan  " } };
    const res = createRes();
    const nuevaTarea = { id: 3, texto: "Comprar pan" };
    tareaMock.create.mockResolvedValue(nuevaTarea);

    await controller.crearTarea(req, res);

    expect(tareaMock.create).toHaveBeenCalledWith({ texto: "Comprar pan" });
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(nuevaTarea);
  });

  it("actualizarTarea marca una tarea como completada", async () => {
    const tarea = {
      id: 5,
      texto: "Hacer test",
      completada: false,
      update: vi.fn(async (datos) => {
        Object.assign(tarea, datos);
        return tarea;
      }),
    };
    tareaMock.findByPk.mockResolvedValue(tarea);
    const req = { params: { id: "5" }, body: { completada: "true" } };
    const res = createRes();

    await controller.actualizarTarea(req, res);

    expect(tareaMock.findByPk).toHaveBeenCalledWith("5");
    expect(tarea.update).toHaveBeenCalledWith({ completada: true });
    expect(tarea.completada).toBe(true);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(tarea);
  });

  it("actualizarTarea lanza 404 si la tarea no existe", async () => {
    tareaMock.findByPk.mockResolvedValue(null);
    const req = { params: { id: "99" }, body: { completada: true } };
    const res = createRes();

    await expect(controller.actualizarTarea(req, res)).rejects.toMatchObject({
      message: "Tarea no encontrada",
      status: 404,
    });
  });

  it("eliminarTarea borra una tarea existente", async () => {
    const tarea = {
      id: 8,
      destroy: vi.fn(async () => undefined),
    };
    tareaMock.findByPk.mockResolvedValue(tarea);
    const req = { params: { id: "8" } };
    const res = createRes();

    await controller.eliminarTarea(req, res);

    expect(tareaMock.findByPk).toHaveBeenCalledWith("8");
    expect(tarea.destroy).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      mensaje: "Tarea eliminada correctamente",
    });
  });

  it("eliminarTarea lanza 404 si la tarea no existe", async () => {
    tareaMock.findByPk.mockResolvedValue(null);
    const req = { params: { id: "404" } };
    const res = createRes();

    await expect(controller.eliminarTarea(req, res)).rejects.toMatchObject({
      message: "Tarea no encontrada",
      status: 404,
    });
  });
});

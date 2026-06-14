import express from "express";
import request from "supertest";
import { beforeEach, describe, expect, it, vi } from "vitest";

const controllerMocks = vi.hoisted(() => ({
  obtenerTareas: vi.fn((req, res) =>
    res.status(200).json([{ id: 1, texto: "Tarea 1" }]),
  ),
  crearTarea: vi.fn((req, res) =>
    res.status(201).json({ id: 2, texto: req.body.texto }),
  ),
  actualizarTarea: vi.fn((req, res) =>
    res
      .status(200)
      .json({ id: Number(req.params.id), completada: req.body.completada }),
  ),
  eliminarTarea: vi.fn((req, res) =>
    res.status(200).json({ mensaje: "Tarea eliminada correctamente" }),
  ),
}));

vi.mock("../controllers/tareaController.js", () => controllerMocks);

const { default: tareaRoutes } = await import("../routes/tareaRoutes.js");

function buildApp() {
  const app = express();
  app.use(express.json());
  app.use("/api/tareas", tareaRoutes);
  return app;
}

describe("Rutas de tareas", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("GET /api/tareas responde con la lista de tareas", async () => {
    const app = buildApp();

    const response = await request(app).get("/api/tareas");

    expect(response.status).toBe(200);
    expect(response.body).toEqual([{ id: 1, texto: "Tarea 1" }]);
    expect(controllerMocks.obtenerTareas).toHaveBeenCalledTimes(1);
  });

  it("POST /api/tareas recorta el texto antes de llegar al controlador", async () => {
    const app = buildApp();

    const response = await request(app)
      .post("/api/tareas")
      .send({ texto: "  Comprar pan  " });

    expect(response.status).toBe(201);
    expect(response.body).toEqual({ id: 2, texto: "Comprar pan" });
    expect(controllerMocks.crearTarea).toHaveBeenCalledTimes(1);
    expect(controllerMocks.crearTarea.mock.calls[0][0].body.texto).toBe(
      "Comprar pan",
    );
  });

  it("POST /api/tareas rechaza texto vacío", async () => {
    const app = buildApp();

    const response = await request(app)
      .post("/api/tareas")
      .send({ texto: "   " });

    expect(response.status).toBe(400);
    expect(response.body.errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          msg: "El texto de la tarea es requerido",
          param: "texto",
        }),
      ]),
    );
    expect(controllerMocks.crearTarea).not.toHaveBeenCalled();
  });

  it("POST /api/tareas rechaza textos de más de 100 caracteres", async () => {
    const app = buildApp();
    const textoLargo = "a".repeat(101);

    const response = await request(app)
      .post("/api/tareas")
      .send({ texto: textoLargo });

    expect(response.status).toBe(400);
    expect(response.body.errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          msg: "El texto no puede tener más de 100 caracteres",
          param: "texto",
        }),
      ]),
    );
    expect(controllerMocks.crearTarea).not.toHaveBeenCalled();
  });

  it("PUT /api/tareas/:id acepta una actualización válida", async () => {
    const app = buildApp();

    const response = await request(app)
      .put("/api/tareas/7")
      .send({ completada: true });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ id: 7, completada: true });
    expect(controllerMocks.actualizarTarea).toHaveBeenCalledTimes(1);
  });

  it("PUT /api/tareas/:id rechaza valores inválidos", async () => {
    const app = buildApp();

    const response = await request(app)
      .put("/api/tareas/7")
      .send({ completada: "si" });

    expect(response.status).toBe(400);
    expect(response.body.errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          msg: "El campo completada debe ser booleano",
          param: "completada",
        }),
      ]),
    );
    expect(controllerMocks.actualizarTarea).not.toHaveBeenCalled();
  });

  it("DELETE /api/tareas/:id acepta un id válido", async () => {
    const app = buildApp();

    const response = await request(app).delete("/api/tareas/9");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ mensaje: "Tarea eliminada correctamente" });
    expect(controllerMocks.eliminarTarea).toHaveBeenCalledTimes(1);
  });

  it("DELETE /api/tareas/:id rechaza ids no numéricos", async () => {
    const app = buildApp();

    const response = await request(app).delete("/api/tareas/abc");

    expect(response.status).toBe(400);
    expect(response.body.errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          msg: "ID inválido",
          param: "id",
        }),
      ]),
    );
    expect(controllerMocks.eliminarTarea).not.toHaveBeenCalled();
  });
});

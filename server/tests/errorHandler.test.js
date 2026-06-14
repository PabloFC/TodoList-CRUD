import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import errorHandler from "../middleware/errorHandler.js";

function createRes() {
  return {
    status: vi.fn().mockReturnThis(),
    json: vi.fn(),
  };
}

describe("errorHandler", () => {
  const originalNodeEnv = process.env.NODE_ENV;

  beforeEach(() => {
    process.env.NODE_ENV = "development";
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    process.env.NODE_ENV = originalNodeEnv;
    vi.restoreAllMocks();
  });

  it("devuelve stack en desarrollo", () => {
    const err = new Error("Fallo controlado");
    err.status = 418;
    const res = createRes();

    errorHandler(err, {}, res, () => {});

    expect(res.status).toHaveBeenCalledWith(418);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        error: "Fallo controlado",
        stack: expect.any(String),
      }),
    );
  });

  it("oculta el stack en producción", () => {
    process.env.NODE_ENV = "production";
    const err = new Error("Fallo controlado");
    err.status = 500;
    const res = createRes();

    errorHandler(err, {}, res, () => {});

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Fallo controlado" });
  });
});

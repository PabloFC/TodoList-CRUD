export default function errorHandler(err, req, res, next) {
  console.error(err);

  // Default to 500 if status not provided
  const status = err.status || 500;
  const message = err.message || "Internal Server Error";

  // In production avoid leaking stack
  const response = { error: message };
  if (process.env.NODE_ENV !== "production") {
    response.stack = err.stack;
  }

  res.status(status).json(response);
}

export function notFound(req, res) {
  res.status(404).json({ message: `Route not found: ${req.method} ${req.originalUrl}` });
}

export function errorHandler(error, req, res, next) { // eslint-disable-line no-unused-vars
  console.error(error);
  if (error.code === 11000) return res.status(409).json({ message: "An account with this email already exists." });
  if (error.name === "ValidationError") return res.status(400).json({ message: error.message });
  return res.status(500).json({ message: error.message || "Something went wrong on the server." });
}

export default (err, req, res, next) => {
  const status = err.status;
  const message = err.message || "Internal Server Error";
  res.status(status).json({ message });
};
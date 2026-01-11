export default (err, req, res, next) => {
  console.error(err);
  const status = err.status;
  const message = err.message || "Internal Server Error";
  res.status(status).json({ message });
};

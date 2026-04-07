export const globalErrorHandler = (err, req, res, next) => {
  // console.error("🔥 ERROR:", err);
  const statusCode = err.statusCode || 500;
  return res.status(statusCode).json({
    status: statusCode,
    message: err.message,
  });
};

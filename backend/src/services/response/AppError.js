class AppError extends Error {
  constructor(errCode, message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.errCode = errCode;
  }
}

module.exports = AppError;

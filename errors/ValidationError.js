class ValidationError extends Error {
  constructor(errors = [], message = "Validation error") {
    super(message);
    this.status = 400;
    this.name = "ValidationError";
    this.errors = errors;
  }
}

module.exports = ValidationError;
/**
 * Custom application error class.
 * Carries an HTTP-friendly statusCode so routers can respond consistently.
 */
class AppError extends Error {
  /**
   * @param {string}  message    – human-readable description
   * @param {number}  statusCode – HTTP status code (default 500)
   * @param {string}  code       – machine-readable error code
   */
  constructor(message, statusCode = 500, code = "INTERNAL_ERROR") {
    super(message);
    this.name = "AppError";
    this.statusCode = statusCode;
    this.code = code;
  }
}

/**
 * Maps common PostgreSQL error codes to meaningful AppError instances.
 * Reference: https://www.postgresql.org/docs/current/errcodes-appendix.html
 */
function mapPgError(err) {
  const pgCode = err.code; // PostgreSQL error code string, e.g. "23505"

  switch (pgCode) {
    // Unique-violation
    case "23505":
      return new AppError(
        `Duplicate entry: ${err.detail || err.message}`,
        409,
        "DUPLICATE_ENTRY"
      );

    // Foreign-key violation
    case "23503":
      return new AppError(
        `Referenced record not found: ${err.detail || err.message}`,
        400,
        "FK_VIOLATION"
      );

    // Not-null violation
    case "23502":
      return new AppError(
        `Missing required field: ${err.column || err.message}`,
        400,
        "NOT_NULL_VIOLATION"
      );

    // Invalid text representation (bad UUID, wrong type, etc.)
    case "22P02":
      return new AppError(
        `Invalid input value: ${err.message}`,
        400,
        "INVALID_INPUT"
      );

    // Connection errors
    case "08006": // connection_failure
    case "08001": // sqlclient_unable_to_establish_sqlconnection
    case "08004": // sqlserver_rejected_establishment_of_sqlconnection
    case "57P01": // admin_shutdown
      return new AppError(
        "Database connection error. Please try again later.",
        503,
        "DB_CONNECTION_ERROR"
      );

    default:
      return new AppError(
        `Database error: ${err.message}`,
        500,
        "DB_ERROR"
      );
  }
}

module.exports = { AppError, mapPgError };

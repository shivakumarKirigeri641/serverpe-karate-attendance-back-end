const { AppError } = require("../utils/AppError");

/**
 * Validates the karate branches request.
 * @param {object} req - Express request object with student_id attached by middleware
 * @throws {AppError} if student_id is missing, invalid type, or out of range
 */
exports.validateKarateBranchesRequest = async (req) => {
  const { student_id } = req;

  /* ── Check existence ── */
  if (student_id === undefined || student_id === null) {
    throw new AppError("student_id is required.", 400, "MISSING_PARAM");
  }

  /* ── Check type (must be a number) ── */
  if (typeof student_id !== "number") {
    throw new AppError(
      "student_id must be a number.",
      400,
      "INVALID_TYPE"
    );
  }

  /* ── Check if it's an integer (no decimals) ── */
  if (!Number.isInteger(student_id)) {
    throw new AppError(
      "student_id must be an integer.",
      400,
      "INVALID_FORMAT"
    );
  }

  /* ── Check range (positive integer within reasonable bounds) ── */
  if (student_id < 1 || student_id > 999) {
    throw new AppError(
      "Invalid student_id.",
      400,
      "OUT_OF_RANGE"
    );
  }
};
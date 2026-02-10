const { connectKarateAttendanceDb } = require("../database/connectDB");
const { AppError, mapPgError } = require("../utils/AppError");

/**
 * Fetch all karate branches associated with a student.
 * @param {number|string} studentId – the student's unique ID
 * @returns {Promise<Array>} list of branch rows (may be empty)
 */
exports.getKarateBranches = async (studentId) => {
  /* ── Input validation ── */
  if (studentId === undefined || studentId === null) {
    throw new AppError("studentId is required.", 400, "MISSING_PARAM");
  }

  const query = `
    SELECT o.org_name, o.description1, o.description2, b.*
      FROM karate_branch b
      JOIN karate_org       o ON b.fk_karate_org  = o.id
      JOIN karate_students  s ON s.fk_karate_org  = o.id
     WHERE s.student_id = $1
     ORDER BY b.branch_name`;

  try {
    const pool = connectKarateAttendanceDb();
    const { rows } = await pool.query({ text: query, values: [studentId] });
    return rows.length > 0 ? rows : [];
  } catch (err) {
    console.error("PG ERROR:", err);
    throw mapPgError(err); // 🔥 convert to AppError
  }
};
/**
 * Fetch all karate branches associated with a student.
 * @param {number|string} studentId – the student's unique ID
 * @returns {Promise<Array>} list of branch rows (may be empty)
 */
exports.createKarateAttendance = async () => {
  const query = `
    SELECT o.org_name, o.description1, o.description2, b.*
      FROM karate_branch b
      JOIN karate_org       o ON b.fk_karate_org  = o.id
      JOIN karate_students  s ON s.fk_karate_org  = o.id
     WHERE s.student_id = $1
     ORDER BY b.branch_name`;

  try {
    const pool = connectKarateAttendanceDb();
    const { rows } = await pool.query({ text: query, values: [studentId] });
    return rows.length > 0 ? rows : [];
  } catch (err) {
    console.error("PG ERROR:", err);
    throw mapPgError(err); // 🔥 convert to AppError
  }
};
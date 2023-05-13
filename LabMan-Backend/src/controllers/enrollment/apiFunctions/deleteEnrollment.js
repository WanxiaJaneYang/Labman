import pool from "../../../utils/MySQL/db.js";
import errorMessages from "../../../utils/constants/errorMessages.js";
import { checkEnrollmentExists } from "../helperFunctions/checkEnrollmentExists.js";

async function deleteEnrollment(req, res) {
	const { course_id,student_ids } = req.params;
	//console.log(student_ids);
	try {
		const deletionPromises = student_ids.map(async (student_id) => {
			await checkEnrollmentExists(pool, course_id, student_id);
			const query = "DELETE FROM enrollment WHERE course_id = ? AND student_id = ?";
			const params = [course_id, student_id];
			await pool.query(query, params);
		});

		await Promise.all(deletionPromises);

		return res.status(200).json({ message: "Enrollments are deleted successfully" });
	} catch (error) {
		console.error(error);
		if (Object.values(errorMessages).includes(error.message)) {
			return res.status(400).json({ error: "Bad request: " + error.message });
		}
		return res.status(500).json({ error: "Internal error: " + error.message });
	}
}

// For recall module
export { deleteEnrollment };

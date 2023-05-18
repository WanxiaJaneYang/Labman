import pool from "../../../utils/MySQL/db.js";
import errorMessages from "../../../utils/constants/errorMessages.js";
import { checkEnrollmentDuplicate } from "../helperFunctions/checkEnrollmentDuplicate.js";
import { checkCourseExists } from "../../course/helperFunctions/checkCourseExists.js";
import { checkUserExists } from "../../users/helperFunctions/checkUserExists.js";

async function newEnrollmentBatch(req, res) {
	const { course_id } = req.params;
	const { student_id } = req.body;

	try {
		for (const id of student_id) {
			await checkUserExists(pool, id);
			await checkCourseExists(pool, course_id);
			await checkEnrollmentDuplicate(pool, course_id, id);

			const query = "INSERT INTO enrollment (course_id, student_id) VALUES (?, ?)";
			const params = [course_id, id];
			await pool.query(query, params);
		};

		return res.status(201).json({ message: "Bulk enrollments are created successfully" });
	} catch (error) {
		console.error(error);
		if (Object.values(errorMessages).includes(error.message)) {
			return res.status(400).json({ error: "Bad request: " + error.message });
		}
		return res.status(500).json({ error: "Internal error: " + error.message });
	}
}

export { newEnrollmentBatch };

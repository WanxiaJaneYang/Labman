import pool from "../../../utils/MySQL/db.js";
import errorMessages from "../../../utils/constants/errorMessages.js";
import { checkEnrollmentDuplicate } from "../helperFunctions/checkEnrollmentDuplicate.js";

async function newEnrollment(req, res) {
	const { course_id, student_ids } = req.body;

	try {
		await checkEnrollmentDuplicate(pool, course_id);

		const enrollmentPromises = student_ids.map((student_id) => {
			const query = "INSERT INTO enrollment (course_id, student_id) VALUES (?, ?)";
			const params = [course_id, student_id];
			return pool.query(query, params);
		});

		await Promise.all(enrollmentPromises);

		return res.status(201).json({ message: "Enrollments created successfully" });
	} catch (error) {
		console.error(error);
		if (Object.values(errorMessages).includes(error.message)) {
			return res.status(400).json({ error: "Bad request: " + error.message });
		}
		return res.status(500).json({ error: "Internal error: " + error.message });
	}
}

// For recall module
export { newEnrollment };

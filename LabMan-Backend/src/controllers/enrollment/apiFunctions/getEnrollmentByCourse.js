import pool from "../../../utils/MySQL/db.js";
import errorMessages from "../../../utils/constants/errorMessages.js";
import { checkCourseExists } from "../../course/helperFunctions/checkCourseExists.js";

async function getEnrollmentByCourse(req, res) {
	const { course_id } = req.query;

	try {
		await checkCourseExists(pool, course_id);

		const query = "SELECT * FROM enrollment WHERE course_id = ?";
		const params = [course_id];

		const [results] = await pool.query(query, params);
		//404 error if no enrollment found
		if (results.length === 0) {
			res.status(404).json({error:errorMessages.ENROLLMENT_NOT_FOUND});
		}

		return res.status(200).json(results);
	} catch (error) {
		console.error(error);
		if (Object.values(errorMessages).includes(error.message)) {
			return res.status(404).json({ error: "Bad request: "+error.message });
		}
		return res.status(500).json({ error: "Internal error: " +error.message });
	}
}

export { getEnrollmentByCourse };
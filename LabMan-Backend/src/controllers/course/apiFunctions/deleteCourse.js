import pool from "../../../utils/MySQL/db.js";
import errorMessages from "../../../utils/constants/errorMessages.js";
import { getCoursebyId } from "../helperFunctions/getCoursebyId.js";

async function deleteCourse(req, res) {
	const { course_id } = req.params;

	try {
		await getCoursebyId(pool, course_id);

		const query = "DELETE FROM course WHERE course_id = ?";
		const params = [course_id];
		await pool.query(query, params);

		return res.status(200).json({ message: "Course deleted successfully" });
	} catch (error) {
		console.error(error);
		if (Object.values(errorMessages).includes(error.message)) {
			return res.status(404).json({ error: "Bad request: " + error.message });
		}
		return res.status(500).json({ error: "Internal error: " + error.message });
	}
}

export { deleteCourse };

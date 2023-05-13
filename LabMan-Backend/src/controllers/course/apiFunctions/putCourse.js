import pool from "../../../utils/MySQL/db.js";
import errorMessages from "../../../utils/constants/errorMessages.js";
import moment from "moment";
import { getCoursebyId } from "../helperFunctions/getCoursebyId.js";

async function updateCourse(req, res) {
	const { course_id } = req.params;
	const { course_name, coordinator_name, due_date } = req.body;

	const last_edit_time = moment().format("YYYY-MM-DD HH:mm:ss");

	try {
		await getCoursebyId(pool, course_id);

		const query = "UPDATE course SET course_name = ?, coordinator_name = ?, due_date = ?, last_edit_time = ? WHERE course_id = ?";
		const params = [course_name, coordinator_name, due_date, last_edit_time, course_id];
		await pool.query(query, params);

		return res.status(200).json({ message: "Course updated successfully" });
	} catch (error) {
		console.error(error);
		if (Object.values(errorMessages).includes(error.message)) {
			return res.status(404).json({ error: "Bad request: " + error.message });
		}
		return res.status(500).json({ error: "Internal error: " + error.message });
	}
}

export { updateCourse };

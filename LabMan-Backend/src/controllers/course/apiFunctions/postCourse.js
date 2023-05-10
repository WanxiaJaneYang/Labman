import pool from "../../../utils/MySQL/db.js";
import errorMessages from "../../../utils/constants/errorMessages.js";
import { checkCourseDuplicate } from "../helperFunctions/checkCourseDuplicate.js";
import moment from "moment";

async function newCourse(req, res) {
	const { course_id, course_name, coordinator_name,due_date } = req.body;
	const added_time = moment().format("YYYY-MM-DD HH:mm:ss");

	try {
		await checkCourseDuplicate(pool, course_id);;
		const query = "INSERT INTO course (course_id, course_name, coordinator_name, due_date,last_edit_time) VALUES (?, ?, ?,?,?)";
		const params = [course_id, course_name, coordinator_name,due_date,added_time];
		await pool.query(query, params);

		return res.status(201).json({ message: "Course created successfully" });
	} catch (error) {
		console.error(error);
		if (Object.values(errorMessages).includes(error.message)) {
			return res.status(404).json({ error: "Bad request: "+error.message });
		}
		return res.status(500).json({ error: "Internal error: "+error.message });
	}
}

//For recall module
export { newCourse };

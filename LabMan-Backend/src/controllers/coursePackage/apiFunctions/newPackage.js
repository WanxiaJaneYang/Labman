import pool from "../../../utils/MySQL/db.js";
import errorMessages from "../../../utils/constants/errorMessages.js";
import { checkPackageDuplicate } from "../helperFunctions/checkPackageDuplicate.js";
import moment from "moment";

async function newPackage(req, res) {
	const { course_id } = req.params;
	const { package_name } = req.body;
	const added_time = moment().format("YYYY-MM-DD HH:mm:ss");

	try {
		await checkPackageDuplicate(pool, package_name);

		const query = "INSERT INTO course_package (course_id, package_name, last_edit_time) VALUES (?, ?,?)";
		const params = [course_id, package_name, added_time];
		await pool.query(query, params);

		return res.status(201).json({ message: "Course package created successfully" });
	} catch (error) {
		console.error(error);
		if (Object.values(errorMessages).includes(error.message)) {
			return res.status(400).json({ error: "Bad request: " + error.message });
		}
		return res.status(500).json({ error: "Internal error: " + error.message });
	}
}

// For recall module
export { newPackage };

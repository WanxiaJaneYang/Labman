import pool from "../../../utils/MySQL/db.js";
import errorMessages from "../../../utils/constants/errorMessages.js";
import {checkUserExists} from "../helperFunctions/checkUserExists.js";

async function getUser(req,res) {
	try {
		const [results] = await pool.query("SELECT * FROM students_user");
		return res.status(200).json(results);
	} catch (error) {
		console.error(error);
		return res.status(500).json({ error: "Error retrieving users: "+error.message });
	}
}

async function getUserByStudentID(req, res) {
	const student_id = req.params.student_id;

	try {
		const [results] = await checkUserExists(pool,student_id);

		if (results.length === 0) {
			throw new Error(errorMessages.USER_NOT_FOUND);
		}

		return res.status(200).json(results);
	} catch (error) {
		console.error(error);
		if (Object.values(errorMessages).includes(error.message)) {
			return res.status(400).json({ error: "Bad request: "+error.message });
		}
		return res.status(500).json({ error: "Internal error: "+error.message });
	}
}

export { getUser, getUserByStudentID };

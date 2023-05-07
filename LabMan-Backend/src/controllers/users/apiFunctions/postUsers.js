import pool from "../../../utils/MySQL/db.js";
import { checkUserDuplicate } from "../helperFunctions/checkUserDuplicate.js";

async function newUser(req, res) {
	const { student_id, email, password } = req.body;

	try {
		await checkUserDuplicate(pool, student_id);;
		const query = "INSERT INTO students_user (student_id, email, password) VALUES (?, ?, ?)";
		const params = [student_id, email, password];
		await pool.query(query, params);

		return res.status(201).json({ message: "User created successfully" });
	} catch (error) {
		console.error(error);
		if (Object.values(errorMessages).includes(error.message)) {
			return res.status(404).json({ error: "Bad request: "+error.message });
		}
		return res.status(500).json({ error: "Internal error: "+error.message });
	}
}

//For recall module
export { newUser };

import pool from "../../utils/MySQL/db.js";

async function getUser(res) {
	try {
		const [results] = await pool.promise().query("SELECT * FROM students_user");
		return res.status(200).json(results);
	} catch (error) {
		console.error(error);
		return res.status(500).json({ error: "Error retrieving users" });
	}
}

async function getUserByStudentID(req, res) {
	const student_id = req.params.student_id;

	try {
		const [results] = await pool.promise().query("SELECT student_id, email FROM students_user WHERE student_id = ?", [student_id]);

		if (results.length === 0) {
			return res.status(404).json({ error: "User not found" });
		}

		return res.status(200).json(results);
	} catch (error) {
		console.error(error);
		return res.status(500).json({ error: "Error retrieving user" });
	}
}

export { getUser, getUserByStudentID };

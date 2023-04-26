import pool from "../../utils/MySQL/db.js";

function getUser(req, res) {
	pool.query("SELECT * FROM students_user", (err, results) => {
		if (err) {
			return res.status(500).json({ error: "Error retrieving users" });
		}
		return res.status(200).json(results);
	});
}

function getUserByStudentID(req, res) {
	const  student_id  = req.params.student_id;
	pool.query("SELECT student_id, email FROM students_user WHERE student_id = ?", [student_id], (err, results) => {
		if (err) {
			return res.status(500).json({ error: "Error retrieving user" });
		}
		if (results.length === 0) {
			return res.status(404).json({ error: "User not found" });
		}
		return res.status(200).json(results);
	});
}

export { getUser, getUserByStudentID};

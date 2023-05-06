import pool from "../../utils/MySQL/db.js";

async function deleteUser(req, res) {
	const student_id = req.params.student_id;

	try {
		const query = "DELETE FROM students_user WHERE student_id = ?";
		const params = [student_id];

		const [results] = await pool.promise().query(query, params);

		if (results.affectedRows === 0) {
			return res.status(404).json({ error: "User not found" });
		}

		return res.status(200).json({ message: "User deleted successfully" });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ error: "Error deleting user" });
	}
}

export { deleteUser };

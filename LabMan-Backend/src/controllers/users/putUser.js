import pool from "../../utils/MySQL/db.js";

async function updateUser(req, res) {
	const { student_id } = req.params;
	const { email } = req.body;

	try {
		const query = "UPDATE students_user SET email = ? WHERE student_id = ?";
		const params = [email, student_id];

		const [results] = await pool.promise().query(query, params);

		if (results.affectedRows === 0) {
			return res.status(404).json({ error: "User not found" });
		}

		return res.status(200).json({ message: "User updated successfully" });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ error: "Error updating user" });
	}
}

export { updateUser };
import pool from "../../../utils/MySQL/db.js";
import errorMessages from "../../../utils/constants/errorMessages.js";

async function updateUser(req, res) {
	const { student_id } = req.params;
	const { email } = req.body;

	try {
		const query = "UPDATE students_user SET email = ? WHERE student_id = ?";
		const params = [email, student_id];

		const [results] = await pool.query(query, params);

		if (results.affectedRows === 0) {
			throw new Error(errorMessages.USER_NOT_FOUND);
		}

		return res.status(200).json({ message: "User updated successfully" });
	} catch (error) {
		console.error(error);
		if (Object.values(errorMessages).includes(error.message)) {
			return res.status(404).json({ error: error.message });
		}
		return res.status(500).json({ error: "Error updating user: "+error.message });
	}
}

export { updateUser };
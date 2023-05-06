import pool from "../../../utils/MySQL/db.js";
import errorMessages from "../../../utils/constants/errorMessages.js";

async function deleteUser(req, res) {
	const student_id = req.params.student_id;

	try {
		const query = "DELETE FROM students_user WHERE student_id = ?";
		const params = [student_id];

		const [results] = await pool.query(query, params);

		if (results.affectedRows === 0) {
			throw new Error(errorMessages.USER_NOT_FOUND);
		}

		return res.status(200).json({ message: "User deleted successfully" });
	} catch (error) {
		console.error(error);
		if (Object.values(errorMessages).includes(error.message)) {
			return res.status(404).json({ error: error.message });
		}
		return res.status(500).json({ error: "Error deleting user" });
	}
}

export { deleteUser };

import pool from "../../../utils/MySQL/db.js";
import errorMessages from "../../../utils/constants/errorMessages.js";
import { checkUserExists } from "../helperFunctions/checkUserExists.js";

async function deleteUser(req, res) {
	try {
		const student_id = req.params.student_id;
		await checkUserExists(pool, student_id);

		const query = "DELETE FROM students_user WHERE student_id = ?";
		const params = [student_id];
		await pool.query(query, params);

		return res.status(200).json({ message: "User deleted successfully" });
	} catch (error) {
		console.error(error);
		if (Object.values(errorMessages).includes(error.message)) {
			return res.status(404).json({ error: "Bad request: "+error.message });
		}
		return res.status(500).json({ error: "Internal error: "+error.message });
	}
}

export { deleteUser };

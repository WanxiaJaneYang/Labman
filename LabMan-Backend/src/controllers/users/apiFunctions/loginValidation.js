import pool from "../../../utils/MySQL/db.js";
import errorMessages from "../../../utils/constants/errorMessages.js";
import { checkUserExists } from "../helperFunctions/checkUserExists.js";
export async function loginValidation(req, res) {
	try {
		const student_id = req.params.student_id;
		const password = req.body.password;
        
		await checkUserExists(pool, student_id);

		const query = "SELECT password FROM students_user WHERE student_id = ?";
		const [result] = await pool.query(query, [student_id]);
		// console.log(result[0]);
		if (result[0].password === password) {
			return res.status(200).json({ message: "User logged in successfully" });
		}
	} catch (error) {
		if (Object.values(errorMessages).includes(error.message)) {
			return res.status(404).json({ message: error.message });
		}
		return res.status(500).json({ error: "incorrect password" });
	}
}
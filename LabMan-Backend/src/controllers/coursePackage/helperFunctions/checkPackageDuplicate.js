import errorMessages from "../../../utils/constants/errorMessages.js";

export async function checkPackageDuplicate(connection, course_id, student_id) {
	const query = "SELECT * FROM enrollment WHERE course_id = ? AND student_id = ?";
	try {
		const [result] = await connection.query(query, [course_id, student_id]);
		if (result.length) {
			throw new Error(errorMessages.DUPLICATE_ENROLLMENT);
		}
		return result[0];
	} catch (error) {
		if (Object.values(errorMessages).includes(error.message)) {
			throw new Error(error.message);
		}
		throw new Error("Failed checking if duplicate enrollment: " + error.message);
	}
}

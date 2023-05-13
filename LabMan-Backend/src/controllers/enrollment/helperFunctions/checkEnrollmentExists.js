import errorMessages from "../../../utils/constants/errorMessages.js";

export async function checkEnrollmentExists(connection, course_id, student_id) {
	const getEnrollQuery = "SELECT * FROM enrollment WHERE course_id = ? AND student_id = ?";
	try {
		const [result] = await connection.query(getEnrollQuery, [course_id, student_id]);
		if (result.length === 0) {
			throw new Error(errorMessages.ENROLLMENT_DOESNOT_EXIST);
		}
		return result[0];
	} catch (error) {
		if (Object.values(errorMessages).includes(error.message)) {
			throw new Error(error.message);
		}
		throw new Error("Failed checking if enrollment exists: " + error.message);
	}
}

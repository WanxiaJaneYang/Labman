import errorMessages from "../../../utils/constants/errorMessages.js";

export async function checkUserDuplicate(connection, student_id) {
	const getUserQuery = "SELECT * FROM students_user WHERE student_id = ?";
	try {
		const [result] = await connection.query(getUserQuery, [student_id]);
		if (!result.length) {
			throw new Error(errorMessages.DUPLICATE_USER);
		}
		return result[0];
	} catch (error) {
		if (Object.values(errorMessages).includes(error.message)) {
			throw new Error(error.message);
		}
		throw new Error("Failed checking if student exists: "+error.message);
	}	
}
import errorMessages from "../../../utils/constants/errorMessages.js";

export async function checkUserExists(connection, student_id) {
	const getUserQuery = "SELECT * FROM students_user WHERE student_id = ?";
	try {
		const [result] = await connection.query(getUserQuery, [student_id]);
		if (result.length === 0) {
			throw new Error(errorMessages.USER_NOT_FOUND);
		}
		return result[0];
	} catch (error) {
		if (Object.values(errorMessages).includes(error.message)) {
			throw new Error("Bad request "+error.message);
		}
		throw new Error("Internal error when checking if student exists: "+error.message);
	}	
}
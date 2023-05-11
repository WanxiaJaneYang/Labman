import errorMessages from "../../../utils/constants/errorMessages.js";

export async function checkCourseExists(connection, course_id) {
	const getCourseQuery = "SELECT * FROM course WHERE course_id = ?";
	try {
		const [result] = await connection.query(getCourseQuery, [course_id]);
		if (result.length === 0) {
			throw new Error(errorMessages.COURSE_DOESNOT_EXIST);
		}
		return result[0];
	} catch (error) {
		if (Object.values(errorMessages).includes(error.message)) {
			throw new Error(error.message);
		}
		throw new Error("Failed checking if course exists: "+error.message);
	}	
}
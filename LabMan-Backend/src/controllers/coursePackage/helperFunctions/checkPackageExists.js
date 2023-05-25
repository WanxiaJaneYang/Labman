import errorMessages from "../../../utils/constants/errorMessages.js";

export async function checkPackageExists(connection, package_id) {
	const query = "SELECT * FROM course_package WHERE package_id = ? ";
	try {
		const [result] = await connection.query(query, [package_id]);
		if (result.length === 0) {
			throw new Error(errorMessages.PACKAGE_DOESNOT_EXIST);
		}
		return result[0];
	} catch (error) {
		if (Object.values(errorMessages).includes(error.message)) {
			throw new Error(error.message);
		}
		throw new Error("Failed checking if enrollment exists: " + error.message);
	}
}

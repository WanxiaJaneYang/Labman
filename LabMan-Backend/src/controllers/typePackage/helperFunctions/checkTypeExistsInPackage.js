
import errorMessages from "../../../utils/constants/errorMessages.js";

export async function checkTypeExistsInPackage(connection, package_id, type_id) {
	try {
		const query = "SELECT * FROM type_package WHERE package_id = ? AND type_id = ?";
		const [result] = await connection.query(query, [package_id, type_id]);
		if (result.length === 0) {
			throw new Error(errorMessages.TPYE_IN_PACKAGE_NOT_FOUND);
		}
		return result[0];
	} catch (error) {
		if (Object.values(errorMessages).includes(error.message)) {
			throw new Error(error.message);
		}
		throw new Error("Failed checking if type exists in package: " + error.message);
	}
}

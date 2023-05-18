import errorMessages from "../../../utils/constants/errorMessages.js";

export async function checkTypeInPackageDuplicate(connection,package_id, type_id) {
	const query = "SELECT * FROM type_package WHERE package_id = ? AND type_id = ?";
	try {
		const [result] = await connection.query(query, [package_id, type_id]);
		if (result.length) {
			throw new Error(errorMessages.DUPLICATE_TYPE_IN_PACKAGE);
		}
		return result[0];
	} catch (error) {
		if (Object.values(errorMessages).includes(error.message)) {
			throw new Error(error.message);
		}
		throw new Error("Failed checking if duplicate enrollment: " + error.message);
	}
}

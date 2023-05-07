import errorMessages from "../../../utils/constants/errorMessages.js";

export async function getRequestById(connection, request_id) {
	const getRequestQuery = "SELECT * FROM requests WHERE request_id = ?";
	try {
		const [result] = await connection.query(getRequestQuery, [request_id]);
		if (result.length === 0) {
			throw new Error(errorMessages.REQUEST_DOESNOT_EXIST);
		}
		return result[0];
	} catch (error) {
		if (Object.values(errorMessages).includes(error.message)) {
			throw new Error("Bad request "+error.message);
		}
		throw new Error("Internal error when checking if request exists: "+error.message);
	}	
}
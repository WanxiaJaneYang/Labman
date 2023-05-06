import errorMessages from "../../../utils/constants/errorMessages.js";

export async function checkRequestExists(connection, request_id) {
	const getRequestQuery = "SELECT * FROM requests WHERE request_id = ?";
	try {
		const [result] = await connection.query(getRequestQuery, [request_id]);
		if (result.length === 0) {
			throw new Error(errorMessages.REQUEST_DOESNOT_EXIST);
		}
	} catch (error) {
		if (Object.values(errorMessages).includes(error.message)) {
			throw new Error(error.message);
		}
		throw new Error("Interval error when checking if request exists: "+error.message);
	}
}
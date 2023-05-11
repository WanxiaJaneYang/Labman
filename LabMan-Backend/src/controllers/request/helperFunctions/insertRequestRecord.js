import errorMessages from "../../../utils/constants/errorMessages.js";

export async function insertRequestRecord(connection, requestRecord) {
	try {
		// Insert the record into the requests table
		const [result] = await connection.query("INSERT INTO requests SET ?", requestRecord);
		// console.log(result);
		// console.log(result.insertId);
		// Return the insert ID
		const request_id = result.insertId;

		if (request_id === undefined) {
			throw new Error(errorMessages.REQUEST_REQUIRED_FIELD_INVALID);
		}
		return request_id;
	} catch (error) {
		if (Object.values(errorMessages).includes(error.message)) {
			throw new Error(error.message);
		}
		throw new Error("Failed inserting request record: " + error.message);
	}
}
import errorMessages from "../../../utils/constants/errorMessages.js";

async function statusIsNew(connection, request_id) {
	const getRequestQuery = "SELECT * FROM requests WHERE request_id = ?";
	try {
		const [result] = await connection.query(getRequestQuery, [request_id]);
		if (result.length === 0) {
			throw new Error(errorMessages.REQUEST_DOESNOT_EXIST);
		}
		//console.log(result[0].request_status);
		if (result[0].request_status != 0) {
			throw new Error(errorMessages.REQUEST_STATUS_IS_NOT_NEW);
		}
	} catch (error) {
		if (Object.values(errorMessages).includes(error.message)) {
			throw new Error(error.message);
		}
		throw new Error("Interval error when checking if request exists: "+error.message);
	}	
}

async function statusIsCollected(connection, request_id) {
	const getRequestQuery = "SELECT * FROM requests WHERE request_id = ?";
	try {
		const [result] = await connection.query(getRequestQuery, [request_id]);
		if (result.length === 0) {
			throw new Error(errorMessages.REQUEST_DOESNOT_EXIST);
		}
		console.log(result);
		if (result[0].request_status != 1) {
			throw new Error(errorMessages.REQUEST_STATUS_IS_NOT_COLLECTED);
		}
	} catch (error) {
		if (Object.values(errorMessages).includes(error.message)) {
			throw new Error("Bad request "+error.message);
		}
		throw new Error("Internal error when checking if request exists: "+error.message);
	}	
}

export { statusIsNew, statusIsCollected };
import util from "util";

export async function insertRequestLog(connection, requestLog) {
	const logQuery = "INSERT INTO request_log SET ?";
	const promiseQuery = util.promisify(connection.query).bind(connection);
	try {
		const results = await promiseQuery(logQuery, requestLog);
		console.log(results);
		return results;
	} catch (error) {
		throw new Error(error);
	}
}

export async function insertEquipmentLog(connection, equipmentLog) {
	const logQuery = "INSERT INTO equipment_log SET ?";
	const promiseQuery = util.promisify(connection.query).bind(connection);

	try {
		const results = await promiseQuery(logQuery, equipmentLog);
		return results;
	} catch (error) {
		throw new Error(error);
	}
}

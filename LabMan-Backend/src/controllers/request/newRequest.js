import moment from "moment";
import runTransaction from "./transaction.js";
import pool from "../../utils/MySQL/db.js";
import { insertRequestLog } from "../logs/asyncFuncLogs.js";
import { insertRequestRecord } from "./asyncFuncRequest.js";
import { compareAvailableAmount } from "../equipment/asyncFuncEquip.js";


async function newRequest(req) {
	try {
		const { type_id, type_name, student_id, borrow_amount, return_date } = req.body;
		// Get the current date and time
		const current_time = moment().format("YYYY-MM-DD HH:mm:ss");
		//return_date = moment(return_date).format("YYYY-MM-DD HH:mm:ss");

		// Create new request record
		const requestRecord = {
			student_id,
			type_id,
			type_name,
			borrow_amount,
			request_time: current_time,
			return_date,
			request_status: 0, // 0 = pending/new request
		};

		// Execute the SQL query with the request_id parameter
		await compareAvailableAmount(pool, type_id, borrow_amount);

		await runTransaction(async (connection) => {

			const insertRequestId = await insertRequestRecord(connection, requestRecord);

			//console.log(insertRequestId);
			const requestLog = {
				type_id,
				type_name,
				student_id,
				borrow_amount,
				return_date,
				log_type: 0, // 0 = new request
				log_time: current_time,
				request_id: insertRequestId,
			};

			await insertRequestLog(connection, requestLog);

		}).catch((error) => {
			console.log(error);
			throw error;
		});

	} catch (error) {
		console.error(error);
		// Send error response
		throw error;
	}
}

export { newRequest };

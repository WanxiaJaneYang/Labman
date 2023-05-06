import moment from "moment";
import runTransaction from "../../../utils/MySQL/transaction.js";
import pool from "../../../utils/MySQL/db.js";
import { insertRequestLog } from "../../logs/helperFunctions/insertRequestLog.js";
import { insertRequestRecord } from "../helperFunctions/insertRequestRecord.js";
import { compareAvailableAmount } from "../../equipment/helperFunctions/compareAvailableAmount.js";
import errorMessages from "../../../utils/constants/errorMessages.js";


async function newRequest(req,res) {
	try {
		const { type_id, type_name, student_id, borrow_amount, return_date } = req.body;

		// Create new request record
		const requestRecord = {
			student_id,
			type_id,
			type_name,
			borrow_amount,
			request_time: moment().format("YYYY-MM-DD HH:mm:ss"),
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
				log_time: moment().format("YYYY-MM-DD HH:mm:ss"),
				request_id: insertRequestId,
			};

			await insertRequestLog(connection, requestLog);
			return res.status(200).json({ message: "New request created successfully" });
		});
	} catch (error) {
		console.error(error);
		if (Object.values(errorMessages).includes(error.message)) {
			throw new Error(error.message);
		}
		// Send error response
		return res.status(500).json({ error: error.message });
	}
}

export { newRequest };

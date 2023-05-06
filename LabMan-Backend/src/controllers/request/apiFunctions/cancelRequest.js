import moment from "moment";
import pool from "../../../utils/MySQL/db.js";
import runTransaction from "../../../utils/MySQL/transaction.js";
import { getRequestById } from "../helperFunctions/getRequestById.js";
import { updateRequestStatus} from "../helperFunctions/updateRequestStatus.js";
import { insertRequestLog } from "../../logs/helperFunctions/insertRequestLog.js";
import { statusIsNew } from "../helperFunctions/checkRequestStatus.js";

async function cancelRequest(req,res) {
	try {
		const { request_id } = req.params; 

		const requestRecord = await getRequestById(pool, request_id);
		await statusIsNew(pool,request_id);

		// Create a collecting log of the request
		// console.log(requestRecord);
		const { type_id, type_name, student_id, borrow_amount, return_date } = requestRecord;
		const requestLog = {
			type_id,
			type_name,
			student_id,
			borrow_amount,
			return_date,
			log_type: 3, // 3 = collected
			log_time: moment().format("YYYY-MM-DD HH:mm:ss"),
			request_id,
		};
		// console.log(requestLog);

		await runTransaction(async (connection) => {
			// Update request_status to 2 (cancelled)
			const updatePromise = updateRequestStatus(connection, request_id, 2);

			// Insert requestLog into request_Log table
			const insertPromise = insertRequestLog(connection, requestLog);

			// Wait for both promises to complete
			await Promise.all([updatePromise, insertPromise]);
		});
		return res.status(200).json({ success: "Request cancelled successfully" });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ error: error.message });
	}
}

export { cancelRequest };

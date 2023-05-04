import moment from "moment";
import pool from "../../utils/MySQL/db.js";
import runTransaction from "./transaction.js";
import { updateRequestStatus } from "./asyncFuncRequest.js";
import { insertRequestLog } from "../logs/asyncFuncLogs.js";

async function cancelRequest(req,res) {
	try {
		const { request_id } = req.params; // Get the request ID from the URL parameter
		let requestLog = {};
		// get the request record with the request_id
		const [results] = await pool.promise().query("SELECT * FROM requests WHERE request_id = ?", [request_id]);

		const requestRecord = results[0];
		//console.log(requestRecord);
		if (requestRecord === undefined) {
			throw new Error("Error retrieving request record");
		}
		const { type_id, type_name, student_id, borrow_amount, return_date } = requestRecord;

		// Get the current date and time
		const current_time = moment().format("YYYY-MM-DD HH:mm:ss");

		// Create a collecting log of the request
		requestLog = {
			type_id,
			type_name,
			student_id,
			borrow_amount,
			return_date,
			log_type: 3, // 3 = collected
			log_time: current_time,
			request_id,
		};
		console.log(requestLog);

		await runTransaction(async (connection) => {
			// Update request_status to 2 (cancelled)
			const updatePromise = updateRequestStatus(connection, request_id, 2);

			// Insert requestLog into request_Log table
			const insertPromise = insertRequestLog(connection, requestLog);

			// Wait for both promises to complete
			await Promise.all([updatePromise, insertPromise]).catch((error) => {
				console.error(error);
				throw new Error("Error cancelling request");
			});
		});
		return res.status(200).json({ success: "Request cancelled successfully" });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ error: error.message });
	}
}

export { cancelRequest };

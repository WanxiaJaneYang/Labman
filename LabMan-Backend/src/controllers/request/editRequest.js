import moment from "moment";
import runTransaction from "./transaction.js";
import { insertRequestLog } from "../logs/asyncFuncLogs.js";
import { updateRequest } from "./asyncFuncRequest.js";

function editRequest(req, res) {
	try {
		const { request_id } = req.params; // Get the request ID from the URL parameter
		const { student_id, type_id, type_name, borrow_amount, return_date } = req.body;
		// return_date = moment(return_date).format("YYYY-MM-DD HH:mm:ss");

		// Get the current date and time
		const current_time = moment().format("YYYY-MM-DD HH:mm:ss");

		// Create a collecting log of the request
		const requestLog = {
			type_id,
			type_name,
			student_id,
			borrow_amount,
			return_date,
			log_type: 2, // 2 = edit
			log_time: current_time,
			request_id,
		};

		runTransaction(async (connection) => {
			try{
			// Update the request record
			const updateRequestPromise = updateRequest(connection, type_id, student_id, type_name, borrow_amount, return_date, request_id);

			// Insert requestLog into request_Log table
			const insertRequestLogPromise = insertRequestLog(connection, requestLog);

			// Wait for all promises to resolve
			await Promise.all([updateRequestPromise, insertRequestLogPromise])
				.then(() => {
					// Send success response
					return res.status(200).json({ success: "Request updated and log inserted successfully" });
				})
				.catch((error) => {
					console.error(error);
					return res.status(500).json({ error: "Failed to update request and insert request log" });
				});
			} catch (error) {
				console.error(error);
			}
		});
	} catch (error) {
		console.error(error);
		// Send error response
		res.status(500).json({ error: "Failed to update request" });
	}
}

export { editRequest };

import moment from "moment";
import runTransaction from "./transaction.js";
import { insertRequestLog } from "../logs/asyncFuncLogs.js";
import { updateRequest } from "./asyncFuncRequest.js";
import { compareAvailableAmount } from "../equipment/asyncFuncEquip.js";


async function editRequest(req) {
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

		await runTransaction(async (connection) => {
			// Update the request record
			await compareAvailableAmount(connection, type_id, borrow_amount);

			const updateRequestPromise = updateRequest(connection, type_id, student_id, type_name, borrow_amount, return_date, request_id);

			// Insert requestLog into request_Log table
			const insertRequestLogPromise = insertRequestLog(connection, requestLog);

			// Wait for all promises to resolve
			await Promise.all([updateRequestPromise, insertRequestLogPromise]);
		})
	} catch (error) {
		throw error;
	}
}

export { editRequest };

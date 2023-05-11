import moment from "moment";
import runTransaction from "../../../utils/MySQL/transaction.js";
import { insertRequestLog } from "../../logs/helperFunctions/insertRequestLog.js";
import { updateRequest } from "../helperFunctions/updateRequest.js";
import { compareAvailableAmount } from "../../equipment/helperFunctions/compareAvailableAmount.js";
import { statusIsNew } from "../helperFunctions/checkRequestStatus.js";
import pool from "../../../utils/MySQL/db.js";
import errorMessages from "../../../utils/constants/errorMessages.js";
import { updateReservedAmount } from "../../equipment/helperFunctions/updateReservedAmount.js";
import { getRequestById } from "../helperFunctions/getRequestById.js";
import { updateAvailableAmountAndRemovable } from "../../equipment/helperFunctions/updateAvailableAmountAndRemovable.js";

async function editRequest(req, res) {
	try {
		const { request_id } = req.params; 

		// Create a collecting log of the request
		const { student_id, type_id, type_name, borrow_amount, return_date } = req.body;
		const requestLog = {
			type_id,
			type_name,
			student_id,
			borrow_amount,
			return_date,
			log_type: 2, // 2 = edit
			log_time: moment().format("YYYY-MM-DD HH:mm:ss"),
			request_id,
		};
		const change_amount = borrow_amount - (await getRequestById(pool, request_id)).borrow_amount;
		await statusIsNew(pool,request_id);
		await runTransaction(async (connection) => {
			// Update the request record
			await compareAvailableAmount(connection, type_id, borrow_amount);

			const p1 = updateRequest(connection, type_id, student_id, type_name, borrow_amount, return_date, request_id);

			// Insert requestLog into request_Log table
			const p2 = insertRequestLog(connection, requestLog);
			const p3 = updateReservedAmount(connection, type_id, change_amount);
			const p4 = updateAvailableAmountAndRemovable(connection, type_id, change_amount*(-1));

			// Wait for all promises to resolve
			await Promise.all([p1,p2, p3,p4]);
		});
		return res.status(200).json({ success: "Request updated and log inserted successfully" });
	} catch (error) {
		console.log(error);
		if (Object.values(errorMessages).includes(error.message)) {
			return res.status(400).json({ error: "Bad request: "+error.message });
		}
		return res.status(500).json({ error: "Internal error: " +error.message });
	}
}

export { editRequest };

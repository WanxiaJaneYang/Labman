import pool from "../../../utils/MySQL/db.js";
import moment from "moment";
import runTransaction from "../../../utils/MySQL/transaction.js";
import { updateRequestStatus } from "../helperFunctions/updateRequestStatus.js";
import { updateAvailableAmount } from "../../equipment/asyncFuncEquip.js";
import { updateRemovableStatus } from "../../equipment/asyncFuncEquip.js";
import { insertRequestLog } from "../../logs/helperFunctions/insertRequestLog.js";
import { insertBorrowingRecords } from "../helperFunctions/insertBorrowingRecords.js";
import { compareAvailableAmount } from "../../equipment/asyncFuncEquip.js";
import { getRequestById } from "../helperFunctions/getRequestById.js";

async function collectRequest(req,res) {
	try {
		// Extract request records with request params
		const { request_id } = req.params;
		const borrowingRequest = await getRequestById(pool,request_id);

		await compareAvailableAmount(pool, borrowingRequest.type_id, borrowingRequest.borrow_amount);

		// Get the current date and time
		const current_time = moment().format("YYYY-MM-DD HH:mm:ss");

		await runTransaction(async (connection) => {
			// Insert borrowingRecord into borrowings table N times with amount=1 per record
			const p1 = insertBorrowingRecords(connection, borrowingRequest,current_time);
			const requestLog = {
				type_id: borrowingRequest.type_id,
				type_name: borrowingRequest.type_name,
				student_id: borrowingRequest.student_id,
				borrow_amount: borrowingRequest.borrow_amount,
				return_date: borrowingRequest.return_date,
				log_type: 1, // 1 = collect
				log_time: current_time,
				request_id: request_id,
			};
			const p2 = insertRequestLog(connection, requestLog);
			const p3 = updateRequestStatus(connection, request_id, 1);
			const p4 = updateAvailableAmount(connection, borrowingRequest.type_id, borrowingRequest.borrow_amount);
			const p5 = updateRemovableStatus(connection, borrowingRequest.type_id, 0);

			await Promise.all([p1, p2, p3, p4, p5]);
			return res.status(200).json({ success: "Request collected and log inserted successfully" });

		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({ error: error.message });
	}
}

export { collectRequest };

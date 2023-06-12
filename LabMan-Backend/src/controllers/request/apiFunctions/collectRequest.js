import pool from "../../../utils/MySQL/db.js";
import moment from "moment";
import runTransaction from "../../../utils/MySQL/transaction.js";
import { insertRequestLog } from "../../logs/helperFunctions/insertRequestLog.js";
import { insertBorrowingRecords } from "../helperFunctions/insertBorrowingRecords.js";
import { updateRequestStatus } from "../helperFunctions/updateRequestStatus.js";
import { getRequestById } from "../helperFunctions/getRequestById.js";
import { compareReservedAmount } from "../../equipment/helperFunctions/compareReservedAmount.js";
import { statusIsNew } from "../helperFunctions/checkRequestStatus.js";
import errorMessages from "../../../utils/constants/errorMessages.js";
import {updateReservedAmount} from "../../equipment/helperFunctions/updateReservedAmount.js";

async function collectRequest(req,res) {
	try {
		// Extract request records with request params
		const { request_id } = req.params;
		const request = await getRequestById(pool,request_id);
		//console.log(request.type_id);
		await statusIsNew(pool,request_id);

		await compareReservedAmount(pool, request.type_id, request.borrow_amount);

		await runTransaction(async (connection) => {
			// Insert borrowingRecord into borrowings table N times with amount=1 per record
			const p1 = insertBorrowingRecords(connection, request);
			const requestLog = {
				type_id: request.type_id,
				type_name: request.type_name,
				student_id: request.student_id,
				borrow_amount: request.borrow_amount,
				return_date: request.return_date,
				log_type: 1, // 1 = collect
				log_time: moment().format("YYYY-MM-DD HH:mm:ss"),
				request_id: request_id,
			};
			const p2 = insertRequestLog(connection, requestLog);
			const p3 = updateRequestStatus(connection, request_id, 1);
			const p4 = updateReservedAmount(connection, request.type_id, request.borrow_amount*(-1));

			await Promise.all([p1, p2, p3,p4]);
		});

		return res.status(200).json({ success: "Request collected and log inserted successfully" });
	} catch (error) {
		console.log(error);
		if (Object.values(errorMessages).includes(error.message)) {
			return res.status(400).json({ error: "Bad request: "+error.message });
		}
		return res.status(500).json({ error: "Internal error: " +error.message });
	}
}

export { collectRequest };

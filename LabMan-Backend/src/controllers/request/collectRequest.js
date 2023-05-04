import pool from "../../utils/MySQL/db.js";
import moment from "moment";
import runTransaction from "../../utils/MySQL/transaction.js";
import { updateRequestStatus } from "./asyncFuncRequest.js";
import { updateAvailableAmount } from "../equipment/asyncFuncEquip.js";
import { updateRemovableStatus } from "../equipment/asyncFuncEquip.js";
import { insertRequestLog } from "../logs/asyncFuncLogs.js";
import { insertBorrowingRecords } from "./asyncFuncRequest.js";

function collectRequest(req, res) {
	try {
		// Extract data from request params
		const { request_id } = req.params;

		// Define the SQL query
		const sql = "SELECT * FROM requests WHERE request_id = ?";

		// Execute the SQL query with the request_id parameter
		pool.query(sql, [request_id], (error, results) => {
			if (error) {
				console.error(error);
				return;
			}
			const borrowingRequest = results[0];
			//console.log(results);
			if (borrowingRequest === undefined) {
				return res.status(500).json({ error: "Error retrieving request record" });
			}
			const amount = borrowingRequest.borrow_amount;
			//console.log(borrowingRequest);

			// Get the current date and time
			const current_time = moment().format("YYYY-MM-DD HH:mm:ss");

			// Start a transaction
			runTransaction(async (connection) => {
				try {
					// Insert borrowingRecord into borrowings table N times with amount=1 per record
					const p1 = insertBorrowingRecords(connection, borrowingRequest, amount, current_time);

					const requestLog = {
						type_id: borrowingRequest.type_id,
						type_name: borrowingRequest.type_name,
						student_id: borrowingRequest.student_id,
						borrow_amount: amount,
						return_date: borrowingRequest.return_date,
						log_type: 1,  // 1 = collect
						log_time: current_time,
						request_id: request_id // Use the request_id from the previous query
					};

					const p2 = insertRequestLog(connection, requestLog);
					const p3 = updateRequestStatus(connection, request_id, 1);
					const p4 = updateAvailableAmount(connection, borrowingRequest.type_id, amount);
					const p5 = updateRemovableStatus(connection, borrowingRequest.type_id, 0);

					await Promise.all([p1, p2, p3, p4, p5]).catch((error) => {
						console.error(error);
						return res.status(500).json({ error: "Error processing request(collect)" });
					});

					// Send response indicating success
					return res.status(200).json({ success: "Borrow record and log created successfully" });
				} catch (error) {
					console.error(error);
				}
			});
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Failed to collect requested equipment and create borrow records" });
	}
}

export { collectRequest };

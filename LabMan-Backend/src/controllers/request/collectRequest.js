import pool from "../../utils/MySQL/db.js";
import moment from "moment";
import runTransaction from "./transaction.js";
import { updateRequestStatus } from "./asyncFunctions.js";
import { insertEquipmentLog } from "./asyncFunctions.js";
import { updateAvailableAmount } from "./asyncFunctions.js";
import { updateRemovableStatus } from "./asyncFunctions.js";
import { insertRequestLog } from "./asyncFunctions.js";

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

			const borrowRecord = {
				student_id: borrowingRequest.student_id,
				type_id: borrowingRequest.type_id,
				type_name: borrowingRequest.type_name,
				borrow_amount: 1,
				borrow_date: current_time,
				return_date: borrowingRequest.return_date,
				borrow_status: 0,//  0 = borrowed/unreturned
				request_id: request_id
			};
			//console.log(borrowRecord);

			// Start a transaction
			runTransaction(async (connection) => {
				// Insert borrowingRecord into borrowings table N times with amount=1 per record
				for (let i = 0; i < amount; i++) {
					const query = "INSERT INTO borrowings SET ?";
					connection.query(query, borrowRecord, (error, result) => {
						if (error) {
							console.error(error);
							return res.status(500).json({ error: "Error inserting borrowing records" });
						}
						//console.log(result);

						// Get the newly created request ID from the result
						const borrow_id = result.insertId;
						//console.log(borrow_id);

						// creat a new log for new borrowings
						const borrowLog = {
							type_id: borrowingRequest.type_id,
							type_name: borrowingRequest.type_name,
							student_id: borrowingRequest.student_id,
							borrow_amount: 1,
							return_date: borrowingRequest.return_date,
							log_type: 1,  // 1 = borrow
							log_time: current_time,
							borrow_id: borrow_id // Use the request_id from the previous query
						};
						//console.log(borrowLog);

						insertEquipmentLog(connection, borrowLog).catch((error) => {
							console.error(error);
							return res.status(500).json({ error: "Error inserting borrowing logs" });
						});

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

						insertRequestLog(connection, requestLog).catch((error) => {
							console.error(error);
							return res.status(500).json({ error: "Error inserting request logs" });
						});
					});
				}

				// Update the request status to 1= collected
				updateRequestStatus(connection, request_id, 1).catch((error) => {
					console.error(error);
					return res.status(500).json({ error: "Error updating request status" });
				});

				//reduce the available amount of the equipment type
				updateAvailableAmount(connection, borrowingRequest.type_id, amount).catch((error) => {
					console.error(error);
					return res.status(500).json({ error: "Failed to update available amount" });
				});

				//update the 'removable' status of the equipment type to be 0
				updateRemovableStatus(connection, borrowingRequest.type_id, 0).catch((error) => {
					console.error(error);
					return res.status(500).json({ error: "Failed to update removable status" });
				});
				// Send response indicating success
				return res.status(200).json({ success: "Borrow record and log created successfully" });

			});
		});

	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Failed to collect requested equipment and create borrow records" });
	}
}

export { collectRequest };

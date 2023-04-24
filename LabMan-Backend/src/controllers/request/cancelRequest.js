import moment from "moment";
import pool from "../../utils/MySQL/db.js";
import runTransaction from "./transaction.js";

function cancelRequest(req, res) {
	try {
		const request_id = req.params.request_id; // Get the request ID from the URL parameter

		// get the request record with the request_id
		pool.query("SELECT * FROM requests WHERE request_id = ?", [request_id], (error, results) => {
			if (error) {
				console.error(error);
				return res.status(500).json({ error: "Error retrieving request record" });
			}
			const requestRecord = results[0];
			//console.log(requestRecord);

			// Get the current date and time
			const current_time = moment().format("YYYY-MM-DD HH:mm:ss");
			const { type_id, type_name, student_id, borrow_amount } = requestRecord;

			runTransaction(async (connection) => {
				// Update request_status to 2 (cancelled)
				connection.query(
					"UPDATE requests SET request_status = 2 WHERE request_id = ?",
					request_id,
					(error) => {
						if (error) {
							throw error;
						}
					}
				);
				// Create a collecting log of the request
				const requestLog = {
					type_id,
					type_name,
					student_id,
					borrow_amount,
					log_type: 3, // 3 = collected
					log_time: current_time,
					request_id,
				};

				// Insert requestLog into request_Log table
				connection.query("INSERT INTO request_Log SET ?", requestLog, (error) => {
					if (error) {
						throw error;
					}
					return res.status(200).json({ success: "Request cancelled successfully" });
				});
			});
		});
	} catch (error) {
		console.error(error);
		// Send error response
		res.status(500).json({ error: "Failed to cancel request" });
	}
}

export { cancelRequest };

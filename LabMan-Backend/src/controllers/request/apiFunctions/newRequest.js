import moment from "moment";
import runTransaction from "../../../utils/MySQL/transaction.js";
import pool from "../../../utils/MySQL/db.js";
import { insertRequestLog } from "../../logs/helperFunctions/insertRequestLog.js";
import { insertRequestRecord } from "../helperFunctions/insertRequestRecord.js";
import { compareAvailableAmount } from "../../equipment/helperFunctions/compareAvailableAmount.js";
import errorMessages from "../../../utils/constants/errorMessages.js";
import { updateReservedAmount } from "../../equipment/helperFunctions/updateReservedAmount.js";
import { updateAvailableAmountAndRemovable } from "../../equipment/helperFunctions/updateAvailableAmountAndRemovable.js";

async function newRequest(req, res) {
	try {
		const { type_id, type_name, student_id, borrow_amount,  package_id, upper_bound_amount} = req.body;

		//check if the package has been borrowed by the student before (not cancelled)
		const [check] = await pool.query(`SELECT * FROM requests WHERE student_id = ? AND package_id = ? AND (request_status = 1 OR request_status = 0)`,[student_id, package_id]);
		//if the package has been borrowed by the student before, return error
		if(check.length > 0){
			return res.status(400).json({ error: "Bad request: the student has borrowed this package before" });
		}
		//get due date of course
		const [course] = await pool.query(`SELECT course_id FROM course_package WHERE package_id = ?`,[package_id]);
		const [return_date] = await pool.query(`SELECT due_date FROM course WHERE course_id = ?`,[course[0].course_id]);
		const due_date = return_date[0].due_date;

		// Create new request record
		const requestRecord = {
			student_id,
			type_id,
			type_name,
			borrow_amount,
			request_time: moment().format("YYYY-MM-DD HH:mm:ss"),
			return_date: due_date,
			request_status: 0, // 0 = pending/new request
			package_id, 
			upper_bound_amount
		};

		// Execute the SQL query with the request_id parameter
		await compareAvailableAmount(pool, type_id, borrow_amount);

		await runTransaction(async (connection) => {

			const insertRequestId = await insertRequestRecord(connection, requestRecord);

			//console.log(insertRequestId);
			const requestLog = {
				type_id,
				type_name,
				student_id,
				borrow_amount,
				return_date: due_date,
				log_type: 0, // 0 = new request
				log_time: moment().format("YYYY-MM-DD HH:mm:ss"),
				request_id: insertRequestId,
			};

			const p1 = await insertRequestLog(connection, requestLog);
			const p2 = updateReservedAmount(connection, type_id, borrow_amount);
			const p3 = updateAvailableAmountAndRemovable(connection, type_id, borrow_amount*(-1));
			// Wait for all promises to resolve
			await Promise.all([p1, p2,p3]);
		});

		return res.status(200).json({ message: "New request created successfully" });
	} catch (error) {
		console.error(error);

		// Send error response
		if (Object.values(errorMessages).includes(error.message)) {
			return res.status(400).json({ error: "Bad request: "+error.message });
		}
		return res.status(500).json({ error: "Internal error: " +error.message });
	}
}

export { newRequest };

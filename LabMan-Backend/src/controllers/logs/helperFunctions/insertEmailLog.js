import pool from "../../../utils/MySQL/db.js";
import moment from "moment";
export async function insertEmailLog(user, mailOptions) {

	try {
		const emailRecord = {
			student_id: user.student_id,
			type_name: user.type_name,
			borrow_amount: user.borrow_amount,
			returned_amount: user.returned_amount,
			return_date: user.return_date,
			log_time: moment().format("YYYY-MM-DD HH:mm:ss"),
			receiver_email: mailOptions.to,
			email_content: mailOptions.text,
		};
		await pool.query("INSERT INTO email_log SET ?", emailRecord);
	} catch (error) {
		throw new Error("Failed inserting email log: " + error.message);
	}
}
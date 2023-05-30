import pool from "../../../../utils/MySQL/db.js";
import moment from "moment";

async function getUsersToEmail() {
	try {
		//if the return_date of borrowings is less than current time plus 7 days, then send email to the student
		const remind_time1= moment().add(7, "days").format("YYYY-MM-DD HH:mm:ss");
		const remind_time2= moment().add(8, "days").format("YYYY-MM-DD HH:mm:ss");
		const remind_time3= moment().add(1, "days").format("YYYY-MM-DD HH:mm:ss");

		let query = "SELECT borrowings.student_id, borrowings.type_name, borrowings.return_date, borrowings.borrow_amount, borrowings.returned_amount, students_user.student_id, students_user.email FROM borrowings JOIN students_user ON borrowings.student_id = students_user.student_id WHERE borrow_status = 0 AND ((return_date > ? AND return_date < ?) OR return_date < ?)";

		const [results] = await pool.query(query, [remind_time1,remind_time2,remind_time3]);
		// console.log("users found: ");
		// console.log(results);
		// console.log(results.length);
		if (results.length === 0) {
			throw new Error("No users to remind");
		}
		return results;
	} catch (error) {
		throw new Error(error.message);
	}
}

export { getUsersToEmail };

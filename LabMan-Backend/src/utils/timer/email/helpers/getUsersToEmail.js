import pool from "../../../../utils/MySQL/db.js";
import moment from "moment";

async function getUsersToEmail() {
    try {
    //if the return_date of borrowings is less than current time plus 7 days, then send email to the student
    const remind_time= moment().add(1, 'days').format("YYYY-MM-DD HH:mm:ss");
	let query = "SELECT borrowings.student_id, students_user.email FROM borrowings JOIN students_user ON borrowings.student_id = students_user.student_id WHERE borrow_status = 0 AND return_date < ?";

		const [results] = await pool.query(query, remind_time);
        console.log(results);

        if (results.length === 0) {
            throw new Error("No users to email");
        }
		return results;
	} catch (error) {
		console.error(error);
	}
}

export { getUsersToEmail };

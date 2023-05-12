import pool from "../../../utils/MySQL/db.js";
import errorMessages from "../../../utils/constants/errorMessages.js";

async function getReturns(req, res) {

	const { borrow_status, student_id, type_name, start_date, end_date } = req.query;
	let sql = "SELECT * FROM borrowings";

	// Add WHERE clauses based on the query parameters
	const whereClauses = [];
	const params = [];

	if (borrow_status) {
		whereClauses.push("borrow_status = ?");
		params.push(borrow_status);
	}

	if (student_id) {
		whereClauses.push("student_id = ?");
		params.push(student_id);
	}

	if (type_name) {
		whereClauses.push("type_name = ?");
		params.push(type_name);
	}

	if (start_date) {
		whereClauses.push("borrow_date >= ?");
		params.push(start_date);
	}

	if (end_date) {
		whereClauses.push("borrow_date <= ?");
		params.push(end_date);
	}

	if (whereClauses.length > 0) {
		sql += " WHERE " + whereClauses.join(" AND ");
	}
	//console.log(sql);

	try {
		const [results] = await pool.query(sql, params);
		//404 if no borrowing exist
		if (results.length === 0) {
			return res.status(404).json(errorMessages.BORROWING_DOESNOT_EXIST);
		}
		return res.status(200).json(results);
	} catch (error) {
		console.error(error);
		if (Object.values(errorMessages).includes(error.message)) {
			return res.status(400).json({ error: "Bad request: " + error.message });
		}
		return res.status(500).json({ error: "Internal error: " + error.message });
	}
}

export { getReturns };

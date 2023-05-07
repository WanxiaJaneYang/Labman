import pool from "../../../utils/MySQL/db.js";
import errorMessages from "../../../utils/constants/errorMessages.js";

async function getReturns(req, res) {
	let query = "SELECT * FROM borrowings WHERE borrow_status = 0";
	const conditions = [];

	if (req.query.type_name) {
		conditions.push(`type_name = '${req.query.type_name}'`);
	}

	if (req.query.student_id) {
		conditions.push(`student_id = '${req.query.student_id}'`);
	}

	if (conditions.length > 0) {
		query += " AND " + conditions.join(" AND ");
	}

	try {
		const [results] = await pool.query(query, conditions);
		return res.status(200).json(results);
	} catch (error) {
		console.error(error);
		if (Object.values(errorMessages).includes(error.message)) {
			return res.status(404).json({ error: "Bad request: " + error.message });
		}
		return res.status(500).json({ error: "Internal error: " + error.message });
	}
};

export { getReturns };

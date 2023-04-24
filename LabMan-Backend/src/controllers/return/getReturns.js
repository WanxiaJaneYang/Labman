import pool from "../../utils/MySQL/db.js";

const getReturns = (req, res) => {
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

	pool.query(query, (err, results) => {
		if (err) {
			console.error(err);
			return res.status(500).json({ error: "Error retrieving request records" });
		}
		return res.status(200).json(results);
	});
};

export { getReturns };

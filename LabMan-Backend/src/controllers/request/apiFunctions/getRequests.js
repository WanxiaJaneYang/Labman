import pool from "../../../utils/MySQL/db.js";
import errorMessages from "../../../utils/constants/errorMessages.js";

async function getRequests(req, res) {
	if (req.query.student_id || req.query.type_name || req.query.start_date || req.query.end_date || req.query.request_status) {
		return getfilteredRequests(req, res);
	} else {
		try {
			const [results] = await pool.query("SELECT * FROM requests ORDER BY request_time DESC");
			return res.status(200).json(results);
		} catch (error) {
			console.error(error);
			if (Object.values(errorMessages).includes(error.message)) {
				return res.status(400).json({ error: error.message });
			}
			return res.status(500).json({ error: error.message });
		}
	}
}

async function getfilteredRequests(req, res) {
	try {
		const { student_id, type_name, start_date, end_date, request_status } = req.query;

		let sql = "SELECT * FROM requests";

		// Add WHERE clauses based on the query parameters
		const whereClauses = [];
		const params = [];

		if (student_id) {
			whereClauses.push("student_id LIKE ?");
			params.push(`%${student_id}%`);
		}

		if (type_name) {
			whereClauses.push("type_name LIKE ?");
			params.push(`%${type_name}%`);
		}

		if (start_date) {
			whereClauses.push("request_time >= ?");
			params.push(start_date);
		}

		if (end_date) {
			whereClauses.push("request_time <= ?");
			params.push(end_date);
		}

		if (request_status) {
			whereClauses.push("request_status = ?");
			params.push(request_status);
		}

		if (whereClauses.length > 0) {
			sql += " WHERE " + whereClauses.join(" AND ");
		}

		// Add ORDER BY clause to sort by request_time
		sql += " ORDER BY request_time DESC";

		const [results] = await pool.query(sql, params);

		return res.status(200).json(results);
	} catch (error) {
		console.error(error);
		if (Object.values(errorMessages).includes(error.message)) {
			return res.status(400).json({ error: "Bad request: "+error.message });
		}
		return res.status(500).json({ error: "Internal error: " + error.message });
	}
}

export { getRequests };

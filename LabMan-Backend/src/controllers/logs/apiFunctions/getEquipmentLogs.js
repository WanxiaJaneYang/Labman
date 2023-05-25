import pool from "../../../utils/MySQL/db.js";
import errorMessages from "../../../utils/constants/errorMessages.js";

async function getEquipmentLogs(req, res) {
	if (req.query.student_id || req.query.type_name || req.query.start_date || req.query.end_date) {
		return getfilteredEquipmentLogs(req, res);
	} else {
		try {
			const [results] = await pool.query("SELECT * FROM equipment_log");
			return res.status(200).json(results);
		} catch (error) {
			console.error(error);
			if (Object.values(errorMessages).includes(error.message)) {
				return res.status(400).json({ error: "Bad request: " + error.message });
			}
			return res.status(500).json({ error: "Internal error: " + error.message });
		}
	}
}

async function getfilteredEquipmentLogs(req, res) {

	const { student_id, type_name, start_date, end_date } = req.query;

	let sql = "SELECT * FROM equipment_log";

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

	if (whereClauses.length > 0) {
		sql += " WHERE " + whereClauses.join(" AND ");
	}

	// Add ORDER BY clause to sort by request_time
	sql += " ORDER BY log_time ASC";

	// // Add LIMIT and OFFSET clauses for paging
	// if (page && per_page) {
	// 	const offset = (page - 1) * per_page;
	// 	sql += " LIMIT ? OFFSET ?";
	// 	params.push(parseInt(per_page, 10));
	// 	params.push(parseInt(offset, 10));
	// }

	try {
		const [results] = await pool.query(sql, params);
		return res.status(200).json(results);
	} catch (error) {
		console.error(error);
		if (Object.values(errorMessages).includes(error.message)) {
			return res.status(400).json({ error: "Bad request: " + error.message });
		}
		return res.status(500).json({ error: "Internal error: " + error.message });
	}
}

export { getEquipmentLogs };

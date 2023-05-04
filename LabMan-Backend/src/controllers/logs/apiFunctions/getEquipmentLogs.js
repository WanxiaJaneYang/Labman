import pool from "../../../utils/MySQL/db.js";

function getEquipmentLogs(req, res) {
	if (req.query.student_id || req.query.type_name || req.query.start_date || req.query.end_date) {
		return getfilteredEquipmentLogs(req, res);
	} else {
		pool.query("SELECT * FROM equipment_log", (error, results) => {
			if (error) {
				console.error(error);
				return res.status(500).json({ error: "Error retrieving Equipment logs" });
			}
			return res.status(200).json(results);
		});
	}
}

function getfilteredEquipmentLogs(req, res) {

	const { student_id, type_name, start_date, end_date } = req.query;

	let sql = "SELECT * FROM equipment_log";

	// Add WHERE clauses based on the query parameters
	const whereClauses = [];
	const params = [];

	if (student_id) {
		whereClauses.push("student_id = ?");
		params.push(student_id);
	}

	if (type_name) {
		whereClauses.push("type_name = ?");
		params.push(type_name);
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

	pool.query(sql, params, (error, results) => {
		if (error) {
			return res.status(500).json({ error: "Error retrieving Equipment logs" });
		}

		return res.status(200).json(results);
	});
}

export { getEquipmentLogs };

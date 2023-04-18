import pool from "../../utils/MySQL/db.js";

function getAllLogs(req, res) {
	pool.query(
		"SELECT log_time, log_type, user_name, type_name, request_id, borrow_id, null as return_id FROM request_log " +
    "UNION " +
    "SELECT log_time, log_type, user_name, type_name, null as request_id, borrow_id, return_id FROM equipment_log " +
    "ORDER BY log_time DESC",
		(err, results) => {
			if (err) {
				console.error(err);
				return res.status(500).json({ error: "Error retrieving logs" });
			}
			return res.status(200).json(results);
		}
	);
}

export { getAllLogs };

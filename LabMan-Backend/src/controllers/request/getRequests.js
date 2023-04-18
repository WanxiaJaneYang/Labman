import pool from "../../utils/MySQL/db.js";

function getRequests(req, res) {
	pool.query("SELECT * FROM requests", (err, results) => {
		if (err) {
			console.error(err);
			return res.status(500).json({ error: "Error retrieving request records" });
		}
		return res.status(200).json(results);
	});
}
  
export  { getRequests };
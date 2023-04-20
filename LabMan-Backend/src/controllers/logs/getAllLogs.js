import pool from "../../utils/MySQL/db.js";

function getAllLogs(req, res) {
  pool.query(
    "SELECT * FROM request_log " ,(err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Error retrieving logs" });
      }
      return res.status(200).json(results);
    }
  );

}

export { getAllLogs };

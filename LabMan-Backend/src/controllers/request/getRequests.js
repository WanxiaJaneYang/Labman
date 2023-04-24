import pool from "../../utils/MySQL/db.js";

function getRequests(req, res) {

  if (req.query.student_id || req.query.type_name || req.query.start_date || req.query.end_date || req.query.request_status) {
    return getfilteredRequests(req, res);
  } else {
    pool.query("SELECT * FROM requests", (error, results) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ error: "Error retrieving request records" });
      }
      return res.status(200).json(results);
    });
  }
}

function getfilteredRequests(req, res) {

  const { student_id, type_name, start_date, end_date, request_status } = req.query;

  let sql = "SELECT * FROM requests";

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

  if (request_status) {
    whereClauses.push("request_status = ?");
    params.push(request_status);
  }

  if (whereClauses.length > 0) {
    sql += " WHERE " + whereClauses.join(" AND ");
  }

  // Add ORDER BY clause to sort by request_time
  sql += " ORDER BY request_time ASC";

  pool.query(sql, params, (error, results) => {
    if (error) {
      return res.status(500).json({ error: "Error retrieving request records" });
    }

    return res.status(200).json(results);
  });
}

export { getRequests };
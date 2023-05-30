import pool from "../../../utils/MySQL/db.js";
import errorMessages from "../../../utils/constants/errorMessages.js";
import { checkCourseExists } from "../helperFunctions/checkCourseExists.js";

async function getCourse(req, res) {
	try {
		if (req.query.course_id || req.query.course_name || req.query.coordinator_name) {
			return getFilteredCourse(req, res);
		}

		const [results] = await pool.query("SELECT * FROM course");
		//404 not found
		if (results.length === 0) {
			return res.status(404).json({ error: errorMessages.COURSE_NOT_FOUND });
		}

		return res.status(200).json(results);
	} catch (error) {
		console.error(error);
		if (Object.values(errorMessages).includes(error.message)) {
			return res.status(404).json({ error: error.message });
		}
		return res.status(500).json({ error: error.message });
	}
}

async function getCourseById(req, res) {
	try {
		const { course_id } = req.params;

		const result = await checkCourseExists(pool, course_id);
		return res.status(200).json(result);

	} catch (error) {
		console.error(error);
		if (Object.values(errorMessages).includes(error.message)) {
			return res.status(404).json({ error: "Bad request: " + error.message });
		}
		return res.status(500).json({ error: "Internal error: " + error.message });
	}
}

async function getFilteredCourse(req, res) {
	try {
	  const { course_id, course_name, coordinator_name } = req.query;
  
	  let sql = "SELECT * FROM course";
  
	  // Add WHERE clauses based on the query parameters
	  const whereClauses = [];
	  const params = [];
  
	  if (course_id) {
			whereClauses.push("course_id LIKE ?");
			params.push(`%${course_id}%`);
	  }
  
	  if (course_name) {
			whereClauses.push("course_name LIKE ?");
			params.push(`%${course_name}%`);
	  }
  
	  if (coordinator_name) {
			whereClauses.push("coordinator_name LIKE ?");
			params.push(`%${coordinator_name}%`);
	  }
  
	  if (whereClauses.length > 0) {
			sql += " WHERE " + whereClauses.join(" AND ");
	  }
  
	  // Add ORDER BY clause to sort by edit_time
	  sql += " ORDER BY last_edit_time ASC";
  
	  const [results] = await pool.query(sql, params);
  
	  if (results.length === 0) {
			return res.status(404).json({ error: errorMessages.COURSE_NOT_FOUND });
	  }
  
	  return res.status(200).json(results);
	} catch (error) {
	  console.error(error);
  
	  if (Object.values(errorMessages).includes(error.message)) {
			return res.status(404).json({ error: "Bad request: " + error.message });
	  }
  
	  return res.status(500).json({ error: "Internal error: " + error.message });
	}
}
  
export { getCourse, getFilteredCourse, getCourseById };

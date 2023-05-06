import pool from "../../../utils/MySQL/db.js";

async function newUser(req, res) {
	const { student_id, email, password } = req.body;
  
	try {
	  const query = "INSERT INTO students_user (student_id, email, password) VALUES (?, ?, ?)";
	  const params = [student_id, email, password];
  
	  const [results] = await pool.query(query, params);
  
	  return res.status(201).json({ message: "User created successfully" });
	} catch (error) {
	  console.error(error);
	  if (error.errno === 1062) {
		return res.status(409).json({ error: "User already exists" });
	  }
  
	  return res.status(500).json({ error: "Error inserting user: "+error.message });
	}
  }  

//For recall module
export { newUser };

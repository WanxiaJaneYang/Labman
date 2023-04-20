import pool from "../../utils/MySQL/db.js";

//Add a new user
function newUser(req, res) {
	const { student_id, email, password } = req.body;
	pool.query(
		"INSERT INTO students_user (student_id, email, password) VALUES (?, ?, ?)",
		[student_id, email, password],
		(err) => {
			if (err) {
				if(err.errno === 1062){
					return res.status(409).json({ error: "User already exists" });
				}else{
					return res.status(500).json({ error: "Error inserting user" });
				}
			}
			return res.status(201).json({ message: "User created successfully" });
		}
	);
}

//For recall module
export { newUser };

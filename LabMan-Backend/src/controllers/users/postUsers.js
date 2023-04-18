import pool from "../../utils/MySQL/db.js";

//Add a new user
function newUser(req, res){
  const { user_name, email, password } = req.body;
  pool.query(
    "INSERT INTO students_user (user_name, email, password) VALUES (?, ?, ?)",
    [user_name, email, password],
    (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Error inserting user" });
      }
      return res.status(201).json({ message: "User created successfully" });
    }
  );
};

//Recall module
export  { newUser };

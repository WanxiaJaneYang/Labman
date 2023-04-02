import express from "express";
import mysql from "mysql";
import fs from "fs";
const app = express();

const pool = mysql.createPool({

  host:"labman.mysql.database.azure.com", 
  user:"a1866621", 
  password:"Adelaide123N", 
  database:"labman", 
  port:3306, 
  connectTimeout: 60000,
  ssl: {   
    rejectUnauthorized: false,
    ca: fs.readFileSync("DigiCertGlobalRootCA.crt.pem")
}
});
app.use(express.json());

//connection log
// pool.getConnection((err, connection) => {
//     if (err) {
//       console.error("Error connecting to database: ", err);
//     } else {
//       console.log("Connected to database!");
//      // connection.release();
//     }
//   });
  

//insert a new equipment type
app.post("/equipment_type", (req, res) => {
    const { type_name, type_quantity } = req.body;
    pool.query(
      "INSERT INTO equipment_type (type_name, type_quantity) VALUES (?, ?)",
      [type_name, type_quantity],
      (err, results) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: "Error inserting equipment type" });
        }
        return res.status(201).json({ message: "Equipment type created successfully" });
      }
    );
  });

//all equipment types
app.get("/equipments", (req, res) => {
    pool.query("SELECT * FROM equipment_type", (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Error retrieving equipment types" });
        }
        return res.status(200).json(results);
    });
});

//insert a new equipment type
app.post("/user", (req, res) => {
    const { user_name } = req.body;
    pool.query(
      "INSERT INTO equipment_type (user_name) VALUES (?)",
      [user_name],
      (err, results) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: "Error inserting user" });
        }
        return res.status(201).json({ message: "User created successfully" });
      }
    );
  });

//all users
app.get("/users", (req, res) => {
    pool.query("SELECT * FROM user", (err, results) => {
        if (err) {  
            console.error(err);
            return res.status(500).json({ error: "Error retrieving users" });
        }
        return res.status(200).json(results);
    });
});

app.listen(3000, () => {
    console.log("Server listening on port 3000");
  });

export default app;
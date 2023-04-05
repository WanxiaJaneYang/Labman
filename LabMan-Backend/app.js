import express from "express";
import mysql from "mysql";
import fs from "fs";
import moment from "moment";

const app = express();

const pool = mysql.createPool({

  host: "labman.mysql.database.azure.com",
  user: "a1866621",
  password: "Adelaide123N",
  database: "labman",
  port: 3306,
  connectTimeout: 60000,
  ssl: {
    rejectUnauthorized: false,
    ca: fs.readFileSync("DigiCertGlobalRootCA.crt.pem")
  },
  acquireTimeout: 10000, // Set the acquireTimeout in milliseconds
  waitForConnections: true
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
  const { type_name, total_amount, available_amount } = req.body;
  pool.query(
    "INSERT INTO equipment_type (type_name, total_amount,available_amount) VALUES (?, ?, ?)",
    [type_name, total_amount, available_amount],
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


// Create a new borrowing record and insert a log into Equipment Log table
app.post('/borrowings', (req, res) => {
  // Extract data from request body
  const { type_id, user_id, borrow_amount, borrow_date, return_date } = req.body;

  // Get the current date and time
  const log_date = moment().format('YYYY-MM-DD HH:mm:ss');

  const borrowingRecord = {
    user_id: user_id,
    user_name: "test",
    type_id: type_id,
    type_name: 'test',
    borrow_amount: borrow_amount,
    borrow_date: borrow_date,
    return_date: return_date,
    actual_return_date: null, // Set actual_return_date to null initially
    status: 0
  };

  // Start a transaction
  pool.getConnection((err, connection) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to create borrowing record' });
    }

    connection.beginTransaction((err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Failed to create borrowing record' });
      }

      // Insert borrowingRecord into Borrowings table
      connection.query('INSERT INTO borrowings SET ?', borrowingRecord, (err, result) => {
        if (err) {
          console.error(err);
          connection.rollback(() => {
            // Rollback the transaction on error
            connection.release();
            return res.status(500).json({ error: 'Failed to create borrowing record' });
          });
        }

        // Get the newly created borrowing ID from the result
        const borrowing_id = result.insertId;

        // Insert a new log into Equipment Log table for borrowing action
        const borrowingLog = {
          type_id: type_id,
          type_name: 'test',
          user_id: user_id,
          user_name: "test",
          action: 0,
          log_date: log_date,
          borrowing_id: borrowing_id // Use the borrowing_id from the previous query
        };
        connection.query('INSERT INTO equipment_Log SET ?', borrowingLog, (err, result) => {
          if (err) {
            console.error(err);
            connection.rollback(() => {
              // Rollback the transaction on error
              connection.release();
              return res.status(500).json({ error: 'Failed to create log for borrowing action' });
            });
          }

          // Commit the transaction on success
          connection.commit((err) => {
            if (err) {
              console.error(err);
              connection.rollback(() => {
                // Rollback the transaction on error
                connection.release();
                return res.status(500).json({ error: 'Failed to create borrowing record' });
              });
            }

            connection.release();
            // Send response indicating success
            return res.status(200).json({ success: 'Borrowing record and log created successfully' });
          });
        });
      });
    });
  });
});


//insert a new user/student
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

//query all users
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
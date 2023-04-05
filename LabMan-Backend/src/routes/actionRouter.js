import { Router } from "express";
import express from "express";
import moment from "moment";

const actionRouter = Router();
actionRouter.use(express.json());

// Create a new borrowing record and insert a log into Equipment Log table
actionRouter.post('/borrow', (req, res) => {
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

//query all borrow records
actionRouter.get("/borrow", (req, res) => {
  pool.query("SELECT * FROM borrowings", (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Error retrieving borrow records" });
    }
    return res.status(200).json(results);
  });
});

export { actionRouter };
import pool from "../../utils/MySQL/db.js";
import moment from "moment";

async function newRequest(req, res) {
  // Extract data from request body
  const { type_id, user_name, borrow_amount,  return_date } = req.body;

  //get type_name and user_id
  // execute the query to retrieve the user_id
  const [rows, fields] = await pool.execute('SELECT user_id FROM user WHERE user_name = ?', [user_name]);
  const user_id = rows[0].user_id;

  // execute the query to retrieve the type_name
  const [rows2, fields2] = await pool.execute('SELECT type_name FROM type WHERE type_id = ?', [type_id]);
  const type_name = rows2[0].type_name;

  // Get the current date and time
  const current_time = moment().format('YYYY-MM-DD HH:mm:ss');

  const requestRecord = {
    user_id: user_id,
    user_name: user_name,
    type_id: type_id,
    type_name: type_name,
    borrow_amount: borrow_amount,
    request_time: current_time,
    return_date: return_date,
    request_status: 0 // 0 = pending/new request
  };

  // Start a transaction
  pool.getConnection((err, connection) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to create request record' });
    }

    connection.beginTransaction((err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Failed to create request record' });
      }

      // Insert borrowingRecord into requests table
      pool.query('INSERT INTO requests SET ?', requestRecord, (err, result) => {
        if (err) {
          console.error(err);
          connection.rollback(() => {
            // Rollback the transaction on error
            connection.release();
            return res.status(500).json({ error: 'Failed to create request record' });
          });
        }

        // Get the newly created request ID from the result
        const request_id = result.insertId;

        // Insert a new log into request Log table for new request
        const requestLog = {
          type_id: type_id,
          type_name: type_name,
          user_id: user_id,
          user_name: user_name,
          action: 0, // 0 = New request
          log_date: current_time,
          request_id: request_id // Use the request_id from the previous query
        };
        pool.query('INSERT INTO request_Log SET ?', requestLog, (err, result) => {
          if (err) {
            console.error(err);
            connection.rollback(() => {
              // Rollback the transaction on error
              connection.release();
              return res.status(500).json({ error: 'Failed to create log for new request' });
            });
          }

          // Commit the transaction on success
          connection.commit((err) => {
            if (err) {
              console.error(err);
              connection.rollback(() => {
                // Rollback the transaction on error
                connection.release();
                return res.status(500).json({ error: 'Failed to create new request' });
              });
            }

            connection.release();
            // Send response indicating success
            return res.status(200).json({ success: 'Request record and log created successfully' });
          });
        });
      });
    });
  });
}
export { newRequest };
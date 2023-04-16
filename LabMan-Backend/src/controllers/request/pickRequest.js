import pool from "../../utils/MySQL/db.js";
import moment from "moment";

async function pickRequest(req, res) {
  // Extract data from request body
  const { request_id } = req.body;

  // Define the SQL query
  const sql = 'SELECT * FROM borrowing_requests WHERE request_id = ?';

  // Execute the SQL query with the request_id parameter
  const [rows, fields] = await pool.execute(sql, [request_id]);
  const borrowingRequest = rows[0];
  const amount = borrowingRequest.borrow_amount;

  // Get the current date and time
  const current_time = moment().format('YYYY-MM-DD HH:mm:ss');

  const borrowRecord = {
    user_id: borrowingRequest.user_id,
    user_name: borrowingRequest.user_name,
    type_id: borrowingRequest.type_id,
    type_name: borrowingRequest.type_name,
    borrow_amount: 1,
    borrow_date: current_time,
    return_date: borrowingRequest.return_date,
    request_status: 1,//  1 = borrowed
    request_id: request_id
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

      // Insert borrowingRecord into borrowings table N times with amount=1 per record
      for (let i = 0; i < amount; i++) {

        pool.query('INSERT INTO borrowings SET ?', borrowRecord, (err, result) => {
          if (err) {
            console.error(err);
            connection.rollback(() => {
              // Rollback the transaction on error
              connection.release();
              return res.status(500).json({ error: 'Failed to create request record' });
            });
          }
          // Get the newly created request ID from the result
          const borrow_id = result.insertId;

          // creat a new log for new borrowings
          const borrowLog = {
            type_id: borrowingRequest.type_id,
            type_name: borrowingRequest.type_name,
            user_id: borrowingRequest.user_id,
            user_name: borrowingRequest.user_name,
            action: 1,  // 1 = borrow
            log_date: current_time,
            borrow_id: borrow_id // Use the request_id from the previous query
          };
          pool.query('INSERT INTO equipment_Log SET ?', borrowLog, (err, result) => {
            if (err) {
              console.error(err);
              connection.rollback(() => {
                // Rollback the transaction on error
                connection.release();
                return res.status(500).json({ error: 'Failed to create log for new request' });
              });
            }
          });


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
      };
  });
});
}
export { pickRequest };
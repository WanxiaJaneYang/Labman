import moment from 'moment';
import pool from '../../utils/MySQL/db.js';

async function newRequest(req, res) {
  let connection;
  try {
    const { type_id, user_name, borrow_amount, return_date } = req.body;

    // Get user_id from user_name
    const [[{ user_id }]] = await pool.query('SELECT user_id FROM students_user WHERE user_name = ?', [user_name]);

    // Get type_name from type_id
    const [[{ type_name }]] = await pool.query('SELECT type_name FROM equipment_type WHERE type_id = ?', [type_id]);

    // Get the current date and time
    const current_time = moment().format('YYYY-MM-DD HH:mm:ss');

    // Create new request record
    const requestRecord = {
      user_id,
      user_name,
      type_id,
      type_name,
      borrow_amount,
      request_time: current_time,
      return_date,
      request_status: 0, // 0 = pending/new request
    };

    // Get a connection from the pool
    connection = await pool.getConnection();

    // Start a transaction
    await connection.beginTransaction();

    // Insert requestRecord into requests table
    const [{ insertId }] = await connection.query('INSERT INTO requests SET ?', requestRecord);

    // Create a new request log for the new request
    const requestLog = {
      type_id,
      type_name,
      user_id,
      user_name,
      borrow_amount,
      log_type: 0, // 0 = new request
      log_time: current_time,
      request_id: insertId,
    };

    // Insert requestLog into request_Log table
    await connection.query('INSERT INTO request_Log SET ?', requestLog);

    // Commit the transaction
    await connection.commit();

    // Release the connection back to the pool
    connection.release();

    // Send response indicating success
    return res.status(200).json({ success: 'Request record and log created successfully' });
  } catch (err) {
    console.error(err);

    // Rollback the transaction on error
    if (connection) {
      await connection.rollback();
      connection.release();
    }

    // Send error response
    return res.status(500).json({ error: 'Failed to create new request' });
  }
}

export { newRequest };

// import pool from "../../utils/MySQL/db.js";
// import moment from "moment";
// import mysql from "mysql2/promise";

// async function pickRequest(req, res) {
//   try {
//     // Extract data from request body
//     const { request_id } = req.body;

//     // Define the SQL query
//     const sql = 'SELECT * FROM requests WHERE request_id = ?';

//     // Execute the SQL query with the request_id parameter
//     // const [rows, fields] = await pool.execute(sql, [request_id]);
//     // const amount = rows[0].borrow_amount;

//     const result = await pool.query(sql, [request_id]);
//     const borrowingRequest = result[0];
//     const amount = borrowingRequest.borrow_amount;
//     console.log(borrowingRequest);
//     console.log(amount);

//     // Get the current date and time
//     const current_time = moment().format('YYYY-MM-DD HH:mm:ss');

//     const borrowRecord = {
//       user_id: borrowingRequest.user_id,
//       user_name: borrowingRequest.user_name,
//       type_id: borrowingRequest.type_id,
//       type_name: borrowingRequest.type_name,
//       borrow_amount: 1,
//       borrow_date: current_time,
//       return_date: borrowingRequest.return_date,
//       borrow_status: 0,//  0 = borrowed/unreturned
//       request_id: request_id
//     };

//     // Start a transaction
//     await runTransaction(async (connection) => {
//       // Insert borrowingRecord into borrowings table N times with amount=1 per record
//       for (let i = 0; i < amount; i++) {
//         const [result, fields] = await connection.execute('INSERT INTO borrowings SET ?', borrowRecord);
//         console.log(result);

//         // Get the newly created request ID from the result
//         const borrow_id = result.insertId;
//         console.log(borrow_id);

//         // creat a new log for new borrowings
//         const borrowLog = {
//           type_id: borrowingRequest.type_id,
//           type_name: borrowingRequest.type_name,
//           user_id: borrowingRequest.user_id,
//           user_name: borrowingRequest.user_name,
//           borrow_amount: 1,
//           log_type: 1,  // 1 = borrow
//           log_time: current_time,
//           borrow_id: borrow_id // Use the request_id from the previous query
//         };
//         await connection.execute('INSERT INTO equipment_Log SET ?', borrowLog);
//       }

//       // Update the request status to 1
//       const updateStatusQuery = 'UPDATE requests SET request_status = ? WHERE request_id = ?';
//       await connection.execute(updateStatusQuery, [1, request_id]);
//     });

//     // Send response indicating success
//     return res.status(200).json({ success: 'Borrow record and log created successfully' });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ error: 'Failed to create borrow record' });
//   }
// }

// async function runTransaction(callback) {
//   const connection = await pool.getConnection();
//   try {
//     await connection.beginTransaction();
//     await callback(connection);
//     await connection.commit();
//   } catch (error) {
//     await connection.rollback();
//     throw error;
//   } finally {
//     connection.release();
//   }
// }

// export { pickRequest };

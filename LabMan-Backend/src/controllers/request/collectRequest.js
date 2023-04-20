import pool from "../../utils/MySQL/db.js";
import moment from "moment";


async function collectRequest(req, res) {
    try {
        // Extract data from request body
        const { request_id } = req.body;

        // Define the SQL query
        const sql = 'SELECT * FROM requests WHERE request_id = ?';

        // Execute the SQL query with the request_id parameter
        pool.query(sql, [request_id], async (error, results) => {
            if (error) {
                console.error(err);
            }
            const borrowingRequest = Array.isArray(results) ? results[0] : results;
            //console.log(results);

            const amount = borrowingRequest.borrow_amount;
            //console.log(borrowingRequest);

            //   console.log(amount);

            // Get the current date and time
            const current_time = moment().format('YYYY-MM-DD HH:mm:ss');

            const borrowRecord = {
                student_id: borrowingRequest.student_id,
                type_id: borrowingRequest.type_id,
                type_name: borrowingRequest.type_name,
                borrow_amount: 1,
                borrow_date: current_time,
                return_date: borrowingRequest.return_date,
                borrow_status: 0,//  0 = borrowed/unreturned
                request_id: request_id
            };

            // Start a transaction
            await runTransaction(async (connection) => {
                // Insert borrowingRecord into borrowings table N times with amount=1 per record
                for (let i = 0; i < amount; i++) {
                    const query = 'INSERT INTO borrowings SET ?';
                    connection.query(query, borrowRecord, async (error, result) => {
                        if (error) {
                            throw error;
                        }
                        //console.log(result);

                        // Get the newly created request ID from the result
                        const borrow_id = result.insertId;
                        //console.log(borrow_id);

                        // creat a new log for new borrowings
                        const borrowLog = {
                            type_id: borrowingRequest.type_id,
                            type_name: borrowingRequest.type_name,
                            student_id: borrowingRequest.student_id,
                            borrow_amount: 1,
                            log_type: 1,  // 1 = borrow
                            log_time: current_time,
                            borrow_id: borrow_id // Use the request_id from the previous query
                        };
                        const logQuery = 'INSERT INTO equipment_Log SET ?';
                        await connection.query(logQuery, borrowLog);
                    });
                }

                // Update the request status to 1
                const updateStatusQuery = 'UPDATE requests SET request_status = ? WHERE request_id = ?';
                await connection.query(updateStatusQuery, [1, request_id]);

                //reduce the available amount of the equipment type
                const updateAmountQuery = 'UPDATE equipment_type SET available_amount = available_amount - ? WHERE type_id = ?';
                await connection.query(updateAmountQuery, [amount, borrowingRequest.type_id]);
            });

            // Send response indicating success
            return res.status(200).json({ success: 'Borrow record and log created successfully' });
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Failed to create borrow record' });
    }
}

async function runTransaction(callback) {
    pool.getConnection(async (error, connection) => {
        if (error) {
            throw error;
        }
        try {
            connection.beginTransaction();
            callback(connection);
            connection.commit();
        } catch (error) {
            connection.rollback();
            throw error;
        } finally {
            connection.release();
        }
    });
}


export { collectRequest };

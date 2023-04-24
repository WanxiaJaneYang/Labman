import moment from 'moment';
import pool from '../../utils/MySQL/db.js';

async function cancelRequest(req, res) {
    let connection;
    try {
        const { request_id } = req.params; // Get the request ID from the URL parameter
        // get the request record with the request_id
        pool.query('SELECT * FROM requests WHERE request_id = ?', [request_id], (error, results) => {
            if (error) {
                console.error(error);
            }
            const requestRecord = Array.isArray(results) ? results[0] : results;
            //console.log(requestRecord);

            // Get the current date and time
            const current_time = moment().format('YYYY-MM-DD HH:mm:ss');
            const { type_id, type_name, student_id, borrow_amount } = requestRecord;

            // Get a connection from the pool
            pool.getConnection((error, conn) => {
                if (error) {
                    console.error(error);
                    res.status(500).json({ error: 'Failed to connect to database' });
                }
                connection = conn;

                // Start a transaction
                connection.beginTransaction((error) => {
                    if (error) {
                        console.error(error);
                    }

                    // Update request_status to 2 (cancelled)
                    connection.query(
                        'UPDATE requests SET request_status = 2 WHERE request_id = ?',
                        request_id,
                        (error) => {
                            if (error) {
                                console.error(error);
                            }

                            // Create a collecting log of the request
                            const requestLog = {
                                type_id,
                                type_name,
                                student_id,
                                borrow_amount,
                                log_type: 3, // 3 = collected
                                log_time: current_time,
                                request_id,
                            };

                            // Insert requestLog into request_Log table
                            connection.query('INSERT INTO request_Log SET ?', requestLog, (error) => {
                                if (error) {
                                    console.error(error);
                                }

                                // Commit the transaction
                                connection.commit((error) => {
                                    if (error) {
                                        console.error(error);
                                    }

                                    // Release the connection back to the pool
                                    connection.release();

                                    // Send response indicating success
                                    res.status(200).json({ success: 'Request is cancelled and log created successfully' });
                                });
                            });
                        },
                    );
                });
            });
        });
    } catch (err) {
        console.error(err);

        // Rollback the transaction on error
        if (connection) {
            connection.rollback(() => {
                connection.release();
            });
        }

        // Send error response
        res.status(500).json({ error: 'Failed to create new request' });
    }
}

export { cancelRequest };

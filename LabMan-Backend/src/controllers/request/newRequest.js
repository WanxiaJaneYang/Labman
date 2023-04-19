import moment from 'moment';
import pool from '../../utils/MySQL/db.js';
async function newRequest(req, res) {
    let connection;
    try {
        const { type_id, user_name, borrow_amount, return_date } = req.body;

        //Get user_id from user_name
        // pool.query('SELECT user_id FROM students_user WHERE user_name = ?', [user_name], (error, results) => {
        //     if (error) {
        //             console.error(err);
        
        //     }
        //     const user_id= Array.isArray(results) ? results[0].user_id : results.user_id;

            // Get type_name from type_id
            pool.query('SELECT type_name FROM equipment_type WHERE type_id = ?', [type_id], (error, results) => {
                if (error) {
                    console.error(err);
                }
                const type_name = Array.isArray(results) ? results[0].type_name : results.type_name;

                // Get the current date and time
                const current_time = moment().format('YYYY-MM-DD HH:mm:ss');

                // Create new request record
                const requestRecord = {
                    // user_id,
                    user_name,
                    type_id,
                    type_name,
                    borrow_amount,
                    request_time: current_time,
                    return_date,
                    request_status: 0, // 0 = pending/new request
                };

                // Get a connection from the pool
                pool.getConnection((error, conn) => {
                    if (error) {
                        console.error(err);
                    }
                    connection = conn;

                    // Start a transaction
                    connection.beginTransaction((error) => {
                        if (error) {
                            console.error(err);                            
                        }

                        // Insert requestRecord into requests table
                        connection.query('INSERT INTO requests SET ?', requestRecord, (error, resultId) => {
                            if (error) {
                                console.error(err);                                
                            }
                            //const [{ insertId }] = resultId;
                            const insertId = Array.isArray(resultId) ? resultId[0].insertId : resultId.insertId;

                            // Create a new request log for the new request
                            const requestLog = {
                                type_id,
                                type_name,
                                // user_id,
                                user_name,
                                borrow_amount,
                                log_type: 0, // 0 = new request
                                log_time: current_time,
                                request_id: insertId,
                            };

                            // Insert requestLog into request_Log table
                            connection.query('INSERT INTO request_Log SET ?', requestLog, (error) => {
                                if (error) {
                                    console.error(err);                                    
                                }

                                // Commit the transaction
                                connection.commit((error) => {
                                    if (error) {
                                        console.error(err);                                        
                                    }

                                    // Release the connection back to the pool
                                    connection.release();

                                    // Send response indicating success
                                    res.status(200).json({ success: 'Request record and log created successfully' });
                                });
                            });
                        });
                    });
                });
            });
        // });
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

export { newRequest };

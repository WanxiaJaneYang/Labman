import moment from 'moment';
import pool from '../../utils/MySQL/db.js';
import runTransaction from "./transaction.js";
import { insertRequestLog } from "./asyncFunctions.js";

function editRequest(req, res) {
    try {
        const { request_id } = req.params; // Get the request ID from the URL parameter
        const { type_name, borrow_amount, return_date } = req.body;
        // return_date = moment(return_date).format("YYYY-MM-DD HH:mm:ss");

        // Get type_id from type_name
        pool.query('SELECT type_id FROM equipment_type WHERE type_name = ?', [type_name], (error, results) => {
            if (error) {
                console.error(err);
                return res.status(500).json({ error: 'Error retrieving type_id' });
            }
            const type_id = Array.isArray(results) ? results[0].type_id : results.type_id;

            // Get the current date and time
            const current_time = moment().format("YYYY-MM-DD HH:mm:ss");

            // find the studeng_id for log insertion
            pool.query('SELECT * FROM requests WHERE request_id = ?', [request_id], (error, results) => {
                if (error) {
                    console.error(error);
                    return;
                }
                //console.log(results);
                if (results[0] === undefined) {
                    return res.status(500).json({ error: 'Error retrieving request record' });
                }
                const student_id = results[0].student_id;
                // Create a collecting log of the request
                const requestLog = {
                    type_id,
                    type_name,
                    student_id,
                    borrow_amount,
                    return_date,
                    log_type: 2, // 2 = edit
                    log_time: current_time,
                    request_id,
                };
                const updateSql = 'UPDATE requests SET type_id=?, type_name=?, borrow_amount=?,return_date=? WHERE request_id=?';

                runTransaction(async (connection) => {
                    // Update the request record
                    connection.query(updateSql, [type_id, type_name, borrow_amount, return_date, request_id], (error,result) => {
                        if (error) {
                            console.error(error);
                            return res.status(500).json({ error: "Failed to update request" });
                        }
                        console.log(result);
                    });

                    // Insert requestLog into request_Log table
                    insertRequestLog(connection, requestLog).catch((error) => {
                        console.error(error);
                        return res.status(500).json({ error: 'Failed to insert request log' });
                    });
                });
            });
        // Send success response
        return res.status(200).json({ success: 'Request updated and log inserted successfully' });
        })

    } catch (error) {
        console.error(error);
        // Send error response
        res.status(500).json({ error: "Failed to update request" });
    }
}

export { editRequest };





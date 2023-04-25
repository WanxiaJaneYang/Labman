import moment from "moment";
import runTransaction from "./transaction.js";
import pool from "../../utils/MySQL/db.js";
import { insertRequestLog } from "./asyncFunctions.js";

function newRequest(req, res) {
    try {
        const { type_id, type_name, student_id, borrow_amount, return_date } = req.body;
        // Get the current date and time
        const current_time = moment().format("YYYY-MM-DD HH:mm:ss");
        //return_date = moment(return_date).format("YYYY-MM-DD HH:mm:ss");

        // Create new request record
        const requestRecord = {
            student_id,
            type_id,
            type_name,
            borrow_amount,
            request_time: current_time,
            return_date,
            request_status: 0, // 0 = pending/new request
        };

        //check if the available amount of type_id more than 0
        const sql = 'SELECT available_amount FROM equipment_type WHERE type_id = ?';

        // Execute the SQL query with the request_id parameter
        pool.query(sql, [type_id], (error, results) => {
            if (error) {
                console.error(err);
                return;
            }
            //console.log(results);

            const amount = results[0].available_amount;
            //console.log(amount);
            if (amount < borrow_amount) {
                return res.status(500).json({ error: "not available" });
            }
            runTransaction(async (connection) => {
                //Insert requestRecord into requests table
                connection.query('INSERT INTO requests SET ?', requestRecord, (error, resultId) => {
                    if (error) {
                        console.error(error);
                        return res.status(500).json({ error: 'Failed to insert record into table requests' });
                    }
                    //console.log(resultId);
                    const insertId = resultId.insertId;

                    // Create a new request log for the new request
                    const requestLog = {
                        type_id,
                        type_name,
                        student_id,
                        borrow_amount,
                        return_date,
                        log_type: 0, // 0 = new request
                        log_time: current_time,
                        request_id: insertId,
                    };

                    // Insert requestLog into request_Log table
                    insertRequestLog(connection, requestLog).catch((error) => {
                        console.error(error);
                        return res.status(500).json({ error: 'Failed to insert request log' });
                    });
                });
            })
        });
        return res.status(200).json({ success: 'Request created successfully' });
    } catch (error) {
        console.error(error);

        // Send error response
        res.status(500).json({ error: "Failed to create new request" });
    }
}

export { newRequest };

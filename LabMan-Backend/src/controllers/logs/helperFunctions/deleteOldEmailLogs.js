import pool from "../../../utils/MySQL/db.js";

export async function deleteOldEmailLogs() {
    try {
        const sql = "DELETE FROM email_log WHERE email_log.date < DATE_SUB(NOW(), INTERVAL 1 MONTH);";
        await pool.query(sql);
    } catch (error) {
        throw new Error("Failded deleting old email logs: " + error.message);
    }
}

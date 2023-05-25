import pool from "../../../utils/MySQL/db.js";
import errorMessages from "../../../utils/constants/errorMessages.js";
import { checkUserExists } from "../../users/helperFunctions/checkUserExists.js";

async function getEnrollbyStudentId(req, res) {
    const { student_id } = req.params;
    try {
        await checkUserExists(pool, student_id);
        const getEnrollQuery = "SELECT enrollment.course_id, course.course_name, course.coordinator_name, course.due_date FROM enrollment JOIN course ON enrollment.course_id = course.course_id WHERE enrollment.student_id = ?";
        const [result] = await pool.query(getEnrollQuery, [student_id]);
        // console.log(result);
        if (result.length === 0) {
            return res.status(404).json({ message: "Not enrolled" });
        } else {
            return res.status(200).json(result);
        }
    } catch (error) {
        console.error(error);
        if (Object.values(errorMessages).includes(error.message)) {
            return res.status(404).json({ error: "Bad request: " + error.message });
        }
        return res.status(500).json({ error: "Internal error: " + error.message });
    }
}

export { getEnrollbyStudentId };
import pool from "../../../utils/MySQL/db.js";
import errorMessages from "../../../utils/constants/errorMessages.js";
import { checkCourseExists } from "../../course/helperFunctions/checkCourseExists.js";
import { checkUserExists } from "../../users/helperFunctions/checkUserExists.js";

async function checkEnrollbyStudentId(req, res) {
    const { student_id, course_id } = req.params;
    try {
        await checkUserExists(pool, student_id);
        await checkCourseExists(pool, course_id);
        const getEnrollQuery = "SELECT * FROM enrollment WHERE course_id = ? AND student_id = ?";
        const [result] = await pool.query(getEnrollQuery, [course_id, student_id]);
        // console.log(result);
        if (result.length === 0) {
            return res.status(200).json({ message: "Not enrolled" });
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

export { checkEnrollbyStudentId };
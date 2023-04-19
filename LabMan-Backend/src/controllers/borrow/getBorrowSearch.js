
import pool from "../../utils/MySQL/db.js";

  
import pool from "../../utils/MySQL/db.js";

function getBorrowSearch(req,res) {

  const { query } = req.query;
  
  pool.query(
    `SELECT borrow_id, students_user.user_id, user_name, borrow.type_id, type_name, borrow_amount, return_date, status, borrow_status
      FROM borrow
      INNER JOIN students_user ON borrow.user_id = students_user.user_id
      INNER JOIN equipment_type ON borrow.type_id = equipment_type.type_id
      WHERE status = 1 AND (borrow_id LIKE '%${query}%' OR user_name LIKE '%${query}%' OR type_name LIKE '%${query}%')`,
    (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Error retrieving borrowed equipments" });
      }
      return res.status(200).json(results);
    }
  );
};
  
export  { getBorrowSearch };
  
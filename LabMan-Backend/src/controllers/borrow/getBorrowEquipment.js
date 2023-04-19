
import pool from "../../utils/MySQL/db.js";

function getBorrowedEquipments(req, res) {

  pool.query(
    `SELECT borrow_id, students_user.user_id, user_name, borrow.type_id, type_name, borrow_amount, return_date, status AS borrow_status
     FROM borrow
     INNER JOIN students_user ON borrow.user_id = students_user.user_id
     INNER JOIN equipment_type ON borrow.type_id = equipment_type.type_id
     WHERE status = 0`,
    (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Error retrieving borrowed equipments" });
      }
      return res.status(200).json(results);
    }
  );
};

export { getBorrowedEquipments };



import pool from "../../utils/MySQL/db.js";

function changeBorrowStatus(req, res) {
  const { id } = req.body;

  // Update the status of the borrowing request to be returned
  pool.query(
    `UPDATE borrow SET status = 1 WHERE borrow_id = ?`,
    [id],
    (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Error returning borrowed equipment" });
      }
      
      // Get the details of the returned borrowing request
      pool.query(
        `SELECT borrow.borrow_id, borrow.user_id, students_user.user_name, borrow.type_id, equipment_type.type_name, borrow.borrow_amount, borrow.return_date
         FROM borrow
         INNER JOIN students_user ON borrow.user_id = students_user.user_id
         INNER JOIN equipment_type ON borrow.type_id = equipment_type.type_id
         WHERE borrow.borrow_id = ?`,
        [id],
        (err, results) => {
          if (err) {
            console.error(err);
            return res.status(500).json({ error: "Error retrieving borrowed equipment details" });
          }

          const borrowedEquipment = results[0];

          // Increase the available amount of the returned device type
          pool.query(
            `UPDATE equipment_type SET available_amount = available_amount + ? WHERE type_id = ?`,
            [borrowedEquipment.borrow_amount, borrowedEquipment.type_id],
            (err, results) => {
              if (err) {
                console.error(err);
                return res.status(500).json({ error: "Error increasing available amount of returned device type" });
              }

              // Insert a log into equipment log table
              pool.query(
                `INSERT INTO eqpmt_log (user_id, eqpmt_type_id, eqpmt_id, eqpmt_log_action) VALUES (?, ?, ?, ?)`,
                [borrowedEquipment.user_id, borrowedEquipment.type_id, borrowedEquipment.borrow_id, "Returned"],
                (err, results) => {
                  if (err) {
                    console.error(err);
                    return res.status(500).json({ error: "Error inserting log into equipment log table" });
                  }

                  // Send a response indicating success
                  return res.status(200).json({ message: "Borrowing request successfully returned" });
                }
              );
            }
          );
        }
      );
    }
  );
};

export  { changeBorrowStatus };

import pool from "../../utils/MySQL/db.js";

function cancelReturn(req, res) {
  const { id } = req.body;

  pool.query(
    `SELECT borrow_id, type_id, borrow_amount FROM borrow WHERE borrow_id = ${id} AND status = 1`,
    (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Error retrieving borrowing information" });
      }

      if (results.length === 0) {
        return res.status(404).json({ error: `Borrowing request with ID ${id} not found or has already been returned` });
      }

      const { borrow_id, type_id, borrow_amount } = results[0];

      pool.query(
        `UPDATE borrow SET status = 0 WHERE borrow_id = ${borrow_id}`,
        (err, results) => {
          if (err) {
            console.error(err);
            return res.status(500).json({ error: "Error updating borrowing status" });
          }

          pool.query(
            `UPDATE equipment_type SET available_amount = available_amount + ${borrow_amount} WHERE type_id = ${type_id}`,
            (err, results) => {
              if (err) {
                console.error(err);
                return res.status(500).json({ error: "Error updating available amount" });
              }

              pool.query(
                `INSERT INTO equipment_log (type_id, borrow_id, action_type) VALUES (${type_id}, ${borrow_id}, 'cancel_return')`,
                (err, results) => {
                  if (err) {
                    console.error(err);
                    return res.status(500).json({ error: "Error inserting log entry" });
                  }

                  return res.status(200).json({ message: "Return request has been canceled successfully" });
                }
              );
            }
          );
        }
      );
    }
  );
}

export { cancelReturn };

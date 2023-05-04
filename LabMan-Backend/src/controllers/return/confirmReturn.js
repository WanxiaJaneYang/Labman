import runTransaction from "../../utils/MySQL/transaction.js";
import { updateRemovableStatus } from "../equipment/asyncFuncEquip.js";
import { insertEquipmentLog } from "../logs/helperFunctions/insertEquipmentLog.js";
import { fetchBorrowingRecord } from "./confirmReturnHelpers/fetchBorrowingRecord.js";
import { fetchEquipmentTypeRecord } from "./confirmReturnHelpers/fetchEquipmentType.js";
import { updateBorrowingRecord } from "./confirmReturnHelpers/updateBorrowingRecord.js";
import { updateEquipmentAvailableAmount } from "./confirmReturnHelpers/updateEquipmentAvailableAmount.js";

const confirmReturn = (req, res) => {
	const borrow_id = req.params.borrow_id;
	const return_amount = parseInt(req.query.return_amount);

	runTransaction(async (connection) => {
		try {
			const borrowingRecord = await fetchBorrowingRecord(connection, borrow_id);
			if (!borrowingRecord) {
				return res.status(404).json({ error: "Borrowing not found" });
			}

			let { borrow_amount, returned_amount, borrow_status, type_id } = borrowingRecord;
			if (return_amount > borrow_amount - returned_amount) {
				return res.status(500).json({ error: "Return amount error" });
			} else {
				returned_amount += return_amount;
				borrow_status = returned_amount == borrow_amount;
				// Update borrowing record
				await updateBorrowingRecord(connection, borrow_id, returned_amount, borrow_status);

				// create equipment log
				const equipmentLog = {
					borrow_id: borrowingRecord.borrow_id,
					type_id: borrowingRecord.type_id,
					type_name: borrowingRecord.type_name,
					student_id: borrowingRecord.student_id,
					borrow_amount: borrowingRecord.borrow_amount,
					log_type: 1,
					log_time: new Date(),
					return_date: borrowingRecord.return_date,
					returned_amount
				};
				insertEquipmentLog(connection, equipmentLog);

				const equipmentTypeRecord = await fetchEquipmentTypeRecord(connection, type_id);
				if (!equipmentTypeRecord) {
					return res.status(404).json({ error: "Equipment type not found" });
				}

				let { total_amount, available_amount, removable } = equipmentTypeRecord;
				console.log(equipmentTypeRecord);
				available_amount += return_amount;

				updateEquipmentAvailableAmount(connection, type_id, available_amount);
				if (available_amount == total_amount) {
					removable = 1;
					updateRemovableStatus(connection, type_id, removable);
				}

				await Promise.all([]).catch((error) => {
					console.error(error);
					return res.status(500).json({ error: "Error processing return request" });
				});

				return res.status(200).json({ success: "Borrow record and equipment updated successfully" });
			}
		} catch (error) {
			console.error(error);
		}
	});
};

export { confirmReturn };

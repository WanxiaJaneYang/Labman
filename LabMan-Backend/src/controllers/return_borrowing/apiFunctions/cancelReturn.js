import runTransaction from "../../../utils/MySQL/transaction.js";
import { insertEquipmentLog } from "../../logs/helperFunctions/insertEquipmentLog.js";
import { fetchBorrowingRecord } from "../helperFunctions/fetchBorrowingRecord.js";
import { updateAvailableAmountAndRemovable } from "../../equipment/helperFunctions/updateAvailableAmountAndRemovable.js";
import { updateReturnedAmount } from "../helperFunctions/updateReturnedAmount.js";
import { updateBorrowingStatus } from "../helperFunctions/updateBorrowingStatus.js";
import errorMessages from "../../../utils/constants/errorMessages.js";

async function cancelReturn(req, res) {
	try {
		const borrow_id = req.params.borrow_id;
		const cancel_return_amount = parseInt(req.query.return_amount);

		await runTransaction(async (connection) => {

			const p1 = await updateReturnedAmount(connection, borrow_id, cancel_return_amount*(-1));

			// create equipment log
			const [borrowingRecord] = await fetchBorrowingRecord(connection, borrow_id);
			const equipmentLog = {
				borrow_id: borrowingRecord.borrow_id,
				type_id: borrowingRecord.type_id,
				type_name: borrowingRecord.type_name,
				student_id: borrowingRecord.student_id,
				borrow_amount: borrowingRecord.borrow_amount,
				log_type: 2,
				log_time: new Date(),
				return_date: borrowingRecord.return_date,
				returned_amount: cancel_return_amount*(-1),
			};
			const p2 = await insertEquipmentLog(connection, equipmentLog);

			const p3 = await updateAvailableAmountAndRemovable(connection, borrowingRecord.type_id, cancel_return_amount*(-1));

			const borrow_status = 0;
			const p4 = await updateBorrowingStatus(connection, borrow_id, borrow_status);

			await Promise.all([p1, p2, p3, p4]);

		});
		return res.status(200).json({ success: "Cancel return equipment successfully" });
	} catch (error) {
		console.error(error);
		if (Object.values(errorMessages).includes(error.message)) {
			return res.status(400).json({ error: "Bad request: " + error.message });
		}
		return res.status(500).json({ error: "Internal error: " + error.message });
	}
}

export { cancelReturn };

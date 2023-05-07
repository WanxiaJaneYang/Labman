import runTransaction from "../../../utils/MySQL/transaction.js";
import { insertEquipmentLog } from "../../logs/helperFunctions/insertEquipmentLog.js";
import { fetchBorrowingRecord } from "../helperFunctions/fetchBorrowingRecord.js";
import { updateAvailableAmount } from "../../equipment/helperFunctions/updateAvailableAmount.js";
import {updateReturnedAmount} from "../helperFunctions/updateReturnedAmount.js";
import errorMessages from "../../../utils/constants/errorMessages.js";

async function confirmReturn(req, res) {
	try {
		const borrow_id = req.params.borrow_id;
		const return_amount = parseInt(req.query.return_amount);

		await runTransaction(async (connection) => {

			const p1=await updateReturnedAmount(connection,borrow_id,return_amount);

			const p2 = await updateAvailableAmountAndRemoveable(connection, type_id, return_amount * (-1));

			// create equipment log
			const borrowingRecord = await fetchBorrowingRecord(connection, borrow_id);
			const equipmentLog = {
				borrow_id: borrowingRecord.borrow_id,
				type_id: borrowingRecord.type_id,
				type_name: borrowingRecord.type_name,
				student_id: borrowingRecord.student_id,
				borrow_amount: borrowingRecord.borrow_amount,
				log_type: 1,
				log_time: new Date(),
				return_date: borrowingRecord.return_date,
				returned_amount: borrowingRecord.returned_amount,
			};

			const borrow_status = borrowingRecord.returned_amount === borrowingRecord.borrow_amount ? 1 : 0;
			const p3 = await updateBorrowingStatus(connection, borrow_id, borrow_status);
			const p4 = await insertEquipmentLog(connection, equipmentLog);

			await Promise.all([p1, p2, p3,p4]);

			return res.status(200).json({ success: "Borrowing record and equipment info updated successfully" });
		});
	} catch (error) {
		console.error(error);
		if (Object.values(errorMessages).includes(error.message)) {
			return res.status(404).json({ error: "Bad request: " + error.message });
		}
		return res.status(500).json({ error: "Internal error: " + error.message });
	}
};

export { confirmReturn };

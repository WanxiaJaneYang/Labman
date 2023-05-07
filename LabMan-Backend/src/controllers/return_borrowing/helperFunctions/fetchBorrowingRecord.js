import errorMessages from "../../../utils/constants/errorMessages.js";

async function fetchBorrowingRecord(connection, borrow_id) {
    const query = "SELECT * FROM borrowings WHERE borrow_id = ?";
    
    try {
        const [results] = await connection.query(query, [borrow_id]);
		if (results.length === 0) {
			throw new Error(errorMessages.BORROWING_DOESNOT_EXIST);
		}
        return results;
    } catch (error) {
		if (Object.values(errorMessages).includes(error.message)) {
			throw new Error(error.message);
		}
		throw new Error("Failed fetch borrowing: "+error.message);
    }
}

export { fetchBorrowingRecord };


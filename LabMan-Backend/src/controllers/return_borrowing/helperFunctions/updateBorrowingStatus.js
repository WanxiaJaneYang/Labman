async function updateBorrowingStatus(connection, borrow_id, status) {
    try {
        const query = "UPDATE borrowings SET borrow_status = ? WHERE borrow_id = ?";
        await connection.query(query, [status, borrow_id]);

    } catch (error) {
        throw new Error("Failed update borrowing status: " + error.message);
    }
}

export { updateBorrowingStatus };
import { Card, Empty, message } from "antd";
import { formatDate } from "../../../../utils/date";
import { getBorrowRecordByStudentId } from "../../../../api/borrow";
import { useEffect, useState } from "react";
import React from "react";

const BorrowingRecordCard = () => {
	const [borrowRecordList, setBorrowRecordList] = useState([]);
	const getBorrowRecords = async () => {
		try {
			const response = await getBorrowRecordByStudentId();
			setBorrowRecordList(response);
		} catch (error) {
			message.error(error.message);
		}
	};

	useEffect(() => {
		getBorrowRecords();
	}, []);

	return (
		<>
			{borrowRecordList.map((borrowRecord) => {
				return (
					<div key={borrowRecord.borrow_id} style={{ margin: "10px 0" }}>
						<Card key={borrowRecord.borrow_id}
							type="inner"
							title={borrowRecord.type_name}
							style={{ width: "auto" }}
						>
							<p>Borrow Date: {formatDate(borrowRecord.borrow_date)}</p>
							<p>Due Date: {formatDate(borrowRecord.return_date)}</p>
							<p>Borrow Amount: {borrowRecord.borrow_amount}</p>
							<p>Returned Amount: {borrowRecord.returned_amount}</p>
						</Card>
					</div>
				);
			})}
			{borrowRecordList.length === 0 && <Empty
				description={
					<span>
						No borrowing record found
					</span>
				}
			/>}
		</>
	);
};

export default BorrowingRecordCard;

import { Card, Divider, Empty, message } from "antd";
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

	return(
		<>
			{borrowRecordList.map((borrowRecord) => {
				return(
					<React.Fragment key={borrowRecord.borrow_id}>
						<Card key={borrowRecord.borrow_id}
							type="inner"
							title={borrowRecord.type_name}
							style={{ width: "auto"}}
						>
							<p>Borrow Date: {formatDate(borrowRecord.borrow_date)}</p>
							<p>Borrow Amount: {borrowRecord.borrow_amount}</p>
							<p>Due Date: {formatDate(borrowRecord.return_date)}</p>
						</Card>
						<Divider/>
					</React.Fragment>
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

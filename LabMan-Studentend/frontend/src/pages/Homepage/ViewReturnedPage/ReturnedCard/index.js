import { Card, message, Empty } from "antd";
import { getReturnedRecord } from "../../../../api/borrow";
import { useEffect, useState } from "react";
import { formatDate } from "../../../../utils/date";
import React from "react";

const ReturnedCard = () => {
	const [returnedRecordList, setReturnedRecordList] = useState([]);
	const getReturnedRecords = async () => {
		try {
			const response = await getReturnedRecord();
			setReturnedRecordList(response);
		} catch (error) {
			message.error(error.message);
		}
	};

	useEffect(() => {
		getReturnedRecords();
	}, []);

	return (
		<>
			{returnedRecordList.map((returnedRecord) => {
				return (
					<div key={returnedRecord.borrow_id} style={{ margin: "10px 0" }}>
						<Card
							key={returnedRecord.borrow_id}
							type="inner"
							title={returnedRecord.type_name}
							style={{ width: "auto" }}
						>
							<p>Borrow Date: {formatDate(returnedRecord.borrow_date)}</p>
							<p>
								Return Date: {formatDate(returnedRecord.actual_return_date)}
							</p>
							<p>Borrow Amount: {returnedRecord.borrow_amount}</p>
						</Card>
					</div>
				);
			})}
			{returnedRecordList.length === 0 && (
				<Empty description={<span>No returned record found</span>} />
			)}
		</>
	);
};

export default ReturnedCard;

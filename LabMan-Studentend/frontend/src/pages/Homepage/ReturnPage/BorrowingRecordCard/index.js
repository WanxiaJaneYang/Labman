import { Card, Divider, message, Space } from "antd";
import { formatDate } from "../../../../utils/date";
import { getBorrowRecordByStudentId } from "../../../../api/borrow";
import { useEffect, useState } from "react";

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
		<Space direction="vertical" >
			{borrowRecordList.map((borrowRecord) => {
				return(
					<>
						<Card key={borrowRecord.borrow_id}
							type="inner"
							title={borrowRecord.type_name}
							style={{ width: "300px", margin: "auto" }}
						>
							<p>Borrow Date: {formatDate(borrowRecord.borrow_date)}</p>
							<p>Borrow Amount: {borrowRecord.borrow_amount}</p>
							<p>Due Date: {formatDate(borrowRecord.return_date)}</p>
						</Card>
						<Divider/>
					</>
				);
			})}
		</Space>
	);
};

export default BorrowingRecordCard;

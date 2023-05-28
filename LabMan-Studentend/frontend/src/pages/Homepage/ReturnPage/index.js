import BorrowingRecordCard from "./BorrowingRecordCard";
import { Button, Divider, Row } from "antd";
import { useNavigate } from "react-router-dom";

const ReturnPage = () => {
	const navigate = useNavigate();

	const onClick = () => {
		navigate("/homepage/return/view");
	};

	return (
		<div>
			<Row justify="start" style={{marginBottom:"0px"}}>
				<Button type="primary" onClick={onClick} >Show Returned Equipment</Button>
			</Row>
			<Divider/>
			<BorrowingRecordCard/>
		</div>
	);
};

export default ReturnPage;
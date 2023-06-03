import BorrowingRecordCard from "./BorrowingRecordCard";
import { Radio, Row } from "antd";
import ViewReturnedPage from "../ViewReturnedPage";
import { useState } from "react";

const ReturnPage = () => {
	const [activePage, setActivePage] = useState("borrowed");

	const onRadioChange = (e) => {
		setActivePage(e.target.value);
	};

	return (
		<div>
			<Row justify="center" style={{ margin: "10px 0 20px 0" }}>
				<Radio.Group onChange={onRadioChange} defaultValue={activePage}>
					<Radio.Button value="borrowed" >Borrowed</Radio.Button>
					<Radio.Button value="returned" >Returned</Radio.Button>
				</Radio.Group>
			</Row>

			{activePage === "borrowed" && <BorrowingRecordCard />}
			{activePage === "returned" && <ViewReturnedPage />}
		</div>
	);
};

export default ReturnPage;
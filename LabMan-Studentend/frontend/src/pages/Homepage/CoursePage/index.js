import CourseCards from "./CourseCard";
import { Radio, Row } from "antd";
import { useState } from "react";
import ViewRequestPage from "../ViewRequestPage";

const CoursePage = () => {
	const [activePage, setActivePage] = useState("viewRequest");

	const onRadioChange = (e) => {
		setActivePage(e.target.value);
	};

	return (
		<div>
			<Row justify="center" style={{ margin: "10px 0 20px 0" }}>
				<Radio.Group onChange={onRadioChange} defaultValue={activePage}>
					<Radio.Button value="viewRequest" >View Request</Radio.Button>
					<Radio.Button value="makeRequest" >Make Request</Radio.Button>
				</Radio.Group>
			</Row>
			{activePage === "makeRequest" && <CourseCards />}
			{activePage === "viewRequest" && <ViewRequestPage />}
		</div>
	);
};

export default CoursePage;

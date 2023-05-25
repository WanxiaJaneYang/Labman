import CourseCards from "./CourseCard";
import { Button,Divider, Row } from "antd";
import { useNavigate } from "react-router";

const CoursePage = () => {
	const navigate = useNavigate();
	const onClick = () => {
		navigate("/homepage/request/view");
	};

	return (
		<div 
			style={{
				marginTop:"20px",
				marginBottom:"20px",
			}}
		>
			<Row justify="start" style={{marginBottom:"0px"}}>
				<Button type="primary" onClick={onClick}>View Request</Button>
			</Row>
			<Divider style={{marginTop:"10px"}}/>
			<CourseCards/>
		</div>
	);
};

export default CoursePage;
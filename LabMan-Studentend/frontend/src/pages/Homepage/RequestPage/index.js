import { Spin, Typography } from "antd";
import { useParams } from "react-router-dom";
import RequestForm from "./RequestForm";
import { useState } from "react";

const { Title } = Typography;

const RequestPage = () => {
	const { course_id } = useParams();
	const [loading, setLoading] = useState(false);

	return (
		<div style={{ position: "relative" }}>
			<Title level={4} style={{ marginLeft: "10px" }}>{course_id}</Title>
			<div
				style={{
					position: "absolute",
					top: "50%",
					left: "50%",
					transform: "translate(-50%, -50%)",
					zIndex: 1
				}}><Spin spinning={loading} /></div>
			<RequestForm setLoading={setLoading} />
		</div>
	);
};

export default RequestPage;
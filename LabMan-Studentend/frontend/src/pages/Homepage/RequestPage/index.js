import { Spin, Typography } from "antd";
import { useParams } from "react-router-dom";
import RequestForm from "./RequestForm";
import { useState } from "react";

const { Title } = Typography;

const RequestPage = () => {
	const { course_id } = useParams();
	const [loading, setLoading] = useState(false);

	return (
		<div>
			<Title level={4} style={{ marginLeft: "10px" }}>{course_id}</Title>
			<Spin spinning={loading}>
				<RequestForm setLoading={setLoading} />
			</Spin>
		</div>
	);
};

export default RequestPage;

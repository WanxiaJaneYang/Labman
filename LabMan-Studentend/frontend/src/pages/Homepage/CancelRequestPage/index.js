import { useParams, useNavigate } from "react-router-dom";
import { cancelRequest } from "../../../api/request";
import { Button, Form, Input, message, Card, Spin } from "antd";
import { useState } from "react";

const CancelRequestPage = () => {
	const { request_id } = useParams();
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);

	const onFinish = async (values) => {
		setLoading(true);
		try {
			values.cancel_reason = values.cancel_reason + " by " + localStorage.getItem("username");
			await cancelRequest(request_id, values);
			message.success("Cancel request successfully");
			navigate("/homepage/request");
		} catch (error) {
			console.log(error);
			message.error(error.message);
		}
		setLoading(false);
	};

	return (
		<div style={{ marginTop: "10px" }}>
			<Card type="inner" title="Cancel Request" style={{ width: "auto" }}>
				<Spin spinning={loading}>
					<Form onFinish={onFinish}>
						<Form.Item name={"cancel_reason"} rules={[{ required: true, message: "Please enter the reason for cancellation" }]} label={"Reason"}>
							<Input.TextArea placeholder={"Please enter the reason for cancellation"} />
						</Form.Item>
						<Button type="primary" htmlType="submit">
							Submit
						</Button>
					</Form>
				</Spin>
			</Card>
		</div>
	);
};

export default CancelRequestPage;

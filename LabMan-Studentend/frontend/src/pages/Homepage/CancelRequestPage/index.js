import { useParams, useNavigate } from "react-router-dom";
import { cancelRequest } from "../../../api/request";
import { Button, Form, Input, message } from "antd";

const CancelRequestPage = () => {
	const { request_id } = useParams();
	const navigate = useNavigate();

	const onFinish = async (values) => {
		try {
			await cancelRequest(request_id, values);
			message.success("Cancel request successfully");
			navigate("/homepage/request/view");
		} catch (error) {
			console.log(error);
			message.error(error.message);
		}
	};

	return (
		<div>
			<Form title="Cancel Request" 
				onFinish={onFinish}
			>
				<Form.Item name={"cancel_reason"} rules={[{required: true, message: "Please enter the reason for cancellation"}]} label={"Cancel Reason"}>
					<Input.TextArea placeholder={"Please enter the reason for cancellation"}/>
				</Form.Item>
				<Button type="primary" htmlType="submit">
                    Submit
				</Button>
			</Form>                    
		</div>
	);
};

export default CancelRequestPage;
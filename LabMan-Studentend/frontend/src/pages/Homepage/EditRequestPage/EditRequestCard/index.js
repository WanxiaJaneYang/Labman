import { Button, Card, Form, InputNumber, Spin, message } from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { putRequest, getRequestListByStudentId } from "../../../../api/request";
import { formatDate } from "../../../../utils/date";
import { getAvailableAmount } from "../../../../api/equipment";

const EditRequestCard = () => {
	const navigate = useNavigate();
	const { request_id } = useParams();
	const [request, setRequest] = useState({
		request_id: "",
		request_time: "",
		borrow_amount: "",
		type_name: "",
	});
	const [request_amount, setRequestAmount] = useState(0);

	const getRequest = async () => {
		try {
			const response = await getRequestListByStudentId();
			const data = await response.find((request) => String(request.request_id) === request_id);
			setRequest(data);
		} catch (error) {
			message.error(error.message);
		}
	};

	const [form] = Form.useForm();
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (request) {
			form.setFieldValue("borrow_amount", request.borrow_amount);
		}
	}, [request]);


	useEffect(() => {
		getRequest();
	}, [request_id]);

	useEffect(() => {
		if (request) {
			form.setFieldsValue({
				borrow_amount: request.borrow_amount
			});
			setRequestAmount(request.borrow_amount);
		}
	}, [request]);

	const amountValidator = async(_, value) => {
		try{
			const available_amount = await getAvailableAmount(request.type_name)+request_amount;
			if (value < 1) {
				return Promise.reject("Amount must be greater than 0");
			} else if (value > request.upper_bound_amount) {
				return Promise.reject("Amount must be less than upper bound amount:" + request.upper_bound_amount);
			}else if (value > available_amount) {
				return Promise.reject("Amount must be less than available amount:" + available_amount);
			}
			return Promise.resolve();
		}catch(error){
			message.error(error.message);
		}
	};


	const onSubmit = async (values) => {
		setLoading(true);
		try {
			const requestForm = {
				...request,
				borrow_amount: values.borrow_amount,
				return_date: formatDate(request.return_date),
			};
			await putRequest(request.request_id, requestForm);
			message.success("Request edited successfully");
			navigate("/homepage/request");
		} catch (error) {
			message.error(error.message);
		}
		setLoading(false);		
	};

	return (
		<Card type="inner" title="Edit Request" style={{ width: "auto" }}>
			<Spin spinning={loading}>
				<Form form={form} onFinish={onSubmit}>
					<Form.Item
						label={request.type_name + " Amount"}
						name={"borrow_amount"}
						rules={[
							{
								required: true,
								message: "Please input the amount you want to borrow"
							},
							{
								validator: amountValidator
							}
						]}
					>
						<InputNumber
							value={request.borrow_amount}
						/>
					</Form.Item>
					<Button type="primary" htmlType="submit" >
						Submit
					</Button>
				</Form>
			</Spin>
		</Card>
	);
};

export default EditRequestCard;
import { Form, message, Select, InputNumber, Button } from "antd";
import { getCoursePackageListByCourseId } from "../../../../api/course";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getPackageById } from "../../../../api/package";
import { MinusCircleOutlined } from "@ant-design/icons";
import { getID } from "../../../../utils";
import { postRequest } from "../../../../api/request";
import {getAvailableAmount} from "../../../../api/equipment";

const RequestForm = ({ setLoading }) => {
	const { course_id } = useParams();
	const navigate = useNavigate();
	const [form] = Form.useForm();
	const [package_id, setPackageId] = useState(null);
	const [packages, setPackages] = useState([]);

	const getPackageList = async (course_id) => {
		try {
			const response = await getCoursePackageListByCourseId(course_id);
			setPackages(response);
		} catch (error) {
			if (error.response.status === 404) {
				message.error("Course has no package!");
			} else {
				message.error(error.message);
			}
		}
	};

	useEffect(() => {
		getPackageList(course_id);
	}, []);

	useEffect(() => {
		getPackageList;
	}, [course_id]);

	useEffect(() => {
		if (package_id) {
			getPackageDetail(package_id);
		}
	}, [package_id]);

	const getPackageDetail = async (package_id) => {
		try {
			const response = await getPackageById(package_id);
			form.setFieldsValue({
				request_items: response,
			});
		} catch (error) {
			if (error.response.status === 404) {
				message.info("Package includes no equipment.");
			} else {
				message.error(error.message);
			}
		}
	};

	const onFinish = async (values) => {
		setLoading(true);
		const student_id = getID();
		try {
			await Promise.all(values.request_items.map(async (item) => {
				const request_values = {
					"student_id": student_id,
					"package_id": values.package_id,
					"type_id": item.type_id,
					"type_name": item.type_name,
					"borrow_amount": item.borrow_amount,
					"upper_bound_amount": item.upper_bound_amount,
				};
				await postRequest(request_values);
			}));
			message.success("Request successfully!");
			navigate("/homepage/request");
		} catch (error) {
			message.error(error.message);
		}
		setLoading(false);
	};

	return (
		<Form form={form} layout="vertical" style={{ padding: "10px" }} onFinish={onFinish}>
			<Form.Item
				name="package_id"
				label="Package"
				rules={[{ required: true }]}
			>
				<Select
					showSearch
					filterOption={(input, option) =>
						option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
					}
					options={packages.map((packageList) => ({
						label: packageList.package_name,
						value: packageList.package_id,
					}))}
					onChange={value => {
						setPackageId(value);
					}}
				/>
			</Form.Item>

			<Form.List name="request_items">
				{(fields, { remove }) => (
					<>
						{fields.map(({ key, name, ...restField }) => (
							<div key={key}>
								<Form.Item
									{...restField}
									label="Equipment Type"
									name={[name, "type_name"]}
									style={{ display: "none" }}
									key={"type_name" + key}
								>
									<InputNumber />
								</Form.Item>
								<Form.Item
									{...restField}
									label="Equipment ID"
									name={[name, "type_id"]}
									style={{ display: "none" }}
									key={"type_id" + key}
								>
									<InputNumber />
								</Form.Item>
								<Form.Item
									{...restField}
									label={
										form.getFieldValue(["request_items", key, "type_name"]) +
										" Amount"
									}
									name={[name, "borrow_amount"]}
									key={"request_amount" + key}
									rules={[
										{ required: true, message: "Please input amount." },
										{
											validator: async (_, value) => {
												const typename = form.getFieldValue([
													"request_items",
													key,
													"type_name",
												]);
												const available_amount = await getAvailableAmount(
													typename
												);

												if (value <= 0) {
													return Promise.reject(
														new Error("Amount should be positive.")
													);
												} else if (
													value >
													form.getFieldValue([
														"request_items",
														key,
														"upper_bound_amount",
													])
												) {
													return Promise.reject(
														new Error("Amount exceeds upper limit.")
													);
												} 
												else if (value > available_amount) {
													return Promise.reject(
														new Error(
															"Amount exceeds available amount."
														)
													);
												}
												else {
													return Promise.resolve();
												}
											},
										},
									]}
								>
									<div style={{ display: "flex", alignItems: "center" }}>
										<InputNumber />
										<MinusCircleOutlined onClick={() => remove(name)} style={{ marginLeft: "10px" }} />
									</div>
								</Form.Item>
								<Form.Item
									{...restField}
									label="Upper Limit"
									name={[name, "upper_bound_amount"]}
									key={"upper_bound_amount" + key}
									style={{ display: "none" }}
								>
									<InputNumber />
								</Form.Item>
							</div>
						))}
					</>
				)}
			</Form.List>
			<Button type="primary" htmlType="submit">Apply</Button>
		</Form>
	);
};

export default RequestForm;

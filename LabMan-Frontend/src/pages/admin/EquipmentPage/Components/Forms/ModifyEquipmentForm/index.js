import { Form, Input, InputNumber } from "antd";
import { useEquipmentContext } from "../../../Context";
import { useEffect } from "react";

const ModifyEquipmentForm = ({ form }) => {
	const { selectedRows } = useEquipmentContext();

	useEffect(() => {
		if (selectedRows && selectedRows.length > 0) {
			form.setFieldsValue({
				type_id: selectedRows[0].type_id,
				type_name: selectedRows[0].type_name,
				available_amount: selectedRows[0].available_amount,
				total_amount: selectedRows[0].total_amount,
			});
		} else {
			form.resetFields();
		}
	}, [selectedRows, form]);

	const validateAvailableAmount = (_, value) => {
		const totalAmount = form.getFieldValue("total_amount");
		if (value <= totalAmount) {
			return Promise.resolve();
		} else {
			return Promise.reject(
				new Error("Available Amount can not be greater than Total Amount")
			);
		}
	};

	return (
		<Form form={form} layout="vertical">
			<Form.Item label="Equipment Type" name="type_name">
				<Input />
			</Form.Item>
			<Form.Item
				label="Available Count"
				name="available_amount"
				rules={[
					{ type: "number", min: 0, message: "Available Amount must be greater than 0" },
					{ validator: validateAvailableAmount },
				]}
			>
				<InputNumber />
			</Form.Item>
			<Form.Item label="Total Count" name="total_amount">
				<InputNumber />
			</Form.Item>
		</Form>
	);
};

export default ModifyEquipmentForm;

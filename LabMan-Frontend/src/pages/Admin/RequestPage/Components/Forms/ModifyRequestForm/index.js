import { DatePicker, Form, Input, InputNumber } from "antd";
import { useRequestRecordContext } from "../../../Context";
import { useEffect } from "react";

function ModifyRequestForm({ form }) {
	const { modalData } = useRequestRecordContext();

	useEffect(() => {
		if (modalData) {
			form.setFieldsValue({
				type_name: modalData.type_name,
				student_id: modalData.student_id,
				borrow_amount: modalData.borrow_amount,
				return_date: modalData.return_date,
			});
		} else {
			form.resetFields();
		}
	}, [modalData, form]);

	return (
		<Form form={form} layout="vertical">
			<Form.Item label="Equipment Name" name="type_name" rules={[{ required: true }]}>
				<Input />
			</Form.Item>
			<Form.Item label="Student ID" name="student_id" rules={[{ required: true }]}>
				<Input />
			</Form.Item>
			<Form.Item label="Amount" name="borrow_amount" rules={[{ required: true }]}>
				<InputNumber />
			</Form.Item>
			<Form.Item label="Return Date" name="return_date" rules={[{ required: true }]}>
				<DatePicker/>
			</Form.Item>
		</Form>
	);

}

export default ModifyRequestForm;

import { Form, Input, InputNumber, DatePicker } from "antd";

function NewRequestRecordForm({ form }) {
	return (
		<Form form={form} layout="vertical">
			<Form.Item label="Equipment Name" name="equipmentType" rules={[{ required: true }]}>
				<Input />
			</Form.Item>
			<Form.Item label="Available Number" name="availableNumber" >

			</Form.Item>
			<Form.Item label="Count" name="count" rules={[{ required: true },{type:Number}]}>
				<InputNumber />
			</Form.Item>
			<Form.Item label="Student ID" name="studentID" rules={[{ required: true },{type:Number}]}>
				<Input />
			</Form.Item>
			<Form.Item label="Due Date" name="dueDate" rules={[{ required: true }]}>
				<DatePicker />
			</Form.Item>
			{/* Add more form items as needed */}
		</Form>
	);
}

export default NewRequestRecordForm;

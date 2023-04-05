import { Form, Input } from "antd";

function NewRequestRecordForm({ form }) {
	return (
		<Form form={form} layout="vertical">
			<Form.Item label="Equipment Name" name="equipmentType" rules={[{ required: true }]}>
				<Input />
			</Form.Item>
			{/* Add more form items as needed */}
		</Form>
	);
}

export default NewRequestRecordForm;

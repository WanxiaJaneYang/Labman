import { Form, Input, InputNumber } from "antd";

function ModifyEquipmentForm({ form }) {
	return (
		<Form form={form} layout="vertical">
			<Form.Item label="Equipment Name" name="equipmentType" rules={[{ required: true }]}>
				<Input />
			</Form.Item>
			<Form.Item label="Total Number" name="totalNumber" rules={[{ required: true },{type:Number}]}>
				<InputNumber />
			</Form.Item>
		</Form>
	);
}

export default ModifyEquipmentForm;

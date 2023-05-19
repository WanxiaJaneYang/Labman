import {Form, InputNumber} from "antd";

const EditEquipmentForm = ({form}) => {

	return (
		<Form form={form} layout="vertical">
			<p>Equipment Type: {form.getFieldValue("type_name")}</p>
			<Form.Item name="upper_bound_amount" label="Amount" rules={[{required: true}]}>
				<InputNumber min={1}/>
			</Form.Item>
			<Form.Item name="type_name" hidden={true} />
			<Form.Item name="type_id" hidden={true} />
		</Form>
	);
};

export default EditEquipmentForm;
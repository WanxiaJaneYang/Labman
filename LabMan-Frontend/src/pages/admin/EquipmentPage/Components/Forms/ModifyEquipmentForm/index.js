import {Form, Input, InputNumber} from "antd";
import {useEquipmentContext} from "../../../Context";

const ModifyEquipmentForm = ({form}) => {
	const {selectedRow} = useEquipmentContext();

	return (
		<Form form={form} layout="vertical" initialValues={{
			type_id: selectedRow.type_id,
			type_name: selectedRow.type_name,
			available_amount: selectedRow.available_amount,
			total_amount: selectedRow.total_amount,
		}}>
			<Form.Item label="Equipment Type" name="type_name" >
				<Input/>
			</Form.Item>
			<Form.Item label="Available Count" name="available_amount" >
				<InputNumber />
			</Form.Item>
			<Form.Item label="Total Count" name="total_amount" >
				<InputNumber/>
			</Form.Item>
		</Form>
	);
    
};

export default ModifyEquipmentForm;
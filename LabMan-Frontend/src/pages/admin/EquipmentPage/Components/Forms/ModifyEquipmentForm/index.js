import {Form, Input, InputNumber} from "antd";
import {useEquipmentContext} from "../../../Context";
import {useEffect} from "react";

const ModifyEquipmentForm = ({form}) => {
	const {selectedRow} = useEquipmentContext();
	useEffect(() => {
		if (selectedRow) {
			form.setFieldsValue({
				type_id: selectedRow.type_id,
				type_name: selectedRow.type_name,
				available_amount: selectedRow.available_amount,
				total_amount: selectedRow.total_amount,
			});
		} else {
			form.resetFields();
		}
	}, [selectedRow, form]);
	
	
	return (
		<Form form={form} layout="vertical" >
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
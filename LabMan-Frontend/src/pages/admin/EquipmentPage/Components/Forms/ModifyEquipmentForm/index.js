import {Form, Input, InputNumber} from "antd";
import {useEquipmentContext} from "../../../Context";

const ModifyEquipmentForm = ({form}) => {
	const {selectedRow} = useEquipmentContext();

	return (
		<Form form={form} layout="vertical" initialValues={{
			equipmentType: selectedRow.equipmentType,
			count: selectedRow.count,
			availableCount: selectedRow.availableCount,
		}}>
			<Form.Item label="Equipment Type" name="equipmentType" >
				<Input/>
			</Form.Item>
			<Form.Item label="Available Count" name="availableCount" >
				<InputNumber />
			</Form.Item>
			<Form.Item label="Total Count" name="count" >
				<InputNumber/>
			</Form.Item>
		</Form>
	);
    
};

export default ModifyEquipmentForm;
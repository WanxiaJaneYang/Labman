import {Form, message, Select, InputNumber} from "antd";
import {useEffect, useState} from "react";
import {getEquipmentData} from "../../../../../../api/equipment";

const EditEquipmentForm = ({form}) => {
	const [equipmentTypeList, setEquipmentTypeList] = useState([]);

	useEffect(() => {
		getEquipmentData().then((data) => {
			setEquipmentTypeList(data);
		}).catch((error) => {
			message.error(error.message);
		}
		);
	}, []);

	return (
		<Form form={form} layout="vertical">
			<Form.Item name="type_id" label="Equipment Type" rules={[{required: true}]}>
				<Select
					showSearch
					defaultValue={form.getFieldValue("type_id")}
					style={{width: 200}}
					optionFilterProp="children"
					filterOption={(input, option) => (option?.label ?? "").includes(input)}
					filterSort={(optionA, optionB) =>
						(optionA?.label ?? "").toLowerCase().localeCompare((optionB?.label ?? "").toLowerCase())
					}
					options={equipmentTypeList.map((type) => {
						return {
							value: type.type_id,
							label: type.type_name,
						};
					}
					)}
				/>
			</Form.Item>
			<Form.Item name="upper_bound_type_amount" label="Amount" rules={[{required: true}]}>
				<InputNumber min={1}/>
			</Form.Item>
		</Form>
	);
};

export default EditEquipmentForm;
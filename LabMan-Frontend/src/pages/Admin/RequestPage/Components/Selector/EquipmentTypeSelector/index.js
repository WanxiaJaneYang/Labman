import { Select } from "antd";
import { useEffect } from "react";
import {useRequestRecordContext} from "../../../Context";

const EquipmentTypeSelector = () => {
	const {equipmentTypeList, getEquipmentTypeList, setSelectedEquipmentType, selectedEquipmentType} = useRequestRecordContext();

	useEffect(() => {
		getEquipmentTypeList();
	}, []);

	return (
		<Select
			showSearch
			style={{ width: 200 }}
			value={selectedEquipmentType}
			onChange={(value) => {setSelectedEquipmentType(value);}}
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
			})}
		/>
	);
	
};

export default EquipmentTypeSelector;
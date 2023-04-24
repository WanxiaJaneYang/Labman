import { Select } from "antd";
import { useEffect } from "react";
import {useRequestRecordContext} from "../../../Context";

const EquipmentTypeSelector = () => {
	const {equipmentTypeList, getEquipmentTypeList, setSelectedEquipmentType} = useRequestRecordContext();

	useEffect(() => {
		getEquipmentTypeList();
	}, []);

	return (
		<Select
			showSearch
			style={{ width: 200 }}
			onChange={(value) => {setSelectedEquipmentType(value);}}
			placeholder="Search to Select"
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
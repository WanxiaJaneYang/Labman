import { SearchOutlined } from "@ant-design/icons";
import { Button} from "antd";
import { Input, Space } from "antd";
import { useReturnRecordContext } from "../../../ReturnRecordContext";
import { useState } from "react";

const SearchReturnRecord = () => {
	const [searchParams, setSearchParams] = useState({
		student_id: "",
		type_name: "",
	}); 
	const {onSearch} = useReturnRecordContext();

	const onClick = () => {
		console.log("onClick, searchParams:", searchParams);
		onSearch(searchParams);
	};

	const onIDInputChange = (e) => {
		setSearchParams({
			...searchParams,
			student_id:e.target.value,
		});
	};

	const onEquipmentInputChange = (e) => {
		setSearchParams({
			...searchParams,
			type_name:e.target.value,
		});
	};

	return (
		<Space>
			<Input 
				onChange={onIDInputChange}
				placeholder="Input Student ID" 
				allowClear />
			<Input 
				onChange={onEquipmentInputChange}
				placeholder="Input Equipment Type" 
				allowClear
			/>
			<Button 
				type="primary" 
				icon={<SearchOutlined />}
				onClick={onClick}
			>
				Search
			</Button>
		</Space>
	);
};

export default SearchReturnRecord;
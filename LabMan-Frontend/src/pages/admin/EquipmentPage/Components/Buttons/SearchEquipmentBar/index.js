import { SearchOutlined } from "@ant-design/icons";
import { Button, Tooltip } from "antd";
import { Input, Select, Space } from "antd";

const options = [
	{
		value: "equipmentID",
		label: "Equipment ID",
	},
	{
		value: "equipmentType",
		label: "Equipment Type",
	},
];

const SearchEquipmentBar = ({ onClick }) => {
	return (
		<Space.Compact>
			<Select defaultValue="equipmentType" options={options} />
			<Input defaultValue="input" />
			<Tooltip title="Search">
				<Button
					type="primary"
					shape="circle"
					icon={<SearchOutlined />}
					onClick={onClick}
				/>
			</Tooltip>
		</Space.Compact>
	);
};

export default SearchEquipmentBar;
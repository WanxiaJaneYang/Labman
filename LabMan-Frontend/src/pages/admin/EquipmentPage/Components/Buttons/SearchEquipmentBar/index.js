import {Input} from "antd";
import { useEquipmentContext } from "../../../Context";

const {Search} = Input;
const SearchEquipmentBar = () => {
	const {onEquipmentSearch} = useEquipmentContext();
	const onSearch = (value) => {
		console.log("onSearch, value:", value);
		onEquipmentSearch(value);
	};

	return (
		<Search placeholder="Input Equipment Type" onSearch={onSearch} enterButton />
	);
};

export default SearchEquipmentBar;
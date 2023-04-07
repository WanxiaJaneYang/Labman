import {Input} from "antd";
import { useStudentContext } from "../../../Context/StudentContext";

const {Search} = Input;
const SearchStudentBar = () => {
	const {onStudentSearch} = useStudentContext();
	const onSearch = (value) => {
		console.log("onSearch, value:", value);
		onStudentSearch(value);
	};

	return (
		<Search placeholder="input student id" onSearch={onSearch} enterButton />
	);
};

export default SearchStudentBar;
import {Input} from "antd";
import { useCourseContext } from "../../Context";
const {Search} = Input;

const SearchCourseBar = () => {
	const {onCourseSearch} = useCourseContext();

	const onSearch = (value) => {
		console.log("onSearch, value:", value);
		onCourseSearch(value);
	};

	return (
		<Search placeholder="Input Course Code/Name" onSearch={onSearch} enterButton />
	);
};

export default SearchCourseBar;
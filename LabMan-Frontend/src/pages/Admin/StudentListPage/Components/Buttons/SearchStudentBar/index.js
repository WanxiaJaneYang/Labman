import {Input} from "antd";

const {Search} = Input;
const SearchStudentBar = () => {
	
	const onSearch = (value) => {
		console.log("onSearch, value:", value);
		
	};

	return (
		<Search placeholder="Input Student ID" onSearch={onSearch} enterButton />
	);
};

export default SearchStudentBar;
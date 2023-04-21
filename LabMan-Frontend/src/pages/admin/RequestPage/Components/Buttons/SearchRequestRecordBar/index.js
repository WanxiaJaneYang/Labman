import {Input, Select, Space } from "antd";
import { useState } from "react";
// import { useRequestRecordContext } from "../../../Context";

const SearchRequestRecordBar = () => {
	const [optionValue, setOptionValue] = useState("student_id");

	const { Search } = Input;

	const options = [
		{
			value: "student_id",
			label: "Student ID",
		},
		{
			value: "type_name",
			label: "Equipment Type",
		},
	];

	// const {onSearch}=useRequestRecordContext();

	const onClick = (value) => {
		const searchValue = {
			[optionValue]: value,
		};

		console.log(searchValue);
	};

	const onSelect = (value) => {
		setOptionValue(value);
	};

	return (
		<Space.Compact>
			<Select defaultValue="studentID" options={options} onSelect={onSelect}/>
			<Search
				placeholder="input search text"
				allowClear
				onSearch={onClick}
				style={{ width: 200 }}
				enterButton
			/>
		</Space.Compact>
	);
};

export default SearchRequestRecordBar;
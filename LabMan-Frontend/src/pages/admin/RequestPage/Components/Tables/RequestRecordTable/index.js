import { Table } from "antd";

const columns = [
	{
		title: "Time",
		dataIndex: "time",
		sorter: true,
	},
	{
		title: "Name",
		dataIndex: "name",
		responsive: ["md"],
	},
	{
		title: "Student ID",
		dataIndex: "studentID",
	},
	{
		title: "Equipment Type",
		dataIndex: "equipmentType",
	},
	{
		title: "Count",
		dataIndex: "count",
		responsive: ["md"],
	},
];

const RequestRecordTable = (props) => {
	const rowSelection = {
		onChange: (selectedRowKeys, selectedRows) => {
			console.log(`selectedRowKeys: ${selectedRowKeys}`, "selectedRows: ", selectedRows);
			props.onRowSelected(selectedRows[0]);
		},
		getCheckboxProps: (record) => ({
			disabled: record.name === "Disabled User",
			// Column configuration not to be checked
			name: record.name,
		}),
	};

	return (
		<Table
			columns={columns}
			rowSelection={{
				type: "radio",
				...rowSelection,
			}}
			rowKey={(record) => record.login?.uuid || record.id} // Use id as a fallback when uuid is not available
			dataSource={props.data} // Use data from props instead of the local state
			pagination={props.pagination}
			onChange={props.handleTableChange}
			scroll={{ x: "max-content" }}
		/>
	);
};

export default RequestRecordTable;

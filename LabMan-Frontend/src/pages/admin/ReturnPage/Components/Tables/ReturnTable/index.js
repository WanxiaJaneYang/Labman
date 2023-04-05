import { Table } from "antd";
const columns = [
	{
		title: "Due day",
		dataIndex: "dueDay",
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
	{
		title: "Status",
		dataIndex: "status",
		responsive: ["md"],
	},
];

const ReturnTable = (props) => {
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
			rowKey={(record) => record.login.uuid}
			dataSource={props.data}
			loading={props.loading}
			onChange={props.handleTableChange}
			scroll={{ x: "max-content" }}
		/>
	);
};

export default ReturnTable;

import { Table } from "antd";
import { useStudentContext } from "../../../Context/StudentContext";

const columns = [
	{
		title: "Student ID",
		dataIndex: "user_name",
	}
];

const StudentTable = () => {
	const { data, loading, tableParams, handleTableChange, onRowSelected, selectedRows } = useStudentContext();

	const rowSelection = {
		selectedRowKeys: selectedRows ? selectedRows.map((row) => row.user_id) : [],
		onChange: (selectedRowKeys, selectedRows) => {
			console.log(`selectedRowKeys: ${selectedRowKeys}`, "selectedRows: ", selectedRows);
			onRowSelected(selectedRows);
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
			rowKey={(record) => record.user_id}
			rowSelection={rowSelection}
			dataSource={data}
			pagination={tableParams.pagination}
			loading={loading}
			onChange={handleTableChange}
			scroll={{ x: "max-content" }}
		/>
	);
};

export default StudentTable;
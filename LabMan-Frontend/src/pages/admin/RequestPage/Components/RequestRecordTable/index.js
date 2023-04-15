import { Table } from "antd";
import { useRequestRecordContext } from "../../Context";

const columns = [
	{
		title: "Request Time",
		dataIndex: "request_time",
	},
	{
		title: "Student ID",
		dataIndex: "user_name",
	},
	{
		title: "Equipment Type",
		dataIndex: "type_name",
	},
	{
		title: "Borrow Amount",
		dataIndex:"borrow_amount",
		Responsive: ["md"],
	},
	{
		title: "Due Time",
		dataIndex: "return_date",
		Responsive: ["md"],
	},
	{
		title: "Status",
		dataIndex: "status",
		Responsive: ["md"],
	}
];

const RequestRecordTable = () => {
	const {selectedRows, onRowSelection, data, loading, pagination, setTableParams} = useRequestRecordContext();

	const rowSelection = {
		selectedRowKeys: selectedRows ? selectedRows.map((row) => row.request_id) : [],
		onChange: (selectedRowKeys, selectedRows) => {
			console.log(`selectedRowKeys: ${selectedRowKeys}`, "selectedRows: ", selectedRows);
			onRowSelection(selectedRows);
		},
		getCheckboxProps: (record) => ({
			disabled: record.name === "Disabled User",
			// Column configuration not to be checked
			name: record.name,
		}),
	};

	const handleTableChange = (pagination, filters, sorter) => {
		setTableParams({
			pagination: pagination,
			sorter: sorter,
			filters: filters,
		});
	};

	return (
		<Table
			columns={columns}
			rowSelection={rowSelection}
			rowKey={(record) => record.request_id} // Use request_id as the key
			dataSource={data} // Use data from props instead of the local state
			loading={loading}
			pagination={pagination}
			onChange={handleTableChange}
			scroll={{ x: "max-content" }}
		/>
	);
};

export default RequestRecordTable;

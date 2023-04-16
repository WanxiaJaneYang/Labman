import { Table } from "antd";
import { useRequestRecordContext } from "../../Context";

const RequestRecordTable = () => {
	const {selectedRows, setSelectedRows, data, loading, tableParams, handleTableChange} = useRequestRecordContext();
	const columns = [
		{
			title:"Request Time",
			dataIndex:"request_time",
			sorter: true,
		},
		{
			title:"Equipment Name",
			dataIndex:"type_name",
			filters: [
				{
					text: "Macbook Pro",
					value: "Macbook Pro",
				},
				{
					text: "Macbook Air",
					value: "Macbook Air",
				},
			],
		},
		{
			title:"Student ID",
			dataIndex:"user_name",
		},
		{
			title:"Amount",
			dataIndex:"borrow_amount",
		},
		{
			title:"Status",
			dataIndex:"status",
			render: (text, record) => {
				if (record.status === 0) {
					return <span>Pending</span>;
				} else if (record.status === 1) {
					return <span>Approved</span>;
				} else if (record.status === 2) {
					return <span>Rejected</span>;
				}
			},
		},
	];

	const rowSelection = {
		selectedRowKeys: selectedRows ? selectedRows.map((row) => row.request_id) : [],
		onChange: (selectedRowKeys, selectedRows) => {
			console.log(`selectedRowKeys: ${selectedRowKeys}`, "selectedRows: ", selectedRows);
			setSelectedRows(selectedRows);
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
			rowSelection={rowSelection}
			rowKey={(record) => record.request_id} // Use request_id as the key
			dataSource={data} // Use data from props instead of the local state
			loading={loading}
			pagination={tableParams.pagination}
			onChange={handleTableChange}
			scroll={{ x: "max-content" }}
		/>
	);
};

export default RequestRecordTable;

import { Table } from "antd";
import { useReturnRecordContext } from "../../../ReturnRecordContext";
const ReturnTable = () => {
	const { data, loading, setSelectedRows, handleTableChange, tableParams} = useReturnRecordContext();
	const columns = [
		{
			title: "Borrow Time",
			dataIndex: "borrow_date",
			sorter: true,
		},
		{
			title: "Due Time",
			dataIndex: "return_date",
			sorter: true,
		},
		{
			title: "Equipment Name",
			dataIndex: "type_name",
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
			title: "Student ID",
			dataIndex: "user_name",
		},
		{
			title: "Amount",
			dataIndex: "borrow_amount",
		},

	];

	const rowSelection = {
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
			rowKey={(record) => record.borrow_id}
			dataSource={data}
			loading={loading}
			onChange={handleTableChange}
			pagination={tableParams.pagination}
			scroll={{ x: "max-content" }}
		/>
	);
};

export default ReturnTable;

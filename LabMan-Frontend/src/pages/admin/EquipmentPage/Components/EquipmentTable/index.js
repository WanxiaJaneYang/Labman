import { Table } from "antd";
import { useEffect } from "react";
import { useEquipmentContext } from "../../Context";

const columns = [
	{
		title: "Equipment Type",
		dataIndex: "type_name",
	},
	{
		title: "Available Amount",
		dataIndex: "available_amount",
	},
	{
		title: "Total Amount",
		dataIndex: "total_amount",
	},

];

const EquipmentTable = () => {
	const { data, loading, fetchData, tableParams, onTableChange, onRowSelected, selectedRows } = useEquipmentContext();

	useEffect(() => {
		fetchData();
	}, [JSON.stringify(tableParams)]);

	const rowSelection = {
		selectedRowKeys: selectedRows ? selectedRows.map((row) => row.type_id) : [],
		onChange: (selectedRowKeys, selectedRows) => {
			console.log(`selectedRowKeys: ${selectedRowKeys}`, "selectedRows: ", selectedRows);
			onRowSelected(selectedRows);//modify this line so we could set row as some identifier
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
			rowKey={(record) => record.type_id}
			rowSelection={rowSelection}
			dataSource={data}
			pagination={tableParams.pagination}
			loading={loading}
			onChange={onTableChange}
			scroll={{ x: "max-content" }}
		/>
	);
};

export default EquipmentTable;
import { Table } from "antd";
import { useEffect } from "react";
import { useEquipmentContext } from "../../Context";
import ModifyStudentModal from "../Modals/ModifyEquipmentModal";

const EquipmentTable = () => {
	const { data, loading, fetchData, tableParams, setTableParams, setSelectedRows, selectedRows, setModalData,setModifyModalVisible } = useEquipmentContext();
	
	const columns = [
		{
			title: "Equipment Type",
			dataIndex: "type_name",
			render: (text,record ) => (
				<>
					<a onClick={()=>HandleEditClick(record)}>{text}</a>
					<ModifyStudentModal/>
				</>
			),
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

	const HandleEditClick = (record) => {
		setModalData(record);
		setModifyModalVisible(true);
		console.log("open modify modal");
	};


	useEffect(() => {
		fetchData();
	}, []);

	const rowSelection = {
		selectedRowKeys: selectedRows ? selectedRows.map((row) => row.type_id) : [],
		onChange: (selectedRowKeys, selectedRows) => {
			console.log(`selectedRowKeys: ${selectedRowKeys}`, "selectedRows: ", selectedRows);
			setSelectedRows(selectedRows);//modify this line so we could set row as some identifier
		},
	};

	const onTableChange = (pagination, filters, sorter) => {
		setTableParams({
			pagination,
			filters,
			...sorter,
		});
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
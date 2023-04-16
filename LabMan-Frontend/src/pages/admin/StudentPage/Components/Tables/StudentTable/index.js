import { Space, Table } from "antd";
import { useStudentContext } from "../../../Context/StudentContext";
import ShowStudentDetailModal from "../../Modals/ShowStudentDetailModal";
import ModifyStudentModal from "../../Modals/ModifyStudentModal";
import { useEffect } from "react";

const StudentTable = () => {
	const { data,fetchData, loading, tableParams, setTableParams, selectedRows, setSelectedRows,setModalData, detailModalVisible, setDetailModalVisible, modifyModalVisible, setModifyModalVisible } = useStudentContext();

	const showDetailModal = () => {
		console.log("showing detail modal");
		setDetailModalVisible(true);
		console.log("detail modal visible:",detailModalVisible);
	};

	const handelDetailClick = (record) => {
		console.log("detail being clicked record:",record);
		setModalData(record);
		showDetailModal();
	};

	const handelModifyClick = (record) => {
		console.log("modify being clicked record:",record);
		setModalData(record);
		showModifyModal();
	};

	const showModifyModal = () => {
		console.log("showing modify modal");
		setModifyModalVisible(true);
		console.log("modify modal visible:",modifyModalVisible);
	};

	useEffect(() => {
		fetchData();
	}, [JSON.stringify(tableParams)]);

	const handleTableChange = (pagination, filters, sorter) => {
		setTableParams({
			pagination,
			filters,
			...sorter,
		});
		fetchData();
	};

	const columns = [
		{
			title: "Student ID",
			dataIndex: "user_name",
			render: (_, record) => {
				return (
					<>
						<Space>
							<p>{record.user_name}</p>
							<a onClick={()=>handelDetailClick(record)}>Details</a>
							<a onClick={()=>handelModifyClick(record)} >Modify</a>
						</Space>
						<ShowStudentDetailModal/>
						<ModifyStudentModal/>
					</>
				);
			},
		}
	];

	const rowSelection = {
		selectedRowKeys: selectedRows ? selectedRows.map((row) => row.user_id) : [],
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
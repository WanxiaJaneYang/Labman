import { Table } from "antd";
import { useStudentContext } from "../../../Context/StudentContext";
import ModifyStudentModal from "../../Modals/ModifyStudentModal";
import { useEffect } from "react";

const StudentTable = () => {
	const { data,fetchData, loading, tableParams, setTableParams, selectedRows, setSelectedRows,setModalData, setModifyModalVisible } = useStudentContext();
	
	const handelModifyClick = (record) => {
		setModalData(record);
		showModifyModal();
	};

	const showModifyModal = () => {
		setModifyModalVisible(true);
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
			render: (text, record) => {
				return (
					<>
						<a onClick={() => handelModifyClick(record)}>{text}</a>
						<ModifyStudentModal/>
					</>
				);
			},
		}
	];

	const rowSelection = {
		selectedRowKeys: selectedRows ? selectedRows.map((row) => row.user_id) : [],
		onChange: (selectedRowKeys, selectedRows) => {
			setSelectedRows(selectedRows);
		},
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
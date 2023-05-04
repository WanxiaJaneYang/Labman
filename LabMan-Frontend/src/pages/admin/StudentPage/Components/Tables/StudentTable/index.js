import { Table } from "antd";
import { useStudentContext } from "../../../Context/StudentContext";
import ShowStudentDetailModal from "../../Modals/ShowStudentDetailModal";
import { useEffect } from "react";

const StudentTable = () => {
	const { data, fetchData, loading, tableParams, setTableParams, selectedRows, setSelectedRows,setModalData, setDetailModalVisible } = useStudentContext();
	
	const handleClick = (record) => {
		setModalData(record);
		setDetailModalVisible(true);
	};

	useEffect(() => {
		fetchData();
	}, []);

	const handleTableChange = (pagination, filters, sorter) => {
		setTableParams({
			pagination,
			filters,
			...sorter,
		});
	};

	const columns = [
		{
			title: "Student ID",
			dataIndex: "student_id",
			render: (text, record) => {
				return (
					<>
						<a onClick={() => handleClick(record)}>{text}</a>
						<ShowStudentDetailModal/>
					</>
				);
			},
		}
	];

	const rowSelection = {
		selectedRowKeys: selectedRows ? selectedRows.map((row) => row.student_id) : [],
		onChange: (selectedRowKeys, selectedRows) => {
			setSelectedRows(selectedRows);
		},
	};

	return (
		<Table
			columns={columns}
			rowKey={(record) => record.student_id}
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
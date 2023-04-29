import { Table } from "antd";
import { useActionHistoryContext } from "../../Context";
import { useEffect, useState } from "react";
import EquipmentModal from "../Modals/EquipmentModal";
import RequestModal from "../Modals/RequestModal";
import "./style.css";

const ActionHistoryTable = () => {
	const {data, fetchData, loading, tableParams, setTableParams, tableSelection} = useActionHistoryContext();

	const [equipmentVisible, setEquipmentVisible] = useState(false);
	const [requestVisible, setRequestVisible] = useState(false);
	const [modalData, setModalData] = useState([]);

	const columns = [
		{
			title: "Equipment Name",
			dataIndex: "type_name",
		},
		{
			title: "Student ID",
			dataIndex: "student_id",
		},
		{
			title: "Action",
			dataIndex: "log_type",
			render: (text) => {
				return getStatus(text);
			}
		},
		{
			title: "Time",
			dataIndex: "log_time",
			render: (text) => {
				const date = new Date(text);
				const year = date.getFullYear();
				const month = date.getMonth() + 1;
				const day = date.getDate();

				return `${year}-${month}-${day}`;
			}
		},
	];

	const getStatus = (status) => {
		if(tableSelection === "request"){
			if (status === "0") {
				return "Generated";
			}else if (status === 1) {
				return "Collected";
			}else if (status === 2) {
				return "Edit";
			}else if (status === 3) {
				return "Cancelled";
			}
		}else if(tableSelection === "equipment"){
			if (status === 0) {
				return "Borrowed";
			}else if (status === 1) {		
				return "Returned";
			}else if (status === 2) {
				return "Cancelled";
			}
		}
	};

	const handleTableChange = (pagination) => {
		setTableParams({
			...tableParams,
			pagination: {
				...tableParams.pagination,
				current: pagination.current,
				pageSize: pagination.pageSize,
			},
		});
	};

	useEffect(() => {
		fetchData();
	}, []);

	useEffect(() => {
		setTableParams({
			...tableParams,
			pagination: {
				...tableParams.pagination,
				total: data?data.length:0,
			},
		});
	}, [data]);

	useEffect(() => {
	},[equipmentVisible, requestVisible]);

	const onRow = (record) => {
		return {
			onClick: () => {
				if(tableSelection === "request"){
					setModalData(record);
					setRequestVisible(true);
				}else if(tableSelection === "equipment"){
					setModalData(record);
					setEquipmentVisible(true);
				}
			},
		};
	};

	return (
		<>
			<Table
				columns={columns}
				dataSource={data}
				pagination={tableParams.pagination}
				onChange={handleTableChange}
				loading={loading}
				rowKey={(record) => record?record.log_id:""}
				onRow={onRow}
				rowClassName={"row-hover-cursor"}
			/>
			{tableSelection=="equipment" && equipmentVisible && <EquipmentModal
				visible={equipmentVisible}
				setVisible={setEquipmentVisible}
				data={modalData}
			/>}
			{tableSelection=="request" && requestVisible &&<RequestModal
				visible={requestVisible}
				setVisible={setRequestVisible}
				data={modalData}
			/>}
		</>
	);
};


export default ActionHistoryTable;
import { Table, message } from "antd";
import { useRequestRecordContext } from "../../Context";
import { useEffect, useState } from "react";
import EditRequestModal from "../Modals/EditRequestModal";
import "./style.css";

const RequestRecordTable = () => {
	const {
		selectedRows, 
		setSelectedRows, 
		data, 
		fetchData,
		loading, 
		tableParams, 
		setTableParams, 
		equipmentTypeList, 
		getEquipmentTypeList,
		setModalData,
	} = useRequestRecordContext();

	const [modalVisibal, setModalVisibal] = useState(false);

	const columns = [
		{
			title:"Request Time",
			dataIndex:"request_time",
			render: (text, record) => {
				return formatDate(record.request_time);
			},
			responive: ["md"],
		},
		{
			title:"Equipment Name",
			dataIndex:"type_name",
			filters: equipmentTypeList.map((type) => {
				return {
					text: type.type_name,
					value: type.type_name,
				};
			}),
		},
		{
			title:"Student ID",
			dataIndex:"student_id",
		},
		{
			title:"Amount",
			dataIndex:"borrow_amount",
		},
		// {
		// 	title:"Status",
		// 	dataIndex:"request_status",
		// 	render: (text, record) => {
		// 		if (record.request_status === 0) {
		// 			return <span>Pending</span>;
		// 		} else if (record.request_status === 1) {
		// 			return <span>Collected</span>;
		// 		}else if (record.request_status === 2) {
		// 			return <span>Cancelled</span>;
		// 		}
		// 	},
		// 	filters: [
		// 		{
		// 			text: "Pending",
		// 			value: 0,
		// 		},
		// 		{
		// 			text: "Collected",
		// 			value: 1,
		// 		},
		// 		{
		// 			text: "Cancelled",
		// 			value: 2,
		// 		},
		// 	],
		// 	responive: ["md"],				
		// },
		{
			title:"Due Date",
			dataIndex:"return_date",
			render: (text) => {
				return formatDate(text);
			},
			responsive: ["md"],
		},
	];

	const formatDate = (dateString) => {
		const date = new Date(dateString);
		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, "0");
		const day = String(date.getDate()).padStart(2, "0");
		return `${year}-${month}-${day}`;
	};

	const rowSelection = {
		selectedRowKeys: selectedRows ? selectedRows.map((row) => row.request_id) : [],
		onChange: (selectedRowKeys, selectedRows) => {
			setSelectedRows(selectedRows);
		},
	};

	useEffect(() => {
		getEquipmentTypeList();
		fetchData();
	}, []);

	useEffect(() => {
		try{
			setTableParams({
				...tableParams,
				pagination: {
					...tableParams.pagination,
					total: data.length,
				},
			});
		}catch(err){
			message.error(err.message);
		}
	}, [data]);

	const handleTableChange = (pagination, filters) => {
		setTableParams({
			...tableParams,
			pagination: pagination,
			filters: filters,
		});
	};

	const onRow = (record) => {
		return {
			onClick: () => {
				setModalData(record);
				setModalVisibal(true);
			},
		};
	};
	
	const hideModal = () => {
		setModalVisibal(false);
	};

	return (
		<>
			<Table
				columns={columns}
				rowSelection={rowSelection}
				rowKey={(record) => record.request_id} 
				dataSource={data}
				loading={loading}
				pagination={tableParams.pagination}
				onChange={handleTableChange}
				scroll={{ x: "max-content" }}
				onRow={onRow}
				rowClassName={() => "hover-row"}
			/>
			<EditRequestModal open={modalVisibal} hideModal={hideModal}/>
		</>
	);
};

export default RequestRecordTable;

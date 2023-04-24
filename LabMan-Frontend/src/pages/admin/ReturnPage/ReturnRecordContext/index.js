import { message } from "antd";
import { createContext, useContext, useState } from "react";
import Prosime from "promise";

const ReturnRecordContext = createContext();

export const useReturnRecordContext = () => {
	return useContext(ReturnRecordContext);
};

const ReturnRecordProvider = ({ children }) => {
	const apiURL = "http://localhost:3008/return";
	const[loading,setLoading] = useState(false);
	const [selectedRows, setSelectedRows] = useState(null);
	const [data, setData] = useState([]);
	const [EquipmentTypeList, setEquipmentTypeList] = useState([]);
	const [modalData, setModalData] = useState(null);
	const [modalVisible, setModalVisible] = useState(false);

	const [tableParams, setTableParams] = useState({
		pagination: {
			current: 1,
			pageSize: 10,
			showSizeChanger: true, 
			pageSizeOptions: ["5", "10", "20", "50"],
		},
	});

	const fetchData = async () => {
		try{
			setLoading(true);
			await getBorrowedRecords();
			setLoading(false);
		}
		catch(error){
			message.error(error.message);
		}
	};

	const getBorrowedRecords = async () => {
		try {
			const response = await fetch(apiURL);
			if (response.ok) {
				const data = await response.json();
				setData(data);
			}else{
				const err = await response.json();
				throw new Error(err.error);
			}
		} catch (error) {
			message.error(error.message);
		}
	};

	const onReturnEquipment = async () => {
		try{
			await Prosime.all(selectedRows.map((row) => returnEquipment(row)));
			message.success("Return equipment successfully");
			setSelectedRows(null);
			fetchData();
		}
		catch(error){
			message.error(error.message);
		}
	};

	const returnEquipment = async (row) => {
		const url= `${apiURL}/${row.request_id}/`;
		
		try{
			const response = await fetch(url,{
				method: "PATCH",
			});
			if(!response.ok){
				const err = await response.json();
				throw new Error(err.error);
			}
		}
		catch(error){
			message.error(error.message);
		}
	};
	
	const getEquipmentTypeList = async () => {
		try {
			const response = await fetch("http://localhost:3008/equipment");
			if (response.ok) {
				const data = await response.json();
				setEquipmentTypeList(data);
			}else{
				const err = await response.json();
				throw new Error(err.error);
			}
		} catch (error) {
			message.error(error.message);
		}
	};

	const onSearch = async (values) => {
		setLoading(true);
		await searchBorrowRecord(values);
		setLoading(false);
	};

	const searchBorrowRecord = async (values) => {
		try{
			const urlParams= new URLSearchParams(values);
			const response = await fetch(`${apiURL}/?${urlParams}`);
			if (response.ok) {
				const data = await response.json();
				message.success("Borrow Record Found");
				setData(data);
			}else{
				const err = await response.json();
				throw new Error(err.error);
			}
		}
		catch(error){
			message.error(error.message);
		}
	};
	
	const value = {
		loading,
		selectedRows,
		setSelectedRows,
		data,
		setData,
		tableParams,
		setTableParams,
		fetchData,
		onReturnEquipment,
		EquipmentTypeList,
		getEquipmentTypeList,
		modalData,
		setModalData,
		modalVisible,
		setModalVisible,
		onSearch,
	};

	return (
		<ReturnRecordContext.Provider value={value}>
			{children}
		</ReturnRecordContext.Provider>
	);
};


export default ReturnRecordProvider;

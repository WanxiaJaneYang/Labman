import { createContext, useContext, useState } from "react";
import { message } from "antd";

const RequestRecordContext = createContext();

export const useRequestRecordContext = () => {
	return useContext(RequestRecordContext);
};

const RequestRecordProvider = ({ children }) => {
	// declare variables
	const apiURL = "http://localhost:3008/request";
	const [loading,setLoading] = useState(false);
	const [selectedRows, setSelectedRows] = useState(null);
	const [data, setData] = useState([]);
	const [equipmentTypeList, setEquipmentTypeList] = useState([]);
	const [editModalVisible, setEditModalVisible] = useState(false);
	const [modalData, setModalData] = useState(null);
	const [selectedEquipmentType, setSelectedEquipmentType] = useState(null);
	const [availableNumber, setAvailableNumber] = useState(null);
	const [tableParams, setTableParams] = useState({
		pagination: {
			current: 1,
			pageSize: 10,
			showSizeChanger: true, 
			pageSizeOptions: ["5", "10", "20", "50"],
		},
		filters: {
			request_status: [0],
		},
	});

	//fetch data
	const fetchData = async () => {
		try{
			setLoading(true);
			const data = await getRequest();
			setData(data);
			setTableParams({
				...tableParams,
				pagination: {
					...tableParams.pagination,
					total: data.length,
				},
			});		
			setLoading(false);
		} catch (error) {
			message.error(error.message);
		}
	};

	const getRequest= async () => {
		try {
			const response = await fetch(apiURL);
			if (response.ok) {
				const data = await response.json();
				return data;
			} else {
				const errorData = await response.json();
				throw new Error(errorData.error);
			}
		} catch (error) {
			message.error(error.message);
		}
	};

	const onAdd = async (values) => {
		await addNewRequest(values);
		await fetchData();
	};

	const addNewRequest = async (values) => {
		const requestParams = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(values),
		};
		try {
			const response = await fetch(apiURL, requestParams);
			if (response.ok) {
				const data = await response.json();
				message.success(data.message);
			} else {
				const errorData = await response.json();
				throw new Error(errorData.error);
			}
		} catch (error) {
			message.error(error.message);
		}
	};

	const onCancelRequest= async () => {
		try{
			selectedRows.map(async (row) => {
				await cancelRequest(row.request_id);
			});
			await fetchData();
		}catch(error){
			message.error(error.message);
		}
	};

	const cancelRequest = async (request_id) => {
		const url=apiURL+"/cancel/"+request_id;
		try {
			const response = await fetch(url, {method: "PATCH"});
			if (response.ok) {
				const data = await response.json();
				message.success(data.message);
			} else {
				const errorData = await response.json();
				throw new Error(errorData.error);
			}
		}catch (error) {
			message.error(error.message);
		}
	};

	const onCollect= async () => {
		try{
			selectedRows.map(async (row) => {
				await collectRequest(row.request_id);
			});
			await fetchData();
		}catch(error){
			message.error(error.message);
		}
	};

	const collectRequest = async (request_id) => {
		const url=apiURL+"/collect/"+request_id;
		try {
			const response = await fetch(url, {method: "PATCH"});
			if (response.ok) {
				const data = await response.json();
				message.success(data.message);
			} else {
				const errorData = await response.json();
				throw new Error(errorData.error);
			}
		}catch (error) {
			message.error(error.message);
		}
	};

	const onEdit = async (values) => {
		await editRequest(values);
		await fetchData();
	};

	const editRequest = async (values) => {
		const url=apiURL+"/"+values.request_id;
		const requestParams = {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(values),
		};
		try {
			const response = await fetch(url, requestParams);
			if (response.ok) {
				const data = await response.json();
				message.success(data.message);
			} else {
				const errorData = await response.json();
				throw new Error(errorData.error);
			}
		} catch (error) {
			message.error(error.message);
		}
	};

	const onSearch = async (values) => {
		await searchRequest(values);
		await fetchData();
	};

	const searchRequest = async (values) => {
		const urlParams = new URLSearchParams(values).toString();
		const url = apiURL + "/search?" + urlParams;
		const requestParams = {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		};
		try {
			const response = await fetch(url, requestParams);
			if (response.ok) {
				const data = await response.json();
				message.success(data.message);
			} else {
				const errorData = await response.json();
				throw new Error(errorData.error);
			}
		} catch (error) {
			message.error(error.message);
		}
	};

	const getEquipmentTypeList = async () => {
		const url = "http://localhost:3008/equipment";
		try {
			const response = await fetch(url);
			if (response.ok) {
				const data = await response.json();
				setEquipmentTypeList(data);
			} else {
				const errorData = await response.json();
				throw new Error(errorData.error);
			}
		} catch (error) {
			console.error(error.message);
		}
	};

	const getAvailableNumber = async () => {
		const searchParams = new URLSearchParams({type_name: selectedEquipmentType}).toString();
		const url = "http://localhost:3008/equipment?" + searchParams;

		try {
			console.log("fetching available number from ", url);
			const response = await fetch(url);
			if (response.ok) {
				const data = await response.json();
				console.log("response ok, data is ", data);
				setAvailableNumber(data[0].available_number);
				console.log("setting available number as :",data[0].available_amount);
			} else {
				const errorData = await response.json();
				throw new Error(errorData.error);
			}
		} catch (error) {
			message.error(error.message);
		}
	};

	const searchStudentID = async (student_id) => {
		const url = "http://localhost:3008/users/" + student_id;
		try {
			const response = await fetch(url);
			if (response.ok) {
				return true;
			} else {
				return false;
			}
		} catch (error) {
			message.error(error.message);
			return false;
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
		onAdd,
		onCancelRequest,
		onCollect,
		onEdit,
		onSearch,
		equipmentTypeList,
		getEquipmentTypeList,
		editModalVisible,
		setEditModalVisible,
		modalData,
		setModalData,
		selectedEquipmentType,
		setSelectedEquipmentType,
		availableNumber,
		getAvailableNumber,
		searchStudentID,
	};

	return (
		<RequestRecordContext.Provider value={value}>
			{children}
		</RequestRecordContext.Provider>
	);
};

export default RequestRecordProvider;

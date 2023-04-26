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
	const [modalData, setModalData] = useState(null);
	const [equipmentTypeList, setEquipmentTypeList] = useState([]);
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
			const urlParams = new URLSearchParams({request_status:0}).toString();
			const url=apiURL+"?"+urlParams;
			const response = await fetch(url);
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
		setTimeout(() => {
			fetchData();
		}, 1000);
	};

	const addNewRequest = async (values) => {
		try {
			const response = await fetch(apiURL, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(values),
			});
			if (response.ok) {
				const data = await response.json();
				message.success(data.success);
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
			await Promise.all(selectedRows.map(async (row) => {
				cancelRequest(row.request_id);
				setTimeout(() => {
					fetchData();
				}, 2000);
			}));
			message.success("Request Cancelled Successfully!");
			setSelectedRows([]);
		}catch(error){
			message.error(error.message);
		}
	};

	const cancelRequest = async (request_id) => {
		const url=apiURL+"/cancel/"+request_id;
		try {
			const response = await fetch(url, {method: "PATCH"});
			if (response.ok) {
				return;
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
			await Promise.all(selectedRows.map(async (row) => {
				collectRequest(row.request_id);
				setTimeout(() => {
					fetchData();
				}, 1000);
			}));
			message.success("Collection Confirmed Successfully!");
			setSelectedRows([]);
		}catch(error){
			message.error(error.message);
		}

	};

	const collectRequest = async (request_id) => {
		const url=apiURL+"/collect/"+request_id;
		try {
			const response = await fetch(url, {method: "PATCH"});
			if (response.ok) {
				return;
			} else {
				const errorData = await response.json();
				throw new Error(errorData.error);
			}
		}catch (error) {
			message.error(error.message);
		}
	};

	const onEdit = async (values) => {
		console.log(values);
		await editRequest(values);
		setTimeout(() => {
			fetchData();
		}, 1000);
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
				message.success(data.success);
			} else {
				const errorData = await response.json();
				throw new Error(errorData.error);
			}
		} catch (error) {
			message.error(error.message);
		}
	};

	const onSearch = async (values) => {
		setLoading(true);
		const data =await searchRequest(values);
		setData(data);
		setLoading(false);
	};

	const searchRequest = async (values) => {
		values.request_status=0;
		const urlParams= new URLSearchParams(values);
		const url = `${apiURL}/?${urlParams}`;
		
		try {
			const response = await fetch(url);
			if (response.ok) {
				const data = await response.json();
				message.success("Data Found");
				return data;
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
			message.error(error.message);
		}
	};

	const getAvailableNumber = async () => {
		const searchParams = new URLSearchParams({type_name: selectedEquipmentType}).toString();
		const url = "http://localhost:3008/equipment?" + searchParams;

		try {
			const response = await fetch(url);
			if (response.ok) {
				const data = await response.json();
				setAvailableNumber(data[0].available_number);
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
		modalData,
		setModalData,
		onAdd,
		onCancelRequest,
		onCollect,
		onEdit,
		onSearch,
		equipmentTypeList,
		getEquipmentTypeList,
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

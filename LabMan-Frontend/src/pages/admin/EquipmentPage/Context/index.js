import { createContext, useContext, useState } from "react";

const EquipmentContext = createContext();

export const useEquipmentContext = () => {
	return useContext(EquipmentContext);
};

const EquipmentProvider = ({ children }) => {
	//declare variables
	const apiURL = "http://localhost:3008/equipment";
	const [selectedRows, setSelectedRows] = useState(null);
	const [data, setData] = useState([]);//data used by table
	const [modalData, setModalData] = useState(null);
	const [modifyModalVisible, setModifyModalVisible] = useState(false);
	const [loading, setLoading] = useState(false);//loading effect of table
	const [tableParams, setTableParams] = useState({
		pagination: {
			current: 1,
			pageSize: 10,
			showSizeChanger: true, 
			pageSizeOptions: ["5", "10", "20", "50"], 
		},
	});
	
	// function to fetch the data
	const fetchData = async () => {
		setLoading(true);
		const data = await getEquipmentData();
		setData(data);
		setLoading(false);
		setTableParams({
			...tableParams,
			pagination: {
				...tableParams.pagination,
				total: data.length,
			},
		});
	};

	// function to get the equipment data
	const getEquipmentData = async () => {
		try {
			const response = await fetch(apiURL);
			if (response.ok) {
				const data = await response.json();
				console.log("getEquipmentData, data:", data);
				return data;
			} else {
				throw new Error("Something went wrong");
			}
		} catch (error) {
			console.log(error);
		}
	};

	// function called when the user submit a new equipment form
	const onFormSubmit = async (values) => {
		console.log("onFormSubmit, values:", values);
		// await mockCreateRecord(values);
		await addEquipment(values);
		await fetchData();
	};

	//function to call the api to add equipment
	const addEquipment = async (values) => {
		console.log("addEquipent, values:", values);
		// set the request parameters
		const requestParams = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(values),
		};

		//get the response
		try {
			const response = await fetch(apiURL, requestParams);
			if (response.ok) {
				const data = await response.json();
				console.log(data.message);
			} else {
				throw new Error("Something went wrong");
			}
		}
		catch (error) {
			console.log("addEquipent, error:", error);
		}
	};

	//mock function to create a new record
	// const mockCreateRecord = (values) => {
	// 	return new Promise((resolve) => {
	// 		setTimeout(() => {
	// 			resolve(setData(data.concat(
	// 				{
	// 					...values,
	// 					type_id: data.length + 1,
	// 				}
						
	// 			)));
	// 		}, 1000);
	// 	});
	// };

	const onDelete = async() => {
		console.log("row deleted:", selectedRows);
		await  Promise.all(selectedRows.map((item) => deleteEquipment(item.type_id)));
		await fetchData();
		setSelectedRows([]);
		// modify later to delete the data from the database and fetch data again
	};

	// function to call the api to delete equipment
	const deleteEquipment = async (type_id) => {
		console.log("deleteEquipment, type_id:", type_id);
		// set the request parameters
		const URL = apiURL + "/" + type_id;
		const requestParams = {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
		};

		//get the response
		try {
			const response = await fetch(URL, requestParams);
			if (response.ok) {
				const data = await response.json();
				console.log(data.message);
			} else {
				throw new Error("Something went wrong");
			}
		}
		catch (error) {
			console.log("deleteEquipment, error:", error);
		}
	};

	// const mockDeleteRecord = (type_id) => {
	// 	return new Promise((resolve) => {
	// 		setTimeout(() => {
	// 			resolve(setData(prevData => prevData.filter((item) => item.type_id !== type_id)));
	// 		}, 1000);
	// 	});
	// };

	// function to handle the search
	const onEquipmentSearch =  async(value) => {
		console.log("onEquipmentSearch, searchParams:", value);
		setLoading(true);
		const data=await searchEquipment(value);
		setData(data);
		setLoading(false);
	};

	// function to call the api to search equipment
	const searchEquipment = async (type_name) => {
		const searchParams = new URLSearchParams({type_name: type_name});
		const url=apiURL + "?" + searchParams.toString();
		console.log("searchEquipment, value:", value);
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
				console.log("data.message:",data.message);
				return data;
			} else {
				throw new Error("Something went wrong");
			}
		}
		catch (error) {
			console.log("searchEquipment, error:", error);
		}
	};

	// const mockSearchRecord = (type_name) => {
	// 	return new Promise((resolve) => {
	// 		setTimeout(() => {
	// 			console.log("before search, data:", data);
	// 			resolve(setData(data.filter((item) => item.type_name === type_name)));
	// 			console.log("mockSearchRecord, data:", data);
	// 		}, 1000);
	// 	});
	// };

	// function to handle the modify
	const onModify = async (value) => {
		console.log("onModify, form value:", value);
		await editEquipment(value);
		await fetchData();
		setSelectedRows([]);
	};

	// function to call the api to edit equipment
	const editEquipment = async (value) => {
		const url = apiURL + "/" + value.type_id;
		console.log("editEquipment, value:", value);
		const requestParams = {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(value),
		};

		try {
			const response = await fetch(url, requestParams);
			console.log("response:", response);
			if (response.ok) {
				const data = await response.json();
				console.log(data.message);
			} else {
				throw new Error("Something went wrong");
			}
		}
		catch (error) {
			console.log("editEquipment, error:", error);
		}
	};

	// const mockModifyRecord = (value) => {
	// 	return new Promise((resolve) => {
	// 		setTimeout(() => {
	// 			console.log("before modify, data:", data);
	// 			resolve(setData(
	// 				data.map((item) => {
	// 					if (item.type_id === selectedRows[0].type_id) {
	// 						return {
	// 							...item,
	// 							...value,
	// 						};
	// 					}
	// 					return item;
	// 				}
	// 				)));
	// 			console.log("mockModifyRecord, data:", data);
	// 		}, 1000);
	// 	});
	// };			

	// export the context value
	const value = {
		selectedRows,
		setSelectedRows,
		data,
		setData,
		modalData,
		setModalData,
		modifyModalVisible,
		setModifyModalVisible,
		loading,
		tableParams,
		setTableParams,
		fetchData,
		onFormSubmit,
		onDelete,
		onEquipmentSearch,
		onModify,
	};

	return (
		<EquipmentContext.Provider value={value}>
			{children}
		</EquipmentContext.Provider>
	);
};

export default EquipmentProvider;

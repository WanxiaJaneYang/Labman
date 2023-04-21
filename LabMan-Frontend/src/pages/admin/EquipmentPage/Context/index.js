import { createContext, useContext, useState } from "react";
import {message} from "antd";
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
				return data;
			} else {
				throw new Error("Something went wrong");
			}
		} catch (error) {
			message.error(error.message);
		}
	};

	// function called when the user submit a new equipment form
	const onFormSubmit = async (values) => {
		// await mockCreateRecord(values);
		await addEquipment(values);
		await fetchData();
	};

	//function to call the api to add equipment
	const addEquipment = async (values) => {
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
				message.success(data.message);
			} else {
				throw new Error("Something went wrong");
			}
		}
		catch (error) {
			message.error(error.message);
		}
	};

	const onDelete = async() => {
		await  Promise.all(selectedRows.map((item) => deleteEquipment(item.type_id)));
		await fetchData();
		setSelectedRows([]);
		// modify later to delete the data from the database and fetch data again
	};

	// function to call the api to delete equipment
	const deleteEquipment = async (type_id) => {
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
				message.success(data.message);
			}else if(response.status === 404) {
				message.error("Equipment not found");
			}else {
				const errorData = await response.json();
				message.error(errorData.error);
			}
		}
		catch (error) {
			message.error("An error occurred while deleting the equipment type.");
		}
	};

	// function to handle the search
	const onEquipmentSearch =  async(value) => {
		setLoading(true);
		const data=await searchEquipment(value);
		setData(data);
		setTableParams({
			...tableParams,
			pagination: {
				...tableParams.pagination,
				total: data.length,
			},
		});
		setLoading(false);
	};

	// function to call the api to search equipment
	const searchEquipment = async (type_name) => {
		const searchParams = new URLSearchParams({type_name: type_name});
		const url=apiURL + "?" + searchParams.toString();
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
				return data;
			} else if(response.status === 404) {
				message.error("Equipment not found");
				return [];
			}else {
				throw new Error("Something went wrong");
			}
		}
		catch (error) {
			message.error(error.message);
		}
	};

	// function to handle the modify
	const onModify = async (value) => {
		await editEquipment(value);
		await fetchData();
		setSelectedRows([]);
	};

	// function to call the api to edit equipment
	const editEquipment = async (value) => {
		const url = apiURL + "/" + value.type_id;
		const requestParams = {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(value),
		};

		try {
			const response = await fetch(url, requestParams);
			if (response.ok) {
				const data = await response.json();
				message.success(data.message);
			} else if(response.status === 404) {
				message.error("Equipment not found");
			}else {
				throw new Error("Something went wrong");
			}
		}
		catch (error) {
			message.error(error.message);
		}
	};	

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

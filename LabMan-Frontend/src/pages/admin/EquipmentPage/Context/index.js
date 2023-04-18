import { createContext, useContext, useState } from "react";

const EquipmentContext = createContext();

export const useEquipmentContext = () => {
	return useContext(EquipmentContext);
};

const EquipmentProvider = ({ children }) => {
	//declare variables
	const [selectedRows, setSelectedRows] = useState(null);
	const [data, setData] = useState([
		// {
		// 	type_id: 1,
		// 	type_name: "Microscope",
		// 	available_amount: 1,
		// 	total_amount: 1,
		// },
		// {
		// 	type_id: 2,
		// 	type_name: "Spectrophotometer",
		// 	available_amount: 1,
		// 	total_amount: 1,
		// }
	]);//data used by table
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
		const apiURL = "/api/equipments";
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
		const apiURL = "/API:/equipments";
		// set the request parameters
		const requestParams = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				type_name: values.type_name,
				available_amount: values.available_amount,
				total_amount: values.total_amount,
			}),
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
		setSelectedRows([]);
		// modify later to delete the data from the database and fetch data again
	};

	// function to call the api to delete equipment
	const deleteEquipment = async (type_id) => {
		const apiURL = "/API:/equipments/delete";
		console.log("deleteEquipment, type_id:", type_id);
		const requestParams = {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				type_id: type_id,
			}),
		};

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
		setTableParams({
			...tableParams,
			pagination: {
				...tableParams.pagination,
				total: data.length,
			},
		});
	};

	// function to call the api to search equipment
	const searchEquipment = async (type_name) => {
		const apiURL = "/API:/equipments/search";
		console.log("searchEquipment, value:", value);
		const requestParams = {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				type_name:type_name,
			}),
		};

		try {
			const response = await fetch(apiURL, requestParams);
			if (response.ok) {
				const data = await response.json();
				console.log(data.message);
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
		const apiURL = "/API:/equipments/edit";
		console.log("editEquipment, value:", value);
		const requestParams = {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				type_id: value.type_id,
				type_name: value.type_name,
				type_description: value.type_description,
			}),
		};

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

import React, { createContext, useContext, useState, useEffect } from "react";
// import qs from "qs";

const EquipmentContext = createContext();

export const useEquipmentContext = () => {
	return useContext(EquipmentContext);
};

const EquipmentProvider = ({ children }) => {
	const [selectedRow, setSelectedRow] = useState(null);
	const [data, setData] = useState([
		{
			equipmentType: "Microscope",
			availableCount: 10,
			count: 10,
		},
		{
			equipmentType: "Incubator",
			availableCount: 20,
			count: 20,
		},
		{
			equipmentType: "Centrifuge",
			availableCount: 30,
			count: 30,
		},
	]);
	const [loading, setLoading] = useState(false);
	const [tableParams, setTableParams] = useState({
		pagination: {
			current: 1,
			pageSize: 10,
			showSizeChanger: true, // Add this line
			pageSizeOptions: ["5", "10", "20", "50"], // Add this line
		},
	});
	
	const fetchData = async () => {
		setLoading(true);
		setData(data);
		setLoading(false);
		setTableParams({
			...tableParams,
			pagination: {
				...tableParams.pagination,
				total: data.length,
				// 200 is mock data, you should read it from server
				// total: data.totalCount,
			},
		});

		// fetch(`https://randomuser.me/api?${qs.stringify(getRandomuserParams(tableParams))}`)
		// 	.then((res) => res.json())
		// 	.then(({ results }) => {
		// 		setData(results);
		// 		setLoading(false);
		// 		setTableParams({
		// 			...tableParams,
		// 			pagination: {
		// 				...tableParams.pagination,
		// 				total: 200,
		// 				// 200 is mock data, you should read it from server
		// 				// total: data.totalCount,
		// 			},
		// 		});
		// 	});
	};

	// const getRandomuserParams = (params) => ({
	// 	results: params.pagination?.pageSize,
	// 	page: params.pagination?.current,
	// 	...params,
	// });

	useEffect(() => {
		fetchData();
	}, [JSON.stringify(tableParams)]);

	const onFormSubmit = async (values) => {
		// Call the mock function to create a new record and pass the form values
		const newRecord = await mockCreateRecord(values);
		// Add the new record to the 'data' state to update the table
		setData((prevData) => [...prevData, newRecord]);
	};

	const mockCreateRecord = (values) => {
		return new Promise((resolve) => {
			setTimeout(() => {
				resolve({ id: Date.now(), ...values });
			}, 1000);
		});
	};

	const onTableChange = (pagination, filters, sorter) => {
		setTableParams({
			pagination,
			filters,
			...sorter,
		});
		fetchData();
	};

	const onRowSelected = (row) => {
		console.log("onRowSelected, set row as:",row);
		setSelectedRow(row);
	};

	const onDelete = async() => {
		console.log("row deleted:", selectedRow);
		await mockDeleteRecord(selectedRow.equipmentType);
		setSelectedRow(null);
		// modify later to delete the data from the database and fetch data again
	};

	const mockDeleteRecord = (equipmentType) => {
		return new Promise((resolve) => {
			setTimeout(() => {
				resolve(setData(data.filter((item) => item.equipmentType !== equipmentType)));
			}, 1000);
		});
	};

	const onEquipmentSearch =  async(value) => {
		console.log("onEquipmentSearch, searchParams:", value);
		await mockSearchRecord(value);
		//modify later to call the api to get the data
	};

	const mockSearchRecord = (equipmentType) => {
		return new Promise((resolve) => {
			setTimeout(() => {
				console.log("before search, data:", data);
				resolve(setData(data.filter((item) => item.equipmentType === equipmentType)));
				console.log("mockSearchRecord, data:", data);
			}, 1000);
		});
	};


	const onModify = async (value) => {
		console.log("onModify, form value:", value);
		await mockModifyRecord(value);
		// called by the modify button and pass 2 param back:equipmentId|equipmentType, searchValue
		//call the api to get the data
	};

	const mockModifyRecord = (value) => {
		return new Promise((resolve) => {
			setTimeout(() => {
				console.log("before modify, data:", data);
				resolve(setData(
					data.map((item) => {
						if (item.equipmentType === selectedRow.equipmentType) {
							return {
								...item,
								...value,
							};
						}
						return item;
					}
					)));
				console.log("mockModifyRecord, data:", data);
			}, 1000);
		});
	};
			


	const value = {
		selectedRow,
		data,
		setData,
		loading,
		tableParams,
		setTableParams,
		fetchData,
		onTableChange,
		onRowSelected,
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

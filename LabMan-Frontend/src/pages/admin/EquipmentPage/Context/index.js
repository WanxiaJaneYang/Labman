import React, { createContext, useContext, useState, useEffect } from "react";
import qs from "qs";

const EquipmentContext = createContext();

export const useEquipmentContext = () => {
	return useContext(EquipmentContext);
};

const EquipmentProvider = ({ children }) => {
	const [selectedRow, setSelectedRow] = useState(null);
	const [data, setData] = useState([]);
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
		fetch(`https://randomuser.me/api?${qs.stringify(getRandomuserParams(tableParams))}`)
			.then((res) => res.json())
			.then(({ results }) => {
				setData(results);
				setLoading(false);
				setTableParams({
					...tableParams,
					pagination: {
						...tableParams.pagination,
						total: 200,
						// 200 is mock data, you should read it from server
						// total: data.totalCount,
					},
				});
			});
	};

	const getRandomuserParams = (params) => ({
		results: params.pagination?.pageSize,
		page: params.pagination?.current,
		...params,
	});

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
		setSelectedRow(row);
	};

	const onDelete = async () => {
		// Call the mock function to delete the record and pass the id or other unique identifier
		setData(data);
	};

	const onSearch = async () => {
		// called by the search button and pass 2 param back:equipmentId|equipmentType, searchValue
		//call the api to get the data
		setData(data);
	};

	const value = {
		selectedRow,
		setSelectedRow,
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
		onSearch,
	};

	return (
		<EquipmentContext.Provider value={value}>
			{children}
		</EquipmentContext.Provider>
	);
};

export default EquipmentProvider;

import React, { createContext, useContext, useState } from "react";
import { useEffect } from "react";
// Add an import statement for your API functions
// import { createRecord, fetchRecords } from './your-api';

const ReturnRecordContext = createContext();

export const useReturnRecordContext = () => {
	return useContext(ReturnRecordContext);
};

const ReturnRecordProvider = ({ children }) => {
	const[loading,setLoading] = useState(false);
	const [selectedRow, setSelectedRow] = useState(null);
	const [data, setData] = useState([]);
	const [tableParams, setTableParams] = useState({
		pagination: {
			current: 1,
			pageSize: 10,
		},
	});

	const fetchData = async () => {
		// Set the 'loading' state to true to show the loading indicator
		setLoading(true);
		// Call the API function to fetch the data and update the 'data' state
		// const fetchedData = await fetchRecords(/* ...params */);
		// setData(fetchedData);
		// Set the 'loading' state to false to hide the loading indicator
		setLoading(false);
	};

	const handleFormSubmit = async (values) => {
		// Call the mock function to create a new record and pass the form values
		const newRecord = await mockCreateRecord(values);
		// Add the new record to the 'data' state to update the table
		setData((prevData) => [...prevData, newRecord]);
	};

	useEffect(() => {
		fetchData();
	}, [JSON.stringify(tableParams)]);

	const mockCreateRecord = (values) => {
		return new Promise((resolve) => {
			setTimeout(() => {
				resolve({ id: Date.now(), ...values });
			}, 1000);
		});
	};
	
	const value = {
		loading,
		selectedRow,
		setSelectedRow,
		data,
		setData,
		tableParams,
		setTableParams,
		fetchData,
		handleFormSubmit,
	};

	return (
		<ReturnRecordContext.Provider value={value}>
			{children}
		</ReturnRecordContext.Provider>
	);
};

export default ReturnRecordProvider;

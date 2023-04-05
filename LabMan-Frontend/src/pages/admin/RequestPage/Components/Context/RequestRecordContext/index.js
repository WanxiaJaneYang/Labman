import React, { createContext, useContext, useState } from "react";
// Add an import statement for your API functions
// import { createRecord, fetchRecords } from './your-api';

const RequestRecordContext = createContext();

export const useRequestRecordContext = () => {
	return useContext(RequestRecordContext);
};

const RequestRecordProvider = ({ children }) => {
	const [selectedRow, setSelectedRow] = useState(null);
	const [data, setData] = useState([]);
	const [tableParams, setTableParams] = useState({
		pagination: {
			current: 1,
			pageSize: 10,
		},
	});

	const fetchData = async () => {
		// Call the API function to fetch the data and update the 'data' state
		// const fetchedData = await fetchRecords(/* ...params */);
		// setData(fetchedData);
	};

	const handleFormSubmit = async (values) => {
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
	
	const value = {
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
		<RequestRecordContext.Provider value={value}>
			{children}
		</RequestRecordContext.Provider>
	);
};

export default RequestRecordProvider;

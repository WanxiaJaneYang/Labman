import React, { createContext, useContext, useState, useEffect } from "react";

const RequestRecordContext = createContext();

export const useRequestRecordContext = () => {
	return useContext(RequestRecordContext);
};

const RequestRecordProvider = ({ children }) => {
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
		// Call the API function to fetch the data and update the 'data' state
		// const fetchedData = await fetchRecords(/* ...params */);
		// setData(fetchedData);
		setLoading(false);
	};

	useEffect(() => {
		fetchData();
	}, [JSON.stringify(tableParams)]);

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

	const handleTableChange = (pagination, filters, sorter) => {
		setTableParams({
			pagination,
			filters,
			...sorter,
		});
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
		handleFormSubmit,
		handleTableChange,
	};

	return (
		<RequestRecordContext.Provider value={value}>
			{children}
		</RequestRecordContext.Provider>
	);
};

export default RequestRecordProvider;

import React, { createContext, useContext, useState, useEffect } from "react";

const RequestRecordContext = createContext();

export const useRequestRecordContext = () => {
	return useContext(RequestRecordContext);
};

const RequestRecordProvider = ({ children }) => {
	const [selectedRows, setSelectedRows] = useState(null);
	const [loading, setLoading] = useState(false);
	const [tableParams, setTableParams] = useState({
		pagination: {
			current: 1,
			pageSize: 10,
			showSizeChanger: true, // Add this line
			pageSizeOptions: ["5", "10", "20", "50"], // Add this line
		},
	});
	
	const [data, setData] = useState(
		[
			{
				request_id: 1,
				user_name: "a1777777",
				type_name: "Microscope",
				borrow_amount: 1,
				borrow_date: "2021-05-01",
				return_date: "2021-07-02",
			},
			{
				request_id: 2,
				user_name: "a1777779",
				type_name: "Spectrometer",
				borrow_amount: 1,
				borrow_date: "2021-05-08",
				return_date: "2021-07-02",
			},
			{
				request_id: 3,
				user_name: "a1777778",
				type_name: "Spectrophotometer",
				borrow_amount: 1,
				borrow_date: "2021-05-12",
				return_date: "2021-07-02",
			},
		]
	);

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

	const value = {
		selectedRows,
		setSelectedRows,
		data,
		setData,
		loading,
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

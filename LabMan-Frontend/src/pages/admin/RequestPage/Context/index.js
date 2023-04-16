import React, { createContext, useContext, useState, useEffect } from "react";

const RequestRecordContext = createContext();

export const useRequestRecordContext = () => {
	return useContext(RequestRecordContext);
};

const RequestRecordProvider = ({ children }) => {
	const [loading,setLoading] = useState(false);
	const [selectedRows, setSelectedRows] = useState(null);
	const [data, setData] = useState([
		{
			request_id: 1,
			user_id: 1,
			user_name:"a1888888",
			type_id: 1,
			type_name:"Macbook Pro",
			borrow_amount: 1,
			request_time: "2021-04-30",
			return_date: "2021-05-01",
			status: 0,
		},
		{
			request_id: 2,
			user_id: 2,
			user_name:"a1888899",
			type_id: 2,
			type_name:"Macbook Air",
			borrow_amount: 2,
			request_time: "2021-04-30",
			return_date: "2021-05-02",
			status: 1,
		},
		{
			request_id: 3,
			user_id: 3,
			user_name:"a1888800",
			type_id: 3,
			type_name:"Microsoft",
			borrow_amount: 3,
			request_time: "2021-04-30",
			return_date: "2021-05-03",
			status: 0,
		},
	]);

	const [tableParams, setTableParams] = useState({
		pagination: {
			current: 1,
			pageSize: 10,
			showSizeChanger: true, 
			pageSizeOptions: ["5", "10", "20", "50"],
		},
	});

	const handleTableChange = (pagination, filters, sorter) => {
		setTableParams({
			pagination,
			filters,
			...sorter,
		});
	};

	const fetchData = async () => {
		// Set the 'loading' state to true to show the loading indicator
		setLoading(true);
		// Call the API function to fetch the data and update the 'data' state
		// const fetchedData = await fetchRecords(/* ...params */);
		setData(data);
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
		selectedRows,
		setSelectedRows,
		data,
		setData,
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

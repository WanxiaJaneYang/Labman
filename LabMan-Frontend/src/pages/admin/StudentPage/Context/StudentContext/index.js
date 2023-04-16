import { createContext, useContext, useState } from "react";
// import qs from "qs";

const StudentContext = createContext();

export const useStudentContext = () => {
	return useContext(StudentContext);
};

const StudentProvider = ({ children }) => {
	const [selectedRows, setSelectedRows] = useState(null);
	const [data, setData] = useState([
		{
			user_id: "1",
			user_name: "a1888888",
			email: "a18888@adelaide.edu.au",
			password: "123456",
		},
		{
			user_id: "2",
			user_name: "a1888889",
			email: "a1888889@adelaide.edu.au",
			password: "123456",
		},
		{
			user_id: "3",
			user_name: "a1888890",
			email: "a1888890@adelaide.edu.au",
			password: "123456",
		},

	]);

	const [loading, setLoading] = useState(false);

	const[detailModalVisible, setDetailModalVisible] = useState(false);
	const[modifyModalVisible, setModifyModalVisible] = useState(false);
	const [modalData, setModalData] = useState(null);
	const [tableParams, setTableParams] = useState({
		pagination: {
			current: 1,
			pageSize: 10,
			showSizeChanger: true, 
			pageSizeOptions: ["5", "10", "20", "50"],
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

	const onAdd = async (values) => {
		console.log("onFormSubmit, values:", values);
		// Call the mock function to create a new record and pass the form values
		await mockCreateRecord(values);
		// Add the new record to the 'data' state to update the table
	};

	const mockCreateRecord = (values) => {
		return new Promise((resolve) => {
			setTimeout(() => {
				resolve(setData(data.concat(
					{
						...values,
						user_id: data.length + 1,
					}
				)));
			}, 1000);
		});
	};

	const onDelete = async() => {
		console.log("row deleted:", selectedRows);
		await Promise.all (
			selectedRows.map((item) => mockDeleteStudent(item.user_id))
		);
		setSelectedRows([]);
		// modify later to delete the data from the database and fetch data again
	};

	const mockDeleteStudent = (user_id) => {
		return new Promise((resolve) => {
			setTimeout(() => {
				console.log("deleting student_id:", user_id);
				setData((prevState) => prevState.filter((item) => item.user_id !== user_id));
				resolve();
			}, 1000);
		});
	};

	const onStudentSearch =  async(value) => {
		console.log("onEquipmentSearch, searchParams:", value);
		await mockSearchRecord(value);
		//modify later to call the api to get the data
	};

	const mockSearchRecord = (user_name) => {
		return new Promise((resolve) => {
			setTimeout(() => {
				console.log("before search, data:", data);
				resolve(setData(data.filter((item) => item.user_name === user_name)));
				console.log("mockSearchRecord, data:", data);
			}, 1000);
		});
	};


	const onModify = async (value) => {
		console.log("onModify, form value:", value);
		await mockModifyRecord(value);
		// called by the modify button and pass 2 param back:equipmentId|equipmentType, searchValue
		//call the api to get the data
		setSelectedRows([]);
	};

	const mockModifyRecord = (value) => {
		return new Promise((resolve) => {
			setTimeout(() => {
				console.log("before modify, data:", data);
				resolve(setData(
					data.map((item) => {
						if (item.user_id === value.user_id) {
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
		selectedRows,
		setSelectedRows,
		data,
		fetchData,		
		loading,
		tableParams,
		setTableParams,
		onAdd,
		onDelete,
		onStudentSearch,
		onModify,
		modalData,
		setModalData,
		detailModalVisible,
		setDetailModalVisible,
		modifyModalVisible,
		setModifyModalVisible,
	};

	return (
		<StudentContext.Provider value={value}>
			{children}
		</StudentContext.Provider>
	);
};

export default StudentProvider;

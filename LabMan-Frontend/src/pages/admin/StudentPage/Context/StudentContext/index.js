import { createContext, useContext, useState } from "react";
// import qs from "qs";

const StudentContext = createContext();

export const useStudentContext = () => {
	return useContext(StudentContext);
};

const StudentProvider = ({ children }) => {
	const [selectedRows, setSelectedRows] = useState(null);
	const [data, setData] = useState([
		// {
		// 	user_id: "1",
		// 	user_name: "a1888888",
		// 	email: "a18888@adelaide.edu.au",
		// 	password: "123456",
		// },
		// {
		// 	user_id: "2",
		// 	user_name: "a1888889",
		// 	email: "a1888889@adelaide.edu.au",
		// 	password: "123456",
		// },
		// {
		// 	user_id: "3",
		// 	user_name: "a1888890",
		// 	email: "a1888890@adelaide.edu.au",
		// 	password: "123456",
		// },
	]);

	const apiURL = "http://localhost:3008/users";
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
		const data = await getStudent();
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

		const getStudent= async () => {
			try {
				const response = await fetch(apiURL);
				const data = await response.json();
				console.log("data:", data);
				return data;
			} catch (error) {
				console.log("error:", error);
			}
		};

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
		await addStudent(values);
		await fetchData();
		// Add the new record to the 'data' state to update the table
	};

	const addStudent = async (values) => {
		try {
			const response = await fetch(apiURL, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(values),
			});
			console.log("response:", response);
		} catch (error) {
			console.log("error:", error);
		}
	};

	// const mockCreateRecord = (values) => {
	// 	return new Promise((resolve) => {
	// 		setTimeout(() => {
	// 			resolve(setData(data.concat(
	// 				{
	// 					...values,
	// 					user_id: data.length + 1,
	// 				}
	// 			)));
	// 		}, 1000);
	// 	});
	// };

	const onDelete = async() => {
		console.log("row deleted:", selectedRows);
		await Promise.all (
			selectedRows.map((item) => deleteStudent(item.user_id))
		);
		await fetchData();
		setSelectedRows([]);
		// modify later to delete the data from the database and fetch data again
	};

	const deleteStudent = async (id) => {
		const apiURL = "http://localhost:3008/users/delete";//consider to change the apiURL
		try {
			const response = await fetch(apiURL, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({user_id:id}),
			});
			console.log("response:", response);
		} catch (error) {
			console.log("error:", error);
		}
	};

	// const mockDeleteStudent = (user_id) => {
	// 	return new Promise((resolve) => {
	// 		setTimeout(() => {
	// 			console.log("deleting student_id:", user_id);
	// 			setData((prevState) => prevState.filter((item) => item.user_id !== user_id));
	// 			resolve();
	// 		}, 1000);
	// 	});
	// };

	const onStudentSearch =  async(value) => {
		console.log("onEquipmentSearch, searchParams:", value);
		await searchStudent(value);
		await fetchData();
		//modify later to call the api to get the data
	};

	const searchStudent = async (value) => {
		const apiURL = "http://localhost:3008/users/search";//consider to change the apiURL
		try {
			const response = await fetch(apiURL, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({user_name:value}),
			});
			console.log("response:", response);
		} catch (error) {
			console.log("error:", error);
		}
	};

	// const mockSearchRecord = (user_name) => {
	// 	return new Promise((resolve) => {
	// 		setTimeout(() => {
	// 			console.log("before search, data:", data);
	// 			resolve(setData(data.filter((item) => item.user_name === user_name)));
	// 			console.log("mockSearchRecord, data:", data);
	// 		}, 1000);
	// 	});
	// };

	const onModify = async (value) => {
		console.log("onModify, form value:", value);
		// await mockModifyRecord(value);
		// called by the modify button and pass 2 param back:equipmentId|equipmentType, searchValue
		await modifyStudent(value);
		await fetchData();
		setSelectedRows([]);
	};

	const modifyStudent = async (value) => {
		const apiURL = "http://localhost:3008/users/edit";//consider to change the apiURL
		try {
			const response = await fetch(apiURL, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(value),
			});
			console.log("response:", response);
		} catch (error) {
			console.log("error:", error);
		}
	};
	
	// const mockModifyRecord = (value) => {
	// 	return new Promise((resolve) => {
	// 		setTimeout(() => {
	// 			console.log("before modify, data:", data);
	// 			resolve(setData(
	// 				data.map((item) => {
	// 					if (item.user_id === value.user_id) {
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

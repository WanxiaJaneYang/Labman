import { createContext, useContext, useState } from "react";
import { message } from "antd";
// import qs from "qs";

const StudentContext = createContext();

export const useStudentContext = () => {
	return useContext(StudentContext);
};

const StudentProvider = ({ children }) => {
	const apiURL = "http://localhost:3008/users";
	const [selectedRows, setSelectedRows] = useState(null);
	const [data, setData] = useState([]);

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
	
	// fetch data from the database and set the data to the state
	const fetchData = async () => {
		setLoading(true);
		const data = await getStudentData();
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
	};

	//calling the api to get student data 
	const getStudentData = async () => {
		try {
			const response = await fetch(apiURL);
			const data = await response.json();
			if (response.ok) {
				return data;
			} else {
				throw new Error(data.error);
			}
		} catch (error) {
			message.error(error.message);
		}
	};

	// add the new student
	const onAdd = async (values) => {
		// Call the mock function to create a new record and pass the form values
		await postStudent(values);
		await fetchData();
	};

	// add the new student using API
	const postStudent= async (values) => {
		const requestParams = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(values),
		};
		try {
			const response = await fetch(apiURL, requestParams);
			const data = await response.json();
			if (response.ok) {
				message.success(data.message);
			} else {
				throw new Error(data.error);
			}
		} catch (error) {
			message.error(error.message);
		}
	};

	// delete the selected rows
	const onDelete = async() => {
		await Promise.all (
			selectedRows.map((item) => deleteStudent(item.student_id))
		);
		await fetchData();
		setSelectedRows([]);
		// modify later to delete the data from the database and fetch data again
	};

	// call the api to delete the data
	const deleteStudent = async (student_id) => {
		const url= `${apiURL}/${student_id}`;
		const requestParams = {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
		};
		try {
			const response = await fetch(url, requestParams);
			const data = await response.json();
			if (response.ok) {
				message.success(data.message);
			} else {
				throw new Error(data.error);
			}
		} catch (error) {
			message.error(error.message);
		}
	};

	// search the data by the student_id
	const onStudentSearch =  async(value) => {
		const data=await searchStudent(value);
		setData(data);
		setTableParams({
			...tableParams,
			pagination: {
				...tableParams.pagination,
				total: data.length,
			},
		});
		//modify later to call the api to get the data
	};

	// call the api to search the data
	const searchStudent = async (student_id) => {
		const url = apiURL+"/" + student_id;
		const requestParams = {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		};
		try {
			const response = await fetch(url, requestParams);
			const data = await response.json();
			if (response.ok) {
				return data;
			} else {
				throw new Error(data.error);
			}
		} catch (error) {
			message.error(error.message);
		}
	};

	//modify the data
	const onModify = async (value) => {
		await updateStudent(value);
		await fetchData();
		setSelectedRows([]);
	};

	// call the api to update the data
	const updateStudent = async (values) => {
		const url = `${apiURL}/${values.student_id}`;
		const requestParams = {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(values),
		};

		try {
			const response = await fetch(url, requestParams);
			const data = await response.json();
			if (response.ok) {
				message.success(data.message);
			} else {
				throw new Error(data.error);
			}
		} catch (error) {
			message.error(error.message);
		}
	};

	//expose the variables
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

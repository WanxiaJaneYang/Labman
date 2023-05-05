import { createContext, useContext, useState } from "react";
import { message } from "antd";
import { getStudentData, postStudent, deleteStudent, getStudentById } from "../../../../../api/student";

const StudentContext = createContext();

export const useStudentContext = () => {
	return useContext(StudentContext);
};

const StudentProvider = ({ children }) => {
	const [selectedRows, setSelectedRows] = useState(null);
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(false);
	const [detailModalVisible, setDetailModalVisible] = useState(false);
	const [modalData, setModalData] = useState(null);
	const [tableParams, setTableParams] = useState({
		pagination: {
			current: 1,
			pageSize: 10,
			showSizeChanger: true, 
			pageSizeOptions: ["5", "10", "20", "50"],
			total: 0,
		},
	});
	
	// fetch data from the database and set the data to the state
	const fetchData = async () => {
		setLoading(true);
		try{
			const data = await getStudentData();
			setData(data);
		}catch(error){
			message.error(error.message);
		}
		setLoading(false);
	};

	// add the new student
	const onAdd = async (values) => {
		try{
			await postStudent(values);
			message.success("Successfully added");
		}catch(error){
			message.error(error.message);
		}
		await fetchData();

	};

	// delete the selected rows
	const onDelete = async() => {
		try{
			await Promise.all (
				selectedRows.map((item) => deleteStudent(item.student_id))
			);
			await fetchData();
			setSelectedRows([]);
		}
		catch(error){
			message.error(error.message);
		}
	};

	// search the data by the student_id
	const onStudentSearch =  async(value) => {
		setLoading(true);
		try{
			const data = await getStudentById(value);
			setData(data);
		}catch(error){
			message.error(error.message);
		}
		setLoading(false);
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
		modalData,
		setModalData,
		detailModalVisible,
		setDetailModalVisible,
	};

	return (
		<StudentContext.Provider value={value}>
			{children}
		</StudentContext.Provider>
	);
};

export default StudentProvider;

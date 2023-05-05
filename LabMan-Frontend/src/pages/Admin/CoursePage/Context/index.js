import { createContext, useContext, useState } from "react";

const CourseContext = createContext();

export const useCourseContext = () => {
	return useContext(CourseContext);
};

const CourseProvider = ({ children }) => {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(false);
	const [editTableData, setEditTableData] = useState(null); 
	const [selectedRows, setSelectedRows] = useState([]);
	const [tableParams, setTableParams] = useState({
		pagination: {
			current: 1,
			pageSize: 10,
			showSizeChanger: true, 
			pageSizeOptions: ["5", "10", "20", "50"]
		},
	});

	const fetchData = async () => {
		setLoading(true);
		setData([
			{
				course_id: 1,
				courseCode: "CSE1001",
				courseName: "Introduction to Computer Science",
				courseCoordinator: "Dr. John Doe",
			},
		]);
		setLoading(false);
	};

	const onDelete = async () => {
		setLoading(true);
		console.log("selectedRows:", selectedRows);
		setLoading(false);
	};

	return (
		<CourseContext.Provider value={{
			data,
			setData,
			fetchData,
			loading,
			tableParams,
			setTableParams,
			editTableData,
			setEditTableData,
			selectedRows,
			setSelectedRows,
			onDelete,
		}}>
			{children}
		</CourseContext.Provider>
	);
};

export default CourseProvider;
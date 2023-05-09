import { Table } from "antd";
import { useStudentListContext } from "../../Context";
import { useEffect } from "react";

const StudentListTable = () => {
	const { data,fetchData, tableParams, setTableParams, loading } = useStudentListContext();

	const columns = [
		{
			title: "Student ID",
			dataIndex: "student_id",
		},
	];

	useEffect(() => {
		fetchData();
	}, []);

	useEffect(() => {
		setTableParams({
			...tableParams,
			pagination: {
				...tableParams.pagination,
				total: data ? data.length : 0,
			},
		});
	}, [data]);

	return (
		<>
			<Table
				dataSource={data}
				pagination={{
					...tableParams.pagination,
					total: data ? data.length : 0,
				}}
				loading={loading}
				columns={columns}
			/>
		</>
	);
};

export default StudentListTable;
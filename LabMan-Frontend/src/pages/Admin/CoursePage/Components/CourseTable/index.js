import {Table, Space} from "antd";
import {useCourseContext} from "../../Context";
import {useEffect} from "react";
import EditCourseButton from "../Buttons/EditCourseButton";
import StudentButton from "../Buttons/StudentButton";
import PackageSettingButton from "../Buttons/PackageButton";

const CourseTable=()=>{
	const {data, setTableParams, loading, tableParams, fetchData, selectedRows, setSelectedRows}=useCourseContext();
	const columns = [
		{
			title: "Course Code",
			dataIndex: "courseCode",
		},
		{
			title: "Course Name",
			dataIndex: "courseName",
		},
		{
			title: "Course Coordinator",
			dataIndex: "courseCoordinator",
		},
		{
			title: "Action",
			render: (_, record) => (
				<Space>
					<EditCourseButton record={record}/>
					<StudentButton course_id={record.course_id}/>
					<PackageSettingButton course_id={record.course_id}/>
				</Space>
					
			)       
		}
	];

	const onTableChange = (pagination, filters, sorter) => {
		setTableParams({
			pagination,
			filters,
			...sorter,
		});
	};
    
	useEffect(() => {
		console.log("table params", tableParams);
		fetchData();
	}, []);
    
	useEffect(() => {
		setTableParams({
			...tableParams,
			pagination: {
				...tableParams.pagination,
				total: data?data.length:0,
			},
		});
	}, [data]);

	const rowSelection = {
		selectedRowKeys: selectedRows ? selectedRows.map((row) => row.course_id) : [],
		onChange: (selectedRowKeys, selectedRows) => {
			console.log(`selectedRowKeys: ${selectedRowKeys}`, "selectedRows: ", selectedRows);
			setSelectedRows(selectedRows);
		},
	};
    
	return(
		<Table 
			dataSource={data}
			rowSelection={rowSelection}
			columns={columns}
			loading={loading}
			pagination={tableParams.pagination}
			onChange={onTableChange}
			rowKey={(record) => record.course_id}
			scroll={{ x: "max-content" }}
		/>
	);
};

export default CourseTable;
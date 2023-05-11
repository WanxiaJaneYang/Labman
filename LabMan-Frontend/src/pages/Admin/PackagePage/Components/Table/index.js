import { Table } from "antd";
import EditPackageButton from "../Buttons/EditPackageButton";
import { usePackageContext } from "../../Context";
import { useEffect } from "react";

const CoursePackageTable = () => {
	const columns = [
		{
			title: "Package Name",
			dataIndex: "package_name",
		},
		{
			title:"action",
			render:(_,record)=>(
				<EditPackageButton record={record}/>
			)
		}
	];

	const {data, loading, fetchData, tableParams, setTableParams, selectedRows, setSelectedRows}= usePackageContext();

	const handleTableChange = (pagination, filters, sorter) => {
		setTableParams({
			pagination,
			filters,
			...sorter,
		});
	};

	useEffect(() => {
		fetchData();
	}, []);

	const rowSelection = {
		selectedRowKeys: selectedRows ? selectedRows.map((row) => row.package_id) : [],
		onChange: (selectedRowKeys, selectedRows) => {
			setSelectedRows(selectedRows);
		},
	};

	return (
		<Table
			rowKey={(record) => record.package_id}
			dataSource={data}
			loading={loading}
			columns={columns}
			onChange={handleTableChange}
			pagination={{
				...tableParams.pagination,
				total: data?.length,
			}}
			rowSelection={rowSelection}
		/>
	);
};

export default CoursePackageTable;
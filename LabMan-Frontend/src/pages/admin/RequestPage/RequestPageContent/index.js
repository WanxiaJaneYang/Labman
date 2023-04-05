import RequestRecordTable from "../Components/Tables/RequestRecordTable";
import ModifyRequestRecordButton from "../Components/Buttons/ModifyRequestRecordButton";
import DeleteRequestRecordButton from "../Components/Buttons/DeleteRequestRecordButton";
import NewRequestRecordButton from "../Components/Buttons/NewRequestRecordButton";
import SearchRequestRecordBar from "../Components/Buttons/SearchRequestRecordBar";
import { Row, Col, Space } from "antd";
import { useRequestRecordContext } from "../Components/Context/RequestRecordContext";

function RequestPageContent() {
	const {
		loading,
		tableParams,
		setTableParams,
		selectedRow,
		setSelectedRow,
		data,
		fetchData,
	} = useRequestRecordContext();

	const handleRowSelected = (row) => {
		setSelectedRow(row);
	};

	const handleTableChange = (pagination, filters, sorter) => {
		setTableParams({
			...tableParams,
			pagination,
			filters,
			sorter,
		});
		fetchData();
	};

	return (
		<div>
			<Row justify="space-between" align="middle">
				<Col>
					<NewRequestRecordButton />
				</Col>
				<Col>
					<SearchRequestRecordBar />
				</Col>
			</Row>
			<RequestRecordTable onRowSelected={handleRowSelected}
				data={data}
				loading={loading}
				pagination={tableParams.pagination}
				handleTableChange={handleTableChange} />
			<Row justify={"start"}>
				<Space>
					<Col>
						<ModifyRequestRecordButton selectedRow={selectedRow} onModify={fetchData} />
					</Col>
					<Col>
						<DeleteRequestRecordButton selectedRow={selectedRow} onDelete={fetchData} />
					</Col>
				</Space>
			</Row>
		</div>
	);
}

export default RequestPageContent;

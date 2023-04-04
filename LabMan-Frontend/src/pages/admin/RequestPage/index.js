import RequestRecordTable from "./Components/RequestRecordTable";
import ModifyRequestRecordButton from "./Components/Buttons/ModifyRequestRecordButton";
import DeleteRequestRecordButton from "./Components/Buttons/DeleteRequestRecordButton";
import NewRequestRecordButton from "./Components/Buttons/NewRequestRecordButton";
import SearchRequestRecordBar from "./Components/Buttons/SearchRequestRecordBar";
import { Row, Col, Space } from "antd";
import { useState } from "react";

function RequestPage() {
	const [selectedRow, setSelectedRow] = useState(null);
	const handleRowSelected = (row) => {
		setSelectedRow(row);
	};

	const [data, setData] = useState();
	const [tableParams, setTableParams] = useState({
		pagination: {
			current: 1,
			pageSize: 10,
		},
	});

	console.log(data);
	console.log(tableParams);

	const fetchData = () => {
		// You can pass fetchData as a prop to RequestRecordTable, so you can call it from the child component
		// Or move the fetchData function and relevant states to a higher-level component or context
		// ...
		setTableParams(/* ... */);
		setData(/* ... */);
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
			<RequestRecordTable onRowSelected={handleRowSelected} datasource={fetchData} />
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

export default RequestPage;
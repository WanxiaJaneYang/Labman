import ReturnTable from "./Components/ReturnTable";
import ReturnEquipmentButton from "./Components/Buttons/ReturnEquipmentButton";
import SearchReturnRecordBar from "./Components/Buttons/SearchReturnRecordBar";
import { Row, Col } from "antd";
import { useState } from "react";

function ReturnPage() {
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
					<ReturnEquipmentButton selectedRow={selectedRow} onReturn={fetchData} />
				</Col>
				<Col>
					<SearchReturnRecordBar />
				</Col>
			</Row>
			<ReturnTable onRowSelected={handleRowSelected} datasource={fetchData} />

		</div>
	);
}

export default ReturnPage;
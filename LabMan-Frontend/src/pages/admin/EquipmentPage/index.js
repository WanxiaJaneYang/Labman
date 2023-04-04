import { Row, Col, Space } from "antd";
import { useState } from "react";
import EquipmentTable from "./Components/EquipmentTable";
import NewEquipmentButton from "./Components/Buttons/NewEquipmentButton";
import SearchEquipmentBar from "./Components/Buttons/SearchEquipmentBar";
import ModifyEquipmentButton from "./Components/Buttons/ModifyEquipmentButton";
import DeleteEquipmentButton from "./Components/Buttons/DeleteEquipmentButton";

function EquipmentPage() {
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
					<NewEquipmentButton />
				</Col>
				<Col>
					<SearchEquipmentBar />
				</Col>
			</Row>
			<EquipmentTable onRowSelected={handleRowSelected} datasource={fetchData} />
			<Row justify={"start"}>
				<Space>
					<Col>
						<ModifyEquipmentButton selectedRow={selectedRow} onModify={fetchData} />
					</Col>
					<Col>
						<DeleteEquipmentButton selectedRow={selectedRow} onDelete={fetchData} />
					</Col>
				</Space>
			</Row>

		</div>
	);
}

export default EquipmentPage;
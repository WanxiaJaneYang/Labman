import EquipmentTable from "../../../components/tables/EquipmentTable";
import { Row, Col, Space } from "antd";
import { useState } from "react";
import NewEquipment from "../../../components/Buttons/NewEquipment";
import SearchEquipment from "../../../components/Buttons/SearchEquipment";
import ModifyEquipment from "../../../components/Buttons/ModifyEquipment";
import DeleteEquipment from "../../../components/Buttons/DeleteEquipment";

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
					<NewEquipment />
				</Col>
				<Col>
					<SearchEquipment />
				</Col>
			</Row>
			<EquipmentTable onRowSelected={handleRowSelected} datasource={fetchData} />
			<Row justify={"start"}>
				<Space>
					<Col>
						<ModifyEquipment selectedRow={selectedRow} onModify={fetchData} />
					</Col>
					<Col>
						<DeleteEquipment selectedRow={selectedRow} onDelete={fetchData} />
					</Col>
				</Space>
			</Row>

		</div>
	);
}

export default EquipmentPage;
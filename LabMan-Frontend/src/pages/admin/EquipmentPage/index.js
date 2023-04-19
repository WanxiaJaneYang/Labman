import { Row, Col, Space } from "antd";
import EquipmentTable from "./Components/EquipmentTable";
import NewEquipmentButton from "./Components/Buttons/NewEquipmentButton";
import SearchEquipmentBar from "./Components/Buttons/SearchEquipmentBar";
import DeleteEquipmentButton from "./Components/Buttons/DeleteEquipmentButton";
import EquipmentProvider from "./Context";

function EquipmentPage() {
	return (
		<div>
			<EquipmentProvider>
				<Row justify="space-between" align="middle">
					<Col>
						<NewEquipmentButton />
					</Col>
					<Col>
						<SearchEquipmentBar />
					</Col>
				</Row>
				<EquipmentTable />
				<Row justify={"start"}>
					<Space>
						<Col>
							<DeleteEquipmentButton />
						</Col>
					</Space>
				</Row>
			</EquipmentProvider>
		</div>
	);
}

export default EquipmentPage;
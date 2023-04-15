import ReturnRecordProvider from "./Components/Context/ReturnRecordContext";
import ReturnTable from "./Components/Tables/ReturnTable";
import SearchReturnRecordBar from "./Components/Buttons/SearchReturnRecordBar";
import ReturnEquipmentButton from "./Components/Buttons/ReturnEquipmentButton";
import ShowDetailButton from "./Components/Buttons/ShowDetailButton";
import { Row, Col, Space } from "antd";

const ReturnPage = () => {
	return (
		<ReturnRecordProvider>
			<Row justify="space-between" align="middle">
				<Col>
					<SearchReturnRecordBar />
				</Col>
			</Row>
			<ReturnTable  />
			<Row justify={"start"}>
				<Space>
					<ReturnEquipmentButton  />
					<ShowDetailButton />
				</Space>
				
			</Row>
		</ReturnRecordProvider>
	);
};

export default ReturnPage;

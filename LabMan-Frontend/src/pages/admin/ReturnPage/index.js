import ReturnRecordProvider from "./ReturnRecordContext";
import ReturnTable from "./Components/Tables/ReturnTable";
import SearchReturnRecordBar from "./Components/Buttons/SearchReturnRecordBar";
import ReturnEquipmentButton from "./Components/Buttons/ReturnEquipmentButton";
import { Row, Col, Divider} from "antd";

const ReturnPage = () => {
	return (
		<ReturnRecordProvider>
			<Row justify="space-between" align="middle">
				<Col>
					<ReturnEquipmentButton  />
				</Col>
				<Col>
					<SearchReturnRecordBar />
				</Col>
			</Row>
			<Divider/>
			<ReturnTable  />
		</ReturnRecordProvider>
	);
};

export default ReturnPage;

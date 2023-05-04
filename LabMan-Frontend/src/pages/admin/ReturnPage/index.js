import ReturnRecordProvider from "./ReturnRecordContext";
import ReturnTable from "./Components/Tables/ReturnTable";
import SearchReturnRecordBar from "./Components/Buttons/SearchReturnRecordBar";
import ReturnAllButton from "./Components/Buttons/ReturnAllButton";
import { Row, Col, Divider} from "antd";

const ReturnPage = () => {
	return (
		<ReturnRecordProvider>
			<Row justify="space-between" align="middle">
				<Col>
					<ReturnAllButton/>
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

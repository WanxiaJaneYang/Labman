import ReturnedRecordProvider from "./Context";
import ReturnedRecordTable from "./Components/Table";
import SearchReturnedBar from "./Components/Buttons/SearchReturnedBar";
import CancelAllReturnedButton from "./Components/Buttons/CancelReturnButton";
import { Row, Col, Divider} from "antd";

const ReturnedPage = () => {
	return (
		<ReturnedRecordProvider>
			<Row justify="space-between" align="middle">
				<Col>
					<CancelAllReturnedButton/>
				</Col>				
				<Col>
					<SearchReturnedBar />
				</Col>
			</Row>
			<Divider/>
			<ReturnedRecordTable  />
		</ReturnedRecordProvider>
	);
};

export default ReturnedPage;
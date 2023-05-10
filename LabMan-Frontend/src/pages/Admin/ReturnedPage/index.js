import ReturnedRecordProvider from "./Context";
import ReturnedRecordTable from "./Components/Table";
import SearchReturnedBar from "./Components/Buttons/SearchReturnedBar";
import CancelReturnedButton from "./Components/Buttons/CancelReturnButton";
import { Row, Col, Divider, Space} from "antd";

const ReturnedPage = () => {
	return (
		<ReturnedRecordProvider>
			<Row justify="space-between" align="middle">
				<Space>
					<Col>
						<CancelReturnedButton/>
					</Col>
				</Space>
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
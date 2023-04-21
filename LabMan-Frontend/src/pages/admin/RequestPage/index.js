import RequestRecordProvider from "./Context";
import RequestRecordTable from "./Components/RequestRecordTable";
import CancelRequestRecordButton from "./Components/Buttons/CancelRequestRecordButton";
import NewRequestRecordButton from "./Components/Buttons/NewRequestRecordButton";
import SearchRequestRecordBar from "./Components/Buttons/SearchRequestRecordBar";
import { Row, Col, Space, Divider } from "antd";

function RequestPage() {
	return (
		<div>
			<RequestRecordProvider>
				<Row justify="space-between" align="middle">
					<Space>
						<Col>
							<NewRequestRecordButton />
						</Col>
						<Col>
							<CancelRequestRecordButton />
						</Col>
					</Space>
					<Col>
						<SearchRequestRecordBar />
					</Col>
				</Row>
				<Divider/>
				<RequestRecordTable/>
			</RequestRecordProvider>
		</div>
		
	);
}

export default RequestPage;

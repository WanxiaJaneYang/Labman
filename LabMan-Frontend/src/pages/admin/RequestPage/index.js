import RequestRecordProvider from "./Context";
import RequestRecordTable from "./Components/RequestRecordTable";
import ModifyRequestRecordButton from "./Components/Buttons/ModifyRequestRecordButton";
import DeleteRequestRecordButton from "./Components/Buttons/DeleteRequestRecordButton";
import NewRequestRecordButton from "./Components/Buttons/NewRequestRecordButton";
import SearchRequestRecordBar from "./Components/Buttons/SearchRequestRecordBar";
import { Row, Col, Space } from "antd";

function RequestPage() {
	return (
		<div>
			<RequestRecordProvider>
				<Row justify="space-between" align="middle">
					<Col>
						<NewRequestRecordButton />
					</Col>
					<Col>
						<SearchRequestRecordBar />
					</Col>
				</Row>
				<RequestRecordTable/>
				<Row justify={"start"}>
					<Space>
						<Col>
							<ModifyRequestRecordButton />
						</Col>
						<Col>
							<DeleteRequestRecordButton />
						</Col>
					</Space>
				</Row>
			</RequestRecordProvider>
		</div>
		
	);
}

export default RequestPage;

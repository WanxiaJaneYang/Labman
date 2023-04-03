import RequestRecordTable from "../../../components/tables/RequestRecordTable";
import SearchRequestRecord from "../../../components/Buttons/SearchRequestRecord";
import NewRequestRecord from "../../../components/Buttons/NewRequestRecord";
import { Row, Col } from "antd";

function RequestPage() {
    return (
        <div>
            <Row justify="space-between" align="middle">
                <Col>
                    <NewRequestRecord />
                </Col>
                <Col>
                    <SearchRequestRecord />
                </Col>
            </Row>
            <RequestRecordTable />

        </div>
    );
}

export default RequestPage;